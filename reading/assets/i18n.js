/**
 * i18n.js — lightweight in-page translation using Google Translate (unofficial API)
 *
 * Usage:
 *   <script src="i18n.js" data-source="en" data-target="vi"></script>
 *
 * How it works:
 *   1. On load, caches the English original in memory.
 *   2. On first translate, calls Google Translate API and caches the result.
 *   3. Subsequent toggles are instant (cache hit).
 *   4. Translation state persists via sessionStorage across page navigations.
 */

(function () {
  'use strict';

  /* ── Google Translate unofficial API ──────────────────────────── */
  const GT_URL = (text, sl, tl) =>
    `https://translate.googleapis.com/translate_a/single?client=webapp` +
    `&sl=${sl}&tl=${tl}&hl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

  /* ── State ─────────────────────────────────────────────────── */
  const cache = new Map();
  let isTranslated = false;
  let isTranslating = false;

  /* ── Utilities ─────────────────────────────────────────────── */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);

  function parseResponse(data) {
    if (!Array.isArray(data)) throw new Error('Unexpected response');
    return data[0].map((seg) => seg[0]).join('');
  }

  async function translate(text, sourceLang, targetLang) {
    const res = await fetch(GT_URL(text, sourceLang, targetLang));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return parseResponse(data);
  }

  async function translatePage(sourceLang, targetLang, mainEl) {
    const key = location.href;
    let stored = cache.get(key);
    if (!stored) {
      const html = mainEl.innerHTML;
      const translated = await translate(html, sourceLang, targetLang);
      stored = { en: html, vi: translated };
      cache.set(key, stored);
    }
    return stored[targetLang];
  }

  /* ── Toggle UI ─────────────────────────────────────────────── */
  function buildToggle(sourceLang, targetLang) {
    const btn = document.createElement('button');
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', `Switch to ${targetLang}`);
    btn.setAttribute('data-action', 'lang-toggle');

    function refreshLabel() {
      btn.textContent = isTranslated
        ? sourceLang.toUpperCase()
        : targetLang.toUpperCase();
    }
    refreshLabel();

    btn.addEventListener('click', async () => {
      if (isTranslating) return;

      if (!isTranslated) {
        const main = $('main');
        if (!main) return;

        btn.classList.add('loading');
        btn.textContent = '…';
        isTranslating = true;

        try {
          const target = await translatePage(sourceLang, targetLang, main);
          main.innerHTML = target;
          isTranslated = true;
          sessionStorage.setItem('i18n_translated', '1');
          document.documentElement.lang = targetLang;
        } catch (err) {
          console.error('[i18n] Translation failed:', err);
          btn.textContent = '!';
          setTimeout(refreshLabel, 1500);
        } finally {
          btn.classList.remove('loading');
          isTranslating = false;
          refreshLabel();
        }
      } else {
        const main = $('main');
        const key = location.href;
        const stored = cache.get(key);
        if (stored) main.innerHTML = stored[sourceLang];
        isTranslated = false;
        sessionStorage.removeItem('i18n_translated');
        document.documentElement.lang = sourceLang;
        refreshLabel();
      }
    });

    return btn;
  }

  function autoAppendToggle(sourceLang, targetLang) {
    const nav = $('.site-nav');
    if (nav) {
      nav.appendChild(buildToggle(sourceLang, targetLang));
    } else {
      document.body.appendChild(buildToggle(sourceLang, targetLang));
    }
  }

  /* ── Init ──────────────────────────────────────────────────── */
  function init() {
    const script = $('script[data-source][data-target]');
    if (!script) return;

    const sourceLang = script.dataset.source;
    const targetLang = script.dataset.target;

    if (sessionStorage.getItem('i18n_translated') === '1') {
      const main = $('main');
      const key = location.href;
      const stored = cache.get(key);
      if (stored) {
        main.innerHTML = stored[targetLang];
        isTranslated = true;
        document.documentElement.lang = targetLang;
      }
    }

    autoAppendToggle(sourceLang, targetLang);
  }

  window.__i18n = {
    translate,
    getCache: () => cache,
    getIsTranslated: () => isTranslated,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
