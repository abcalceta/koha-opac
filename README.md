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
the homepage. Three files hold all the editable content:

- **`js/config.js`** — the shelves (which Koha saved report feeds
  each "Discover"-style row), homepage **visualizations** (see
  below), the hero motto/search placement, and the Visit the
  Library panel (address, hours, access notes).
- **`js/pioneers-config.js`** — the Social Science Pioneers
  carousel and Pioneer Papers shelf. Add a pioneer with just
  `{ name: "Full Name" }`; photos/quotes/bios/paper links are all
  optional and fall back to honest placeholders until filled in.

Both files have a comment block at the top explaining exactly how
to add/reorder/remove entries and where to drop image files.

## Homepage visualizations

Bigger, interactive homepage features (currently: "Browse by
Publication Decade", a bar chart of the collection by decade that
expands into a book-preview shelf when you click one) are
configured the same way as shelves — through the `VISUALIZATIONS`
list in `js/config.js` — and are also driven entirely by Koha
saved reports, no custom backend.

**To install "Browse by Publication Decade":**

1. In the Koha **staff client** → Reports → **New SQL report**,
   paste the query from
   [`sql/publication-decade-timeline.sql`](sql/publication-decade-timeline.sql).
   Save it and note its report ID (shown in the URL as `?id=N` once
   you open it, or in the reports list).
2. Same thing with
   [`sql/publication-decade-books.sql`](sql/publication-decade-books.sql) —
   this one takes two runtime parameters (decade start/end year),
   which Koha will prompt you for automatically since the query
   contains `<<Decade start year>>` / `<<Decade end year>>`. Note
   its report ID too.
3. In `js/config.js`, set `reportId` to the first report's ID and
   `previewReportId` to the second's, in the `VISUALIZATIONS`
   entry with `type: "publicationTimeline"`.
4. Reload the OPAC homepage. If the chart doesn't appear, open
   your browser's console — `publication-timeline.js` logs which
   report failed and why (wrong report ID, report deleted, etc).

Publication year comes from `biblio.copyrightdate`, the field Koha
populates from your MARC records' publication-date data — if a
record has no copyrightdate, it just won't appear in any decade.

Set `enabled: false` on an entry to turn a visualization off
without losing its configuration. See the comment block above
`VISUALIZATIONS` in `config.js` for the full field reference, and
the comments at the top of each `.sql` file for column-order and
parameter details.

**Adding another visualization later** (a Subject Cloud, a
Languages breakdown, etc.) doesn't require touching the rendering
engine (`js/visualization-loader.js`) beyond one line:

1. Write `js/your-visualization.js` exporting a render function
   `(mountElement, vizConfigEntry) => void` — it owns its own
   loading/empty states and DOM, same contract as
   `renderPublicationTimeline` in `js/publication-timeline.js`.
2. Import it in `visualization-loader.js` and add one line to its
   `RENDERERS` map (`type` → your function).
3. Add the stylesheet filename to `CSS_FILES` in `main.js`.
4. Add an entry to `VISUALIZATIONS` in `config.js`.

## Repo layout

- `js/main.js` — entry point, wires everything together. Only
  edit this if you're changing *how* the page is built, not what's
  on it.
- `js/homepage.js`, `hero.js`, `pioneers.js`, `navbar.js`,
  `shelf.js`, `search.js`, `covers.js` — the building blocks.
- `js/visualization-loader.js` — generic engine that turns
  `VISUALIZATIONS` entries into homepage sections; knows nothing
  about any specific visualization.
- `js/publication-timeline.js` — the "Browse by Publication
  Decade" chart/panel renderer, registered with the loader above.
- `sql/` — the Koha SQL reports each visualization reads from.
  Paste these into Koha's Reports module rather than editing them
  in place; see "Homepage visualizations" above.
- `css/` — one stylesheet per concern (tokens, layout, navbar,
  hero, pioneers, shelves, visualizations, visit/footer, search,
  detail). No bundled `theme.css` — `main.js` loads each file
  directly, so there's nothing to keep manually in sync.
- `images/logo.jpg` — site logo (navbar, footer, and the `#logo`
  CSS background on non-homepage pages).
- `images/pioneers/` — drop pioneer headshots and Pioneer Papers
  first-page thumbnails here; reference them from
  `pioneers-config.js`.
