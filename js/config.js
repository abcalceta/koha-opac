/* ============================================================
   config.js — Homepage configuration
   This is the only file you need to edit to change the shelves,
   the hero text, and the "Visit the Library" panel. To change
   the Social Science Pioneers carousel, see pioneers-config.js
   instead.

   HOW TO ADD A SHELF:
     1. Go to Koha → Reports → Saved reports
     2. Find your report and note the ID in the URL (?id=NUMBER)
     3. Add a line below: { title: "Your Title", reportId: NUMBER }

   HOW TO REORDER:
     Just move the lines up or down. Top = first on the page.

   HOW TO REMOVE:
     Delete the line (don't forget to remove the trailing comma
     on the line above it).
   ============================================================ */

export const SHELVES = [
    { title: "Social Science Information Collection", reportId: 10 },
    { title: "Digital Collection: Random List",     reportId: 9  },
    { title: "Physical Collection: Random List",     reportId: 8  },
    { title: "Discover Books",          reportId: 1  },
];


/* ---- Homepage visualizations ----

   Data-driven homepage features bigger than a shelf — charts,
   clouds, browsable views — built from Koha saved reports the
   same way SHELVES is. See sql/ for the report SQL and
   js/visualization-loader.js for how this list becomes sections
   on the page.

   HOW TO ADD ONE:
     1. Create/save the report(s) it needs in Koha → Reports.
     2. Add an entry below with its report ID(s).
     3. Set enabled: false instead of deleting an entry to turn a
        visualization off without losing its configuration.

   Fields (exact set depends on "type" — see each renderer's file
   for what it expects):
     type             required. Which renderer draws this section —
                       must match a key in visualization-loader.js's
                       RENDERERS map.
     title             required. Section heading shown on the page.
     reportId          required. Koha saved report ID for the main
                       chart/view data.
     previewReportId    Koha saved report ID for on-demand detail
                       data (e.g. the books behind one bar of a
                       chart), if the visualization has one.
     enabled           optional, defaults to true.

   "publicationTimeline" (js/publication-timeline.js) — a bar
   chart of the collection by publication decade, expanding into a
   12-book preview shelf per decade on click:
     reportId          sql/publication-decade-timeline.sql
     previewReportId    sql/publication-decade-books.sql
*/
export const VISUALIZATIONS = [
    {
        type: "publicationTimeline",
        title: "Browse by Publication Decade",
        reportId: 21,
        previewReportId: 22,
        enabled: true,
    },
];


/* ---- Front page settings ----

   searchPlacement: where the search box appears —
     "hero"   — large, centered search below the headline (default)
     "navbar" — small search box in the top navbar instead
     "both"   — both at once

   heroTinted: whether the hero gets the drifting tinted
     background, or a plain one.
*/
export const SITE = {

    motto: "One Social Science in solidarity with other disciplines for Filipinos and the global community.",
    established: 1968,

    searchPlacement: "hero",
    heroTinted: true,

    address: {
        lines: [
            "2nd Floor, Philippine Social Science Center",
            "372-C Commonwealth Avenue, Brgy. UP Campus",
            "Diliman, Quezon City, Philippines 1101",
        ],
        mapQuery: "Philippine Social Science Center, Commonwealth Avenue, Diliman, Quezon City",
    },

    hours: [
        { days: "Monday – Friday",   time: "10:00 AM – 4:30 PM" },
        { days: "Saturday – Sunday", time: "Closed" },
    ],
    hoursNote: "Closed on public holidays · Please call to confirm if visiting.",

    /* Kept as an honest placeholder until access rules are set —
       swap this for the real eligibility/registration copy. */
    access: "Access requirements to be finalized — outline eligibility, registration, and what to bring here.",

};
