# Portfolio v1 — Ben Garcia

Static photography portfolio. Plain HTML, CSS, and JavaScript — no build step,
no server. Open any `.html` file in a browser and it works.

This folder is the clean rebuild of the earlier `myapp` project. See
`docs/decisions.md` for what was dropped and why.

## Structure

```
portfolio-v1/
├── index.html          Home — intro gate, hero, pinned Greece gallery
├── world.html          Interactive map
├── projects.html       Project list
├── pillars.html        "Photographing the world before it's gone"
├── info.html           About
├── contact.html        Contact form (see note below)
├── oasis.html          Playground — 3D photo scene (three.js + gsap)
│
├── assets/
│   ├── css/site.css        Shared styles (all pages except oasis)
│   ├── js/oasis.js         Standalone copy of the oasis script
│   └── img/
│       ├── brand/          Signatures, profile photo
│       ├── greece/         20 photos — home page gallery
│       ├── playground/     138 photos — oasis scene
│       └── world-map.svg
│
├── archive/            Pages nothing links to. Kept, not deleted.
└── docs/               Notes and decisions
```

## Rules that keep this from getting messy again

1. **One home per file type.** Images in `assets/img/`, styles in
   `assets/css/`, scripts in `assets/js/`. Never beside the HTML.
2. **No "final", "v2", "copy", "new" in filenames.** Git tracks versions now —
   that is its whole job. If you want the old version, look at the history.
3. **Export folders are disposable.** Anything generated for another platform
   (Webflow embeds, minified bundles) is a build artifact, not source. It does
   not belong in this repo.
4. **If nothing links to a page, it goes in `archive/`** — so the root only
   ever shows pages that are actually part of the site.
5. **`oasis.html` is the source of truth for the playground.**
   `assets/js/oasis.js` is a copy for minifying. Edit the HTML first.

## Known issues

- **The contact form does not send anything.** On submit it shows a thank-you
  message and discards the input. Real submissions need either Webflow's native
  form or a form service. This was true before the rebuild too.
- **`archive/world-mobile.html`** was a separate mobile version of the map.
  `world.html` does not link to it.
- **`assets/img/brand/ben-garcia-signature-red.png`** and `ben-profile.jpg` are
  unused. Kept in case they are wanted.

## Running it

Just open `index.html` in a browser. Or, to serve it properly:

```
python3 -m http.server 4001
```

Then visit http://localhost:4001

## Where this is going

- **This repo** → GitHub Pages, the static portfolio. Private while in
  progress, public when ready.
- **Webflow** → a separate primary site for the blog, working forms, and
  anything that needs a CMS. It does not need to match this one.

`docs/webflow-porting-notes.md` describes the *old* plan of porting every page
into Webflow. It is kept for reference but is no longer the plan.
