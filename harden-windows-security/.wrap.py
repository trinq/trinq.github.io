#!/usr/bin/env python3
"""Inject site-header + <main> + site-footer scaffolding into harden-windows-security
lesson and reference HTMLs so the shared stylesheet renders correctly."""
import re
import sys
from pathlib import Path

BASE = Path("/Users/trinq/Developer/learning/trinq.github.io/harden-windows-security")

# Each lesson path is (relative_path, lesson_title_for_nav, lesson_n_for_footer)
LESSONS = [
    ("lessons/0001-defense-in-depth-2x2.html",  "Lesson 0001", "L1"),
    ("lessons/0002-security-boundaries.html",   "Lesson 0002", "L2"),
    ("lessons/0003-gpo-as-hardening-pipeline.html", "Lesson 0003", "L3"),
    ("lessons/0004-microsoft-security-baselines.html", "Lesson 0004", "L4"),
    ("lessons/0005-attack-surface-reduction-rules.html", "Lesson 0005", "L5"),
    ("lessons/0006-wdac-on-prem.html",          "Lesson 0006", "L6"),
    ("lessons/0007-byovd-and-kernel-integrity.html", "Lesson 0007", "L7"),
]

REFERENCE = [
    ("reference/glossary.html", "Glossary", None),
    ("reference/baselines-cheatsheet.html", "Baselines cheatsheet", None),
]

SITE_HEADER = '''<div class="site-header">
  <div class="site-header-inner">
    <a href="/harden-windows-security/" class="site-logo">Harden Windows Security</a>
    <div class="site-nav">
      <a href="/">Home</a>
      <a href="/harden-windows-security/">Lessons</a>
      <a href="/harden-windows-security/reference/glossary.html">Glossary</a>
      <a href="/harden-windows-security/reference/baselines-cheatsheet.html">Baselines cheatsheet</a>
    </div>
  </div>
</div>

'''

SITE_FOOTER = '''

<footer class="site-footer">
  <div class="site-footer-inner">
    <div>
      <h4>Course</h4>
      <ul>
        <li><a href="/harden-windows-security/">Lessons</a></li>
        <li><a href="/harden-windows-security/reference/glossary.html">Glossary</a></li>
        <li><a href="/harden-windows-security/reference/baselines-cheatsheet.html">Baselines cheatsheet</a></li>
      </ul>
    </div>
    <div>
      <h4>Source</h4>
      <ul>
        <li><a href="https://github.com/HotCakeX/Harden-Windows-Security" target="_blank" rel="noopener">HotCakeX / Harden-Windows-Security</a></li>
      </ul>
    </div>
  </div>
  <div class="site-footer-bottom">
    Harden Windows Security &mdash; an on-prem GPO-native translation.
  </div>
</footer>'''

def wrap(path: Path, label: str):
    html = path.read_text()

    # Idempotency: skip if already wrapped
    if '<main>' in html or '<div class="site-header">' in html:
        print(f"  [skip] {path.relative_to(BASE)} — already wrapped")
        return False

    # 1. Insert site-header right after <body>
    if '<body>' not in html:
        print(f"  [warn] {path.relative_to(BASE)} — no <body> tag, skipping")
        return False

    html = html.replace('<body>\n', '<body>\n\n' + SITE_HEADER, 1)

    # 2. Insert <main> after the site-header and the first heading/title
    # Strategy: insert <main> right after the first <h1> opening OR right after site-header end.
    # Simpler: find the </div> closing site-header and insert <main> after it.
    html = html.replace(
        '</div>\n\n' if '</div>\n\n' in html else '</div>\n',
        '</div>\n\n<main>\n\n',
        1,
    )
    # Hmm — that may match a wrong </div>. Use a more specific anchor.
    # Reset and use a smarter approach.

    # Let me re-read the file and use a stricter regex.
    html = path.read_text()  # reset

    # Use regex: find </div> that closes site-header (the last </div> in the site-header block)
    # Strategy: match the exact site-header block we just inserted, then insert <main> after it.
    site_header_re = re.compile(
        r'(<div class="site-header">.*?</div>\s*</div>\s*</div>\n)(\s*)',
        re.DOTALL,
    )

    # We didn't insert yet, so check if file already has site-header.
    # For our case, file has <body>...content...</body> with no site-header.
    # Simpler plan: insert site-header + open <main> together right after <body>.
    # Then close </main> right before </body>.

    # Reset again
    html = path.read_text()

    # Skip if already has site-header
    if '<div class="site-header">' in html:
        print(f"  [skip] {path.relative_to(BASE)} — already has site-header")
        return False

    # Find <body> ... </body>
    body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
    if not body_match:
        print(f"  [warn] {path.relative_to(BASE)} — no <body>...</body>")
        return False

    body_inner = body_match.group(1)

    # Strip leading/trailing whitespace
    body_inner_stripped = body_inner.strip()

    # Build new body
    new_body_inner = (
        '\n\n'
        + SITE_HEADER
        + '<main>\n\n'
        + body_inner_stripped
        + '\n\n</main>'
        + SITE_FOOTER
        + '\n'
    )

    new_html = html[:body_match.start(1)] + new_body_inner + html[body_match.end(1):]

    path.write_text(new_html)
    print(f"  [ok]   {path.relative_to(BASE)} — wrapped ({label})")
    return True

def main():
    print(f"Wrapping harden-windows-security HTMLs in {BASE}\n")
    changed = 0
    for relpath, label, _ in LESSONS:
        if wrap(BASE / relpath, label):
            changed += 1
    for relpath, label, _ in REFERENCE:
        if wrap(BASE / relpath, label):
            changed += 1
    print(f"\nDone. {changed} file(s) modified.")

if __name__ == "__main__":
    main()