/* ============================================================
   pioneers-config.js — Social Science Pioneers carousel content
   This is the only file you need to edit to change the "Social
   Science Pioneers" carousel and the Pioneer Papers shelf below
   it on the homepage.

   HOW TO ADD A PIONEER:
     Add a line with at least a name:
       { name: "Full Name" }
     Everything else is optional and shows an honest placeholder
     until you fill it in — nothing breaks with just a name.

   HOW TO ADD A PHOTO / PAPER THUMBNAIL:
     Use external URLs directly (recommended):

       { name: "Emma Porio",
         photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Porio.png",
         pdfHref: "https://example.com/porio.pdf",
         pdfThumb: "https://example.com/porio-cover.jpg" }

     Or use local files in images/pioneers/:

       { name: "Alfredo Lagmay",
         photo: "images/pioneers/alfredo-lagmay.jpg",
         pdfHref: "pdfs/alfredo-lagmay.pdf",
         pdfThumb: "images/pioneers/alfredo-lagmay-paper.jpg" }

     Missing or broken images fall back to generated placeholders
     (same idea as book covers with no image).

   HOW TO REORDER / REMOVE:
     Same as config.js — move or delete lines (mind trailing commas).

   Fields:
     name        required.  Full name as displayed.
     slug        optional.  Used to build default image paths.
                 Auto-generated from name if omitted.
     affiliation optional.  One line under the name.
     quote       optional.  Shown large, in quotes.
     bio         optional.  A sentence or two.
     photo       optional.  Path/URL to a headshot image.
     pdfHref     optional.  Link to the full paper/essay. The
                 "Read the full essay" link is hidden if omitted.
     pdfThumb    optional.  Path/URL to a first-page thumbnail
                 image for the Pioneer Papers shelf.
   ============================================================ */

export const PIONEERS = [
    { name: "Alfredo Lagmay" },
    { name: "Amaryllis Torres" },
    { name: "Andrew Gonzalez" },
    { name: "Arsenio Balisacan" },
    { name: "Bonifacio Sibayan" },
    { name: "Dominador Rosell" },
    { name: "Domingo Salita" },
    { name: "Emma Porio",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Porio.png" },
    { name: "Felipe Miranda" },
    { name: "Florangel Braid" },
    { name: "Francis Maigan" },
    { name: "Francisco Nemenzo" },
    { name: "Frank X. Lynch" },
];
