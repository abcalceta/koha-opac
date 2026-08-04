-- ============================================================
-- Report: "Browse by Publication Decade" — Book preview
-- ============================================================
-- Powers the expanding book-preview panel under the decade chart
-- (js/publication-timeline.js). Takes two runtime parameters —
-- the decade's start and end year — and returns up to ~2 random
-- books per year in that range (so a busy decade doesn't always
-- show the same alphabetically-first 12 books every time you open
-- it), capped at 12 total to match PREVIEW_LIMIT in
-- publication-timeline.js — no point fetching/parsing more than
-- gets shown. It derives the OPAC detail link and cover image
-- from biblionumber itself, so nothing here needs to duplicate
-- that.
--
-- A NOTE ON SPEED: this went through two earlier approaches before
-- landing here —
--   1. ORDER BY RAND() LIMIT 12 over the whole decade: slow, since
--      MySQL/MariaDB can't use an index for a random sort key, so
--      it has to materialize and sort every matching row.
--   2. ROW_NUMBER() OVER (PARTITION BY year ORDER BY RAND()): a
--      real improvement in variety, but STILL requires sorting
--      every matching row (just grouped by year first) — the sort
--      is the expensive part, and partitioning doesn't remove it.
-- This version instead computes each year's row count once (cheap
-- — one GROUP BY pass) and keeps each row with probability
-- 2/count, decided independently per row with no sort at all. It
-- won't land on exactly 2 every year (a thin year might contribute
-- 1 or 3) — an acceptable trade for "2 or so" — but it never has
-- to materialize-and-sort the decade's full row set, which is what
-- was actually making the earlier versions slow.
--
-- If it's STILL slow after this, the bottleneck is almost
-- certainly that biblio.copyrightdate has no index, meaning even
-- the WHERE ... BETWEEN filter itself is a full table scan before
-- any of the above runs. Ask whoever has database access to run,
-- once, outside of any report (this is a schema change, not
-- something a saved report can do — confirm with your Koha admin
-- before running it on a production database):
--   ALTER TABLE biblio ADD INDEX idx_copyrightdate (copyrightdate);
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
-- Written as "SELECT ... FROM (SELECT ...) AS x" rather than a
-- "WITH x AS (...) SELECT ..." CTE on purpose: Koha's guided
-- reports tool checks that a saved report's SQL starts with the
-- literal word SELECT (its guard against non-SELECT statements
-- being saved as a report) and rejects a query that opens with
-- WITH instead, even though it's equally valid, read-only SQL. A
-- subquery in the FROM clause does the same job as a CTE here and
-- keeps SELECT as the first word.
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

SELECT biblionumber, title, author, publication_year
FROM (
    SELECT
        biblio.biblionumber,
        biblio.title,
        biblio.author,
        biblio.copyrightdate AS publication_year
    FROM biblio
    JOIN (
        SELECT copyrightdate, COUNT(*) AS year_count
        FROM biblio
        WHERE copyrightdate BETWEEN <<Decade start year>> AND <<Decade end year>>
        GROUP BY copyrightdate
    ) AS year_counts
        ON year_counts.copyrightdate = biblio.copyrightdate
    WHERE RAND() < (2.0 / year_counts.year_count)
) AS sampled
ORDER BY RAND()
LIMIT 12;
