/* ============================================================
   config.js — Homepage shelf configuration
   This is the only file you need to edit to change the homepage.

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
    { title: "Featured Collection",     reportId: 6  },
    { title: "Anthropology Highlights", reportId: 7  },
    { title: "Discover Books",          reportId: 6  },
];
