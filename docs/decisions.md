# Rebuild decisions — what was dropped from `myapp` and why

The original project is untouched at `~/Projects/myapp`. Nothing was deleted
there. This document records what did *not* get carried into v1.

## Dropped

**`server.js` and `package.json`** — a seven-line Express app whose only job was
to serve the `public/` folder. GitHub Pages does the same thing. Dropping it
removes the `node_modules` folder (3.7 MB) and the whole Node dependency.
Nothing on the site used the server; there was no backend behaviour to lose.

**`public/webflow/` — 48 files** — export artifacts from the earlier plan of
moving all nine pages into Webflow as pasted Embed blocks. Generated output, not
source. The current plan builds Webflow separately, so these are stale. The
folder's README was worth keeping and is now `docs/webflow-porting-notes.md`.

**`public/webflow/import-kit/`** — a second, byte-identical copy of several of
those same export files.

**`oasis.webflow-body-inline.html`, `oasis.webflow-body-markup.html`,
`oasis.webflow-head.html`, `sphere-preview.webflow-body.html`** — more of the
same: fragments of `oasis.html` split up for pasting into Webflow.

## Moved to `archive/`

Three pages that exist but that nothing links to — no nav item, no link from any
other page:

- `ben.html`
- `professional.html`
- `world-mobile.html`

Kept because they may be wanted later; moved out of the root so the top level
shows only the live site.

## Changed

**Photos resized.** The 138 playground photos were 1600×1201 and 43 MB total,
all requested at once when `oasis.html` loads. Resized to 1000 px wide at
quality 70: **43 MB → 27 MB**. Originals remain at
`~/Projects/myapp/public/img/playground/`.

Note: the old porting notes estimated 8–10 MB for this step. That was
optimistic — reaching it needs roughly quality 35, which is visibly worse. If
the page still feels slow, the real fix is loading photos as they come into
view rather than all at once.

**Asset paths rewritten.** `style.css` → `assets/css/site.css`, `img/…` →
`assets/img/…`, brand images into `assets/img/brand/`. All 7 live pages and all
3 archived pages were updated and every reference verified to resolve.

**`style.css` renamed to `site.css`** — "style" says nothing about which styles.

## Verified after the move

- Every `src`/`href` pointing at a local css/js/image file resolves to a real
  file (one exception: a placeholder path inside an HTML comment in `info.html`).
- Every page-to-page link resolves.
