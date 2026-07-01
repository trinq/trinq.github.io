# Editorial Homepage Redesign — Design

**Date:** 2026-07-01
**Scope:** Homepage only (`index.html`, `_layouts/home.html`, homepage sections of `assets/scss/_layout.scss`)
**Goal:** Redesign the trinq.github.io homepage to match the warm editorial aesthetic of the reference Figma site (`https://liquid-prize-75627975.figma.site/`), replacing the current dark terminal/dashboard theme.

## Reference: extracted design tokens

The Figma site is a JS-rendered SPA, so tokens were extracted directly from its stylesheet
(`/_components/v2/*.css`) and JS bundle rather than a visual read.

### Color palette

| Token | Value | Role |
|---|---|---|
| `--background` | `#f5f0e8` | Page background (cream) |
| `--foreground` | `#1a1814` | Primary text (warm charcoal) |
| `--accent` | `#c4622d` | Accent (terracotta) — links, kickers, tags |
| `--accent-foreground` | `#faf7f2` | Text on accent |
| `--muted-foreground` | `#7a6e5f` | Muted/secondary text |
| `--card` | `#faf7f2` | Card / elevated surface |
| `--muted` / `--input-background` / `--secondary` | `#ede7da` | Soft surfaces, input bg |
| `--switch-background` | `#c3b89e` | Tan detail |
| `--border` | `#1a1814` @ ~12% (`#1a18141f`) | Hairline borders |

### Typography

- **Playfair Display** (400/600/700, ital) — display headings, category titles, masthead.
- **Lora** (400/500, ital) — body text, post titles, descriptions.
- **DM Mono** (400/500) — meta lines, kickers, labels, nav.
- Loaded via Google Fonts:
  `family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap`

### Other

- Border radius: `0.625rem`.
- Icons: inline lucide-style SVGs (`arrow-up-right`, `clock`, `search`, `chevron-right`) replacing FontAwesome.
- Meta dates rendered in a long, readable format.

## Layout (matching the Figma "blog category page")

The homepage keeps its data source (Jekyll posts grouped by `category`) but adopts the Figma
editorial structure:

1. **Header** — serif wordmark on the left; DM Mono nav links + a **visual-only search affordance**
   (icon + input styling, non-functional) on the right; hairline bottom border. Drops the current
   sticky-blur dark bar.
2. **Masthead** — large Playfair title + an *italic terracotta* subtitle (Lora italic / accent).
   **Removes** the blinking `SYSTEM ONLINE` status bar and the `TRACKS/LESSONS/BUILD` counters
   (terminal signature elements that clash with the editorial look).
3. **Category sections** — one per track (same `course_meta` loop as today). Each section has:
   - a **DM Mono kicker** label (e.g. category slug / count),
   - a **Playfair category heading** with an `arrow-up-right` link to the category page,
   - an **editorial list** of posts (replaces the current hero + sidebar card grid).
     Each row: Lora post **title**, *italic muted* **description**, and a DM Mono **meta line**
     (long-format date · read time with `clock` icon · lesson tag `#N` in accent).
4. **Tags** — retained, restyled as soft pill chips on the tan/cream palette (accent on hover).
5. **Footer** — hairline top border, small DM Mono muted text (license + credits, unchanged copy).

## Components (units of work)

- **`_layouts/home.html`** — header markup (wordmark, nav, visual search), footer, font `<link>`
  swap (JetBrains Mono/Merriweather → Playfair/Lora/DM Mono). One clear purpose: page chrome.
- **`index.html`** — masthead, per-category editorial lists, tag cloud. Drop the status-bar block
  and the hero+sidebar `news-block` markup; replace with the list layout. Reuse the existing
  `course_meta` category loop and post iteration.
- **`assets/scss/_layout.scss`** — rewrite the `:root` token block to the warm palette; restyle
  header/nav/search, masthead, category section + editorial list, tags, footer. Remove now-unused
  dark-theme rules (`.system-status`, `.news-hero*`, `.news-side*`) as they are replaced.

## Data flow

Unchanged: Jekyll builds posts → `index.html` groups by `category` via the `course_meta` string →
renders sections. Only presentation changes. Read time: reuse `_includes/read_time.html` if present;
otherwise compute inline from post content word count.

## Out of scope (this iteration)

- Post pages, about, archive, tags (`tagged.html`), reading section — keep current styling.
  (Those pages share `main.css`; the token rewrite is scoped to homepage-specific selectors so it
  does not bleed into other layouts. Verify no shared class regressions during implementation.)
- Functional search (visual only for now).
- Dark-mode toggle.

## Success criteria

- Homepage renders in the warm editorial palette with Playfair/Lora/DM Mono fonts.
- Categories display as editorial post lists, not dark cards.
- Header shows wordmark + nav + non-functional search; masthead has italic terracotta subtitle.
- No blinking status bar / terminal counters remain.
- Tags render as soft pills.
- `jekyll build` succeeds with no Liquid/Sass errors; other pages remain visually intact.
