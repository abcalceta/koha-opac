-- ============================================================
-- Report: "Browse by Publication Decade" — Timeline
-- ============================================================
-- Powers the homepage decade bar chart (js/publication-timeline.js).
-- One row per decade that has at least one book.
--
-- Columns returned, IN THIS ORDER (the frontend reads report rows
-- positionally, same convention as every other report on this
-- site — see js/shelf.js):
--   [0] decade          e.g. "1980s"
--   [1] book_count      integer
--   [2] earliest_year   integer — oldest copyrightdate found in the decade
--   [3] latest_year     integer — newest copyrightdate found in the decade
--   [4] top_subjects    pipe-delimited, e.g. "Politics|Governance|Democracy"
--                        (optional — Option A below always returns NULL/blank
--                        for this column; the frontend treats a missing
--                        value as "no subjects to show" and just omits
--                        that line from the tooltip)
--
-- Install: Koha staff client → Reports → New SQL report. Paste
-- Option A (recommended) unless you specifically want the subject
-- breakdown and have confirmed Option B works against your catalog
-- (see the caveats below it). Note the report's numeric ID after
-- saving — that's the "reportId" you put in js/config.js.
-- ============================================================


-- ---- Option A — recommended: fast, always works ----
-- Uses biblio.copyrightdate (the field Koha populates from the
-- MARC publication-date data), grouped into 10-year buckets.

SELECT
    CONCAT(FLOOR(biblio.copyrightdate / 10) * 10, 's') AS decade,
    COUNT(*)                                            AS book_count,
    MIN(biblio.copyrightdate)                           AS earliest_year,
    MAX(biblio.copyrightdate)                           AS latest_year,
    NULL                                                 AS top_subjects
FROM biblio
WHERE biblio.copyrightdate BETWEEN 1400 AND YEAR(CURDATE())
GROUP BY decade
ORDER BY earliest_year ASC;


-- ---- Option B — optional: adds top_subjects ----
-- Extracts MARC21 650$a (subject heading) values from each
-- record's stored MARCXML and returns the 3 most common per
-- decade. This is heavier (it parses XML per matching row) and
-- assumes:
--   1. Your records are cataloged in MARC21 (not UNIMARC — the
--      subject tag differs).
--   2. biblio_metadata.format = 'marcxml' for your records (the
--      Koha default).
--   3. Your MySQL/MariaDB version supports window functions
--      (MariaDB 10.2+ / MySQL 8+ — true for any currently
--      supported Koha release).
-- Test it on a copy/staging catalog first if your collection is
-- large — ExtractValue does not use an index, so this scales with
-- total biblio count, not just the decade being queried. If it's
-- too slow, keep Option A and simply leave top_subjects blank;
-- the frontend already treats that as optional.
--
-- WITH decades AS (
--     SELECT
--         biblio.biblionumber,
--         biblio.copyrightdate,
--         CONCAT(FLOOR(biblio.copyrightdate / 10) * 10, 's') AS decade
--     FROM biblio
--     WHERE biblio.copyrightdate BETWEEN 1400 AND YEAR(CURDATE())
-- ),
-- subject_counts AS (
--     SELECT
--         d.decade,
--         ExtractValue(bm.metadata, '//datafield[@tag="650"][1]/subfield[@code="a"][1]') AS subject,
--         COUNT(*) AS subject_count
--     FROM decades d
--     JOIN biblio_metadata bm
--         ON bm.biblionumber = d.biblionumber AND bm.format = 'marcxml'
--     WHERE ExtractValue(bm.metadata, '//datafield[@tag="650"][1]/subfield[@code="a"][1]') <> ''
--     GROUP BY d.decade, subject
-- ),
-- ranked_subjects AS (
--     SELECT
--         decade,
--         subject,
--         ROW_NUMBER() OVER (PARTITION BY decade ORDER BY subject_count DESC, subject ASC) AS rn
--     FROM subject_counts
-- ),
-- top_subjects AS (
--     SELECT decade, GROUP_CONCAT(subject ORDER BY rn SEPARATOR '|') AS top_subjects
--     FROM ranked_subjects
--     WHERE rn <= 3
--     GROUP BY decade
-- )
-- SELECT
--     d.decade,
--     COUNT(*)                  AS book_count,
--     MIN(d.copyrightdate)      AS earliest_year,
--     MAX(d.copyrightdate)      AS latest_year,
--     ts.top_subjects           AS top_subjects
-- FROM decades d
-- LEFT JOIN top_subjects ts ON ts.decade = d.decade
-- GROUP BY d.decade, ts.top_subjects
-- ORDER BY earliest_year ASC;
