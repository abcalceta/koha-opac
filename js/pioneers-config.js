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
    { name: "Alfredo Lagmay",
      photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Alfredo-Lagmay.jpg",
      affiliation: "Psychology",
      quote: "That within the culture, bahala na is a positive, functional response to uncertainty, not submission, surrender, retreat, or cessation of effort.",
      bio: "Alfredo V. Lagmay was a pioneering Filipino psychologist whose work helped establish scientific psychology in the Philippines. His research on experimental and clinical psychology, Filipino values, and indigenous psychology shaped generations of scholars and elevated the study of Filipino culture in psychological research." },

    { name: "Amaryllis Torres",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/04/Amaryllis-Torres.jpg",
      affiliation: "Psychology",
      quote: "In sum, what needs to be re-defined are social expectations of masculine and feminine roles, so that marital and family relations will be characterized not only by sanctity, harmony, and respect, but also by equity and equality between women and men across generations.",
      bio: "Amaryllis T. Torres is an educator, researcher, and advocate for gender and development. Her scholarship examines women's experiences across family life, work, institutions, literature, and Philippine society, making lasting contributions to feminist scholarship and gender studies." },

    { name: "Andrew Gonzalez",
      photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Andrew-Gonzalez.jpg",
      affiliation: "Education & Linguistics",
      quote: "The process, not the product, is important for our efforts, for the product will arise from the process quite naturally and spontaneously.",
      bio: "Br. Andrew Gonzalez, FSC devoted his life to Christian education and Philippine linguistics. His extensive work spans descriptive, historical, psycho-, socio-, and applied linguistics, helping shape language education and policy in the Philippines." },

    { name: "Arsenio Balisacan",
      photo: "https://www.phcc.gov.ph/file-manager/1/Photo%20Gallery/Photos/balisacan-1.png",
      affiliation: "Economics",
      quote: "Thus, while poverty in the Philippines responds elastically to growth, the economy's ability to translate growth to poverty reduction appears weaker than for the average developing country.",
      bio: "Arsenio M. Balisacan is an economist recognized internationally for his work on economic development, poverty, inequality, and policy reform. His research and public service have significantly influenced poverty reduction and agricultural policy in the Philippines." },

    { name: "Bonifacio Sibayan",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Sibayan.png",
      affiliation: "Education & Sociolinguistics",
      quote: "It is needless to elucidate the proposition that a people constituting one nationality and one state should possess a language spoken and understood by all.",
      bio: "Bonifacio P. Sibayan was a leading Filipino sociolinguist whose research on language planning, bilingualism, and education greatly influenced language policy and linguistic scholarship in the Philippines." },

    { name: "Dominador Rosell",
      affiliation: "Geography",
      quote: "Everybody scratches his head about food and population problems while the answer is only behind the house where the research biological and agricultural scientists live.",
      bio: "Prof. Dominador Z. Rosell played a central role in the Philippine Geographical Society, helping expand the discipline's influence while promoting geographic research and education across the country." },

    { name: "Domingo Salita",
      affiliation: "Geography & Economics",
      quote: "While every subject gives some aspects of environmental study, the fact remains that Geography has the most contribution as a single discipline in the broad spectrum of environmental education.",
      bio: "Dr. Domingo C. Salita is a geographer, economist, engineer, lawyer, and educator whose interdisciplinary career advanced geography, environmental education, and regional development studies." },

    { name: "Emma Porio",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Porio.png",
      affiliation: "Sociology",
      quote: "Thus, urban design and landscape of the capital city reflect the socio-political and economic relations of the rulers and the ruled, between the center and the peripheral areas of the country.",
      bio: "Emma E. Porio is a sociologist whose research focuses on urban development, governance, gender, climate vulnerability, resilience, and the lives of marginalized communities in rapidly changing cities." },

    { name: "Felipe Miranda",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Miranda.png",
      affiliation: "Political Science",
      quote: "When Filipinos are down, they refuse to stay down and be counted out.",
      bio: "Felipe B. Miranda is a political scientist, educator, and public opinion expert whose work on governance, democracy, political behavior, and civil-military relations has shaped political science research in the Philippines." },

    { name: "Florangel Braid",
      photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Braid.png",
      affiliation: "Journalism & Communication",
      quote: "The courage and objectivity of broadcast journalists deserve the accolade given to them by a grateful nation.",
      bio: "Dr. Florangel Rosario-Braid is a scholar, communication expert, and advocate whose work spans journalism, broadcasting, information technology, continuing education, cooperatives, and sustainable development." },

    { name: "Francis Maigan",
      affiliation: "Sociology",
      quote: "We social scientists protest that we and our activities are relevant to life in terms of our research findings, hypotheses, and insights into Philippine culture and social organization.",
      bio: "Rev. Francis C. Madigan, SJ founded the Research Institute for Mindanao Culture and devoted his career to studying Philippine society, culture, and development, particularly in Mindanao." },

    { name: "Francisco Nemenzo",
      photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Francisco-Nemenzo.jpg",
      affiliation: "Political Science",
      quote: "Even if our universities remain a factory for the mass production of marketable skills, we can create enclaves of innovation within the system.",
      bio: "Dr. Francisco 'Dodong' Nemenzo was one of the Philippines' foremost political scientists. A professor, dean, chancellor, and University of the Philippines president, he championed critical scholarship, democratic engagement, and transformative education." },

    { name: "Frank X. Lynch",
      affiliation: "Anthropology & Sociology",
      quote: "One is surrounded at every moment, in other words, by people who are potentially or in fact his allies, people he can count on to a greater or smaller degree.",
      bio: "Fr. Frank X. Lynch, SJ was a pioneering social anthropologist whose influential studies of Filipino values, culture, and society helped establish Philippine anthropology and social science research." }
];
