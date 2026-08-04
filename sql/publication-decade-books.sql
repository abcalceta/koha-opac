-- ============================================================
-- Report: "Browse by Publication Decade" — Book preview
-- ============================================================
-- Powers the expanding book-preview panel under the decade chart
-- (js/publication-timeline.js). Takes two runtime parameters —
-- the decade's start and end year — and returns the books in
-- that range. The frontend slices this down to ~12 cards and
-- derives the OPAC detail link and cover image from biblionumber
-- itself, so nothing here needs to duplicate that.
--
-- Columns returned, IN THIS ORDER:
--   [0] biblionumber
--   [1] title
--   [2] author
--   [3] publication_year
--
-- Runtime parameters (Koha prompts for these when you save the
-- report as "<<placeholder>>" text — see install notes below):
--   1st  Decade start year   e.g. 1980
--   2nd  Decade end year     e.g. 1989
--
-- Install: Koha staff client → Reports → New SQL report. Paste
-- this query as-is — Koha auto-detects the two <<...>> parameters
-- and will prompt for "Decade start year" / "Decade end year"
-- when you run it manually. Note the report's numeric ID after
-- saving — that's the "previewReportId" you put in js/config.js.
--
-- The frontend calls this report via:
--   /cgi-bin/koha/svc/report?id=PREVIEW_REPORT_ID
--     &sql_params=<earliest_year>&sql_params=<latest_year>
-- (the earliest_year/latest_year values come straight from the
-- timeline report, so the two reports always agree on what's "in"
-- a given decade). Koha's svc/report has accepted repeated
-- sql_params query params for saved-report runtime parameters
-- across recent versions; if your Koha version behaves
-- differently, open the URL above directly in a browser first —
-- if it doesn't return the expected rows, check your version's
-- Reports::Guided documentation for the exact parameter-passing
-- convention and adjust loadDecadeBooks() in
-- js/publication-timeline.js accordingly (it's the only place
-- that builds this URL).
-- ============================================================

SELECT
    biblio.biblionumber,
    biblio.title,
    biblio.author,
    biblio.copyrightdate AS publication_year
FROM biblio
WHERE biblio.copyrightdate BETWEEN <<Decade start year>> AND <<Decade end year>>
ORDER BY biblio.copyrightdate ASC, biblio.title ASC
LIMIT 200;
