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
    { title: "Featured Collection",     reportId: 1  },
    { title: "Anthropology Highlights", reportId: 7  },
    { title: "Discover Books",          reportId: 6  },
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
        { days: "Monday – Friday",   time: "8:00 AM – 5:00 PM" },
        { days: "Saturday – Sunday", time: "Closed" },
    ],
    hoursNote: "Closed on public holidays · edit hours to confirm",

    /* Kept as an honest placeholder until access rules are set —
       swap this for the real eligibility/registration copy. */
    access: "Access requirements to be finalized — outline eligibility, registration, and what to bring here.",

};
