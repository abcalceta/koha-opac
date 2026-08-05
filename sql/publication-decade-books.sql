-- ============================================================
-- Report: "Browse by Publication Decade" — Book preview
-- ============================================================
-- Powers the expanding book-preview panel under the decade chart
-- (js/publication-timeline.js). Takes two runtime parameters —
-- the decade's start and end year — and returns candidate books
-- in that range. It derives the OPAC detail link and cover image
-- from biblionumber itself, so nothing here needs to duplicate
-- that.
--
-- Columns returned, IN THIS ORDER:
--   [0] biblionumber
--   [1] title
--   [2] author
--   [3] publication_year
--   [4] cover_url — optional, blank for most rows. Same
--       ExtractValue-on-MARC-856 pattern the "Digital Collection"
--       shelf report uses to find a book's cover on
--       library.pssc.org.ph/covers — most books in a random decade
--       slice won't have one (that's expected; the frontend falls
--       back to a TKL lookup, then a generated placeholder, same
--       as the shelves), but digital-resource items that do will
--       show their real cover immediately with no extra lookup.
--
-- WHY THIS IS DELIBERATELY DUMB SQL: earlier versions tried to do
-- the "~2 random books per year" selection here in SQL — first
-- with a CTE (Koha's guided reports tool rejects any query that
-- doesn't literally start with the word SELECT, so "WITH x AS
-- (...)" got bounced), then with window functions and probability
-- sampling (both required materializing/scanning the full matching
-- row set, which was still slow on busy decades, and the more
-- exotic SQL got harder to get actually saved and running through
-- Koha's report validator each time).
--
-- None of that is worth it. This report just grabs up to
-- CANDIDATE_LIMIT (300, hardcoded below) matching rows with NO
-- ORDER BY — meaning MySQL/MariaDB can stop scanning as soon as
-- it's found that many, rather than needing to sort or rank
-- anything — and hands them to the frontend. js/publication-
-- timeline.js's pickRandomSpread() does the actual "~2 per year,
-- capped at 12, shuffled" selection in plain JavaScript, which is
-- trivial to read, debug, and change without touching Koha's
-- report tooling at all.
--
-- Runtime parameters (Koha prompts for these when you save the
-- report as "<<placeholder>>" text):
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
--
-- If this is still slow on a very busy decade, the bottleneck is
-- almost certainly that biblio.copyrightdate has no index, meaning
-- even this plain WHERE ... BETWEEN is a full table scan. Ask
-- whoever has database access to run, once, outside of any report
-- (this is a schema change — confirm with your Koha admin before
-- running it on a production database):
--   ALTER TABLE biblio ADD INDEX idx_copyrightdate (copyrightdate);
-- ============================================================

SELECT
    biblio.biblionumber,
    biblio.title,
    biblio.author,
    biblio.copyrightdate AS publication_year,
    ExtractValue(
        biblio_metadata.metadata,
        '//datafield[@tag="856"][contains(subfield[@code="u"], "library.pssc.org.ph/covers")]/subfield[@code="u"]'
    ) AS cover_url
FROM biblio
LEFT JOIN biblio_metadata
    ON biblio_metadata.biblionumber = biblio.biblionumber
WHERE biblio.copyrightdate BETWEEN <<Decade start year>> AND <<Decade end year>>
LIMIT 300;
