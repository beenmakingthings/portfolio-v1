# Porting the site into Webflow

## Read this first — why the home page didn't load

**Webflow's Page Settings custom-code fields cap at 10,000 characters.** The
home page's CSS is ~15.7k and its scripts ~11.3k, so Webflow silently refuses to
save them — nothing loads, with no error.

**Embed elements allow 50,000 characters.** So everything goes in Embeds
instead. Use the `*-EMBED-1-*` / `*-EMBED-2-*` files below and ignore the older
`-head` / `-embed` / `-footer` trio, which is kept only for reference.

---

## The method — two Embeds per page

| Step | File | Where |
|---|---|---|
| 1 | `PAGE-SETTINGS-head.html` | Page Settings → Inside `<head>` (tiny, fits) |
| 2 | `{page}-EMBED-1-styles-markup.html` | An Embed element on the canvas |
| 3 | `{page}-EMBED-2-scripts.html` | A **second** Embed at the very bottom |

Embed 2 must sit **below** all content — the scripts expect the markup to exist
when they run.

### Sizes (limit 50,000)

| Page | Embed 1 | Embed 2 |
|---|---|---|
| index | 21.8k | 11.4k |
| world | 35.3k | 9.7k |
| projects | 11.9k | 2.6k |
| info | 15.9k | 2.6k |
| contact | 13.9k | 3.9k |
| pillars | 12.4k | 2.6k |
| professional | 11.9k | 2.6k |
| ben | 12.1k | 2.6k |
| oasis | 14.9k | 27.0k (minified) |

---

## Page slugs — create these exactly

Links are rewritten from `world.html` to `/world`, so the slugs must match:

| Page | Slug |
|---|---|
| index | `/` (Home) |
| world | `/world` |
| projects | `/projects` |
| info | `/info` |
| contact | `/contact` |
| pillars | `/pillars` |
| professional | `/professional` |
| ben | `/ben` |
| oasis | `/oasis` |

To call the playground `/playground`, rename it in Webflow **and** find-replace
`/oasis` → `/playground` in the `EMBED-1` files.

---

## Which pages need real attention

**Three are involved:**
- **index** — gate, hero, pinned gallery. Needs the 20 Greece URLs.
- **oasis** — Three.js playground. Embed 2 is already minified (48.1k → 26.5k).
  Needs the 138 playground URLs. Keep the `importmap` script *before* the
  `module` script or Three.js won't resolve.
- **world** — largest Embed 1 (35.3k) because of the inline SVG map.

**Six are quick:** projects, info, contact, pillars, professional, ben — plain
content plus nav/footer.

---

## Images to upload

Webflow Assets → upload → copy URL → swap the path in Embed 1.

| Asset | Used by |
|---|---|
| `img/ben-garcia-signature-teal.png` | nav logo, all pages except oasis |
| `img/ben-garcia-signature.png` | nav logo on oasis (dark nav) |
| `img/ben-profile.jpg` | info |
| `img/world-map.svg` | world |
| `img/greece/` — 20 photos | → `GREECE_IMAGES` array in `index-EMBED-2` |
| `img/playground/` — 138 photos | → `IMAGE_URLS` array in `oasis-EMBED-2` |

Social icons load from `cdn.simpleicons.org` — no change needed.

### Worth doing before uploading the playground photos

They're 138 files at 1600×1201 totalling **43MB**, and the loader requests all
of them at once on page load. That, not script size, is what makes oasis slow.
Downscaling to ~1000px at quality 70 should land around 8–10MB with no visible
difference at the size they render.

---

## Gotchas

- **Custom code only runs on a published site with a paid Site plan.** It does
  not execute in the Designer canvas or on a free `.webflow.io` domain. A blank
  page in the Designer is expected — always test by publishing.

- **Don't also add a native Webflow navbar.** The nav is inside each Embed, so
  you'd get two. Trade-off: it's edited by hand in the Embed, not the Designer.

- **Body style collision.** The CSS includes a `body { }` rule, and Webflow
  styles the body from the Style panel too; whichever loads last wins. If the
  background or base font looks wrong, delete the `body` rule from Embed 1 and
  set those properties on the Body element in Webflow.

- **Sticky sections.** The home page's pinned hero and gallery need
  `position: sticky`, which breaks if any ancestor sets `overflow` to anything
  but `visible`. Embed 1 includes `.w-embed { overflow: visible !important; }`
  to pre-empt this. If pinning still fails, check the parent Section's overflow.

- **Section heights are scroll distance, not visual height.** `#hero-section`
  is 220vh and `#gallery-section` ~750vh. They look like one screen because the
  inner element is sticky; the extra height gives the animation room to run.

- **Don't add Webflow interactions to these elements** — they're driven by GSAP
  ScrollTrigger and rAF loops, which conflicting transforms will fight.

- **The intro gate shows once per session** (`sessionStorage.introSeen`). Use a
  private window to see it again.

- **Re-minifying oasis.** `oasis.html` stays the source of truth. After editing
  it, regenerate with:
  `npx terser oasis-module.js --module -c -m -o oasis-module.min.js`
