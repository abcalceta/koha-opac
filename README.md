# HOW TO USE

## In OPACUserJS put this:

'''
(function(){
  
  let script = document.createElement("script");
  script.type = "module";
  script.src = "https://USERNAME.github.io/koha-opac/js/main.js";
  document.head.appendChild(script);

})();
'''

Nothing else is needed — `main.js` injects its own CSS (one
`<link>` per file in `css/`, no build/bundle step) and fonts, and
builds the whole homepage from the two config files below.

## Editing the homepage — for the intern

You should almost never need to touch code to change what's on
the homepage. Two files hold all the editable content:

- **`js/config.js`** — the shelves (which Koha saved report feeds
  each "Discover"-style row), the hero motto/search placement,
  and the Visit the Library panel (address, hours, access notes).
- **`js/pioneers-config.js`** — the Social Science Pioneers
  carousel and Pioneer Papers shelf. Add a pioneer with just
  `{ name: "Full Name" }`; photos/quotes/bios/paper links are all
  optional and fall back to honest placeholders until filled in.

Both files have a comment block at the top explaining exactly how
to add/reorder/remove entries and where to drop image files.

## Repo layout

- `js/main.js` — entry point, wires everything together. Only
  edit this if you're changing *how* the page is built, not what's
  on it.
- `js/homepage.js`, `hero.js`, `pioneers.js`, `navbar.js`,
  `shelf.js`, `search.js`, `covers.js` — the building blocks.
- `css/` — one stylesheet per concern (tokens, layout, navbar,
  hero, pioneers, shelves, visit/footer, search, detail). No
  bundled `theme.css` — `main.js` loads each file directly, so
  there's nothing to keep manually in sync.
- `images/logo.jpg` — site logo (navbar, footer, and the `#logo`
  CSS background on non-homepage pages).
- `images/pioneers/` — drop pioneer headshots and Pioneer Papers
  first-page thumbnails here; reference them from
  `pioneers-config.js`.
