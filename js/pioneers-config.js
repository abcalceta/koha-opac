/* ============================================================
   pioneers-config.js — Social Science Pioneers carousel content
   This is the only file you need to edit to change the "Social
   Science Pioneers" carousel and the papers list below it on
   the homepage.

   HOW TO ADD A PIONEER:
     Add a line with at least a name:
       { name: "Full Name" }
     Everything else is optional and shows an honest placeholder
     until you fill it in — nothing breaks with just a name.

   HOW TO ADD A PHOTO:
     Use external URLs directly (recommended):
       { name: "Emma Porio",
         photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Porio.png" }
     Or use local files in images/pioneers/:
       { name: "Alfredo Lagmay",
         photo: "images/pioneers/alfredo-lagmay.jpg" }
     Missing or broken images fall back to generated placeholders
     (same idea as book covers with no image).

   HOW TO ADD PAPERS:
     Add a papers array — each entry needs a title and an href:
       { name: "Alfredo Lagmay",
         papers: [
           { title: "Bahala Na", href: "https://example.com/bahala-na.pdf" },
           { title: "Journey of a Humanist", href: "https://example.com/journey.pdf" },
         ] }
     The lower box on the homepage lists whichever pioneer is
     currently selected in the carousel above. A pioneer with no
     papers shows an honest "no papers on file yet" message.

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
     papers      optional.  Array of { title, href } objects —
                 the full list of that pioneer's papers, shown
                 in the lower box. Each entry:
                   title  required.  Display title of the paper.
                   href   required.  Link to the PDF.
   ============================================================ */

export const PIONEERS = [
  {
    name: "Alfredo Lagmay",
    photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Alfredo-Lagmay.jpg",
    papers: [
      { title: "A Logical Analysis of the Concept of Existence Involved in Existence Propositions", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Alfredo%20Lagmay/A%20Logical%20Analysis%20of%20the%20Concept%20of%20Existence%20Involved%20in%20Existence%20Propositions.pdf" },
      { title: "Bahala Na (PJP)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Alfredo%20Lagmay/Bahala%20Na%20(PJP).pdf" },
      { title: "Journey of a Humanist", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Alfredo%20Lagmay/Journey%20of%20a%20Humanist.pdf" },
      { title: "Responses on Elementary School Children to the PCAT", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Alfredo%20Lagmay/Responses%20on%20Elementary%20School%20Children%20to%20the%20PCAT.pdf" },
      { title: "Studies on a PCAT Construction and Development Administration", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Alfredo%20Lagmay/Studies%20on%20a%20PCAT%20Construction%20and%20Development%20Administration.pdf" },
    ],
  },

  {
    name: "Amaryllis Torres",
    photo: "https://pssc.org.ph/wp-content/uploads/2022/04/Amaryllis-Torres.jpg",
    papers: [
      { title: "A Study of People's Power, Bangus Fry Catchers in Control of Production", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/A%20Study%20of%20People_s%20Power,%20Bangus%20Fry%20Catchers%20in%20Control%20of%20Production.pdf" },
      { title: "Documentation of Specific Area Experiences in Primary Health Care", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Documentation%20of%20Specific%20Area%20Experiences%20in%20Primary%20Health%20Care.pdf" },
      { title: "Gender and Development Making the Bureaucracy Gender-Responsive", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Gender%20and%20Development%20Making%20the%20Bureaucracy%20Gender-Responsive.pdf" },
      { title: "How Much Really Goes to Women, A Case Study on the GAD Budget in Angeles City", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/How%20Much%20Really%20Goes%20to%20Women,%20A%20Case%20Study%20on%20the%20GAD%20Budget%20in%20Angeles%20City.pdf" },
      { title: "Kinship and Social Relations in Filipino Culture", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Kinship%20and%20Social%20Relations%20in%20Filipino%20Culture.pdf" },
      { title: "Love in the Time of Ina Morata", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Love%20in%20the%20Time%20of%20Ina%20Morata.pdf" },
      { title: "Mga Ina ng Bayan", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Mga%20Ina%20ng%20Bayan.pdf" },
      { title: "Pakapa-kapa as an Approach in Philippine Psychology", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Pakapa-kapa%20as%20an%20Approach%20in%20Philippine%20Psychology.pdf" },
      { title: "Profiles of Disadvantaged Children, Street Children in Six Philippine Cities", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Profiles%20of%20Disadvantaged%20Children,%20Street%20Children%20in%20Six%20Philippine%20Cities.pdf" },
      { title: "Re-thinking the Filipino Family, Tracking Changes Across the Years", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Re-thinking%20the%20Filipino%20Family,%20Tracking%20Changes%20Across%20the%20Years..pdf" },
      { title: "The Filipina Looks at Herself, A Review of Women's Studies in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/The%20Filipina%20Looks%20at%20Herself,%20A%20Review%20of%20Women_s%20Studies%20in%20the%20Philippines.pdf" },
      { title: "The Filipina Looks at Herself, A Review of Women's Studies in the Philippines (copy 2)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/The%20Filipina%20Looks%20at%20Herself,%20A%20Review%20of%20Women_s%20Studies%20in%20the%20Philippines2.pdf" },
      { title: "The Urban Filipino Worker in an Industrializing Society", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/The%20Urban%20Filipino%20Worker%20in%20an%20Industrializing%20Society.pdf" },
      { title: "Underdevelopment and Women in the Informal Sector, The Case of Urban Workers and Rural Homeworkers I", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Underdevelopment%20and%20Women%20in%20the%20Informal%20Sector,%20The%20Case%20of%20Urban%20Workers%20and%20Rural%20Homeworkers%20I.pdf" },
      { title: "Understanding Child Labor in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Understanding%20Child%20Labor%20in%20the%20Philippines.pdf" },
      { title: "Women's Education as an Instrument for Change, The Case of the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Women_s%20Education%20as%20an%20Instrumentfor%20Change,%20The%20Case%20of%20the%20Philippines.pdf" },
      { title: "Women's Education as an Instrument for Change, The Case of the Philippines (copy 1)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Women_s%20Education%20as%20an%20Instrumentfor%20Change,%20The%20Case%20of%20the%20Philippines(1).pdf" },
      { title: "Women's Education as an Instrument for Change, The Case of the Philippines (copy 2)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Women_s%20Education%20as%20an%20Instrumentfor%20Change,%20The%20Case%20of%20the%20Philippines(2).pdf" },
      { title: "Women's Education as an Instrument for Change, The Case of the Philippines (copy 3)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Women_s%20Education%20as%20an%20Instrumentfor%20Change,%20The%20Case%20of%20the%20Philippines(3).pdf" },
      { title: "Women's Education as an Instrument for Change, The Case of the Philippines (copy 4)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Women_s%20Education%20as%20an%20Instrumentfor%20Change,%20The%20Case%20of%20the%20Philippines(4).pdf" },
      { title: "Work Motivation and Productivity of Government Workers", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Amaryllis%20Torres/Work%20Motivation%20and%20Productivity%20of%20Government%20Workers.pdf" },
    ],
  },

  {
    name: "Andrew Gonzalez",
    photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Andrew-Gonzalez.jpg",
    papers: [
      { title: "Acquiring Pilipino as a first language – two case studies", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Acquiring%20Pilipino%20as%20a%20first%20language%20-%20two%20case%20studies.pdf" },
      { title: "An unfinished symphony – 934 days at DECS", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/An%20unfinished%20symphony%20-%20934%20days%20at%20DECS.pdf" },
      { title: "Assessing resources for bilingual education", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Assessing%20resources%20for%20bilingual%20education.pdf" },
      { title: "Bilingual Communities, National and Regional Profiles and Verbal Repertoires", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Bilingual%20Communities,%20National%20and%20Regional%20Profiles%20and%20Verbal%20Repertoires.pdf" },
      { title: "Communicative language teaching in rural areas – How does one make the irrelevant relevant", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Communicative%20language%20teaching%20in%20rural%20areas%20-%20How%20does%20one%20make%20the%20irrelevant%20relevant.pdf" },
      { title: "Cooperative Projects in the Training of Social Scientists thru PSSC", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Cooperative%20Projects%20in%20the%20Training%20of%20Social%20Scientists%20thru%20PSSC.pdf" },
      { title: "Country report – The teaching of regional languages other than English in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Country%20report%20-%20The%20teaching%20of%20regional%20languages%20other%20than%20English%20in%20the%20Philippines.pdf" },
      { title: "Evaluating Bilingual Education in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Evaluating%20Bilingual%20Education%20in%20the%20Philippines.pdf" },
      { title: "Evaluating the Progress of Bilingual Education", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Evaluating%20the%20Progress%20of%20Bilingual%20Education.pdf" },
      { title: "Filipinization of the Social Sciences—A Red Herring", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Filipinization%20of%20the%20Social%20Sciences-A%20Red%20Herring.pdf" },
      { title: "Financial Resources for Social Science Research", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Financial%20Resources%20for%20Social%20Science%20Research.pdf" },
      { title: "Language & Policy—Lessons of History", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Language%20_%20Policy-Lessons%20of%20History.pdf" },
      { title: "Language and Nationalism in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Language%20and%20Nationalism%20in%20the%20Philippines.pdf" },
      { title: "Laws on education and the private school administrator", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Laws%20on%20education%20and%20the%20private%20school%20administrator.pdf" },
      { title: "Managing language and literature programs in the Philippine setting", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Managing%20language%20and%20literature%20programs%20in%20the%20Philippine%20setting.pdf" },
      { title: "Manpower and Material Resources for Bilingual Educ Survey", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Manpower%20and%20Material%20Resources%20for%20Bilingual%20Educ%20Survey.pdf" },
      { title: "National Consultation on Updating the Teaching of English in the Phils", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/National%20Consultation%20on%20Updating%20the%20Teaching%20of%20English%20in%20the%20Phils.pdf" },
      { title: "On Localizing Social Science Research", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/On%20Localizing%20Social%20Science%20Research.pdf" },
      { title: "Outline of A Generative Semantic Description", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Outline%20of%20A%20Generative%20Semantic%20Description.pdf" },
      { title: "Philippines English, Readings in Philippines Sociolinguistics", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Philippines%20English,%20Readings%20in%20Philippines%20Sociolinguistics.pdf" },
      { title: "Pilipino in the Year 2000, Language Planning and the Building of a National Language", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Pilipino%20in%20the%20Year%202000,%20Language%20Planning%20and%20the%20Building%20of%20a%20National%20Language.pdf" },
      { title: "Sociolinguistics in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Sociolinguistics%20in%20the%20Philippines.pdf" },
      { title: "The Academic Lifestyle as a Cultural Innovation", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/The%20Academic%20Lifestyle%20as%20a%20Cultural%20Innovation.pdf" },
      { title: "The Intellectualization of Filipino—Agenda for the 21st C", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/The%20Intellectualization%20of%20Filipino-Agenda%20for%20the%2021stC.pdf" },
      { title: "The language provision of the 1987 Constitution of the Republic of the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/The%20language%20provision%20of%20the%201987%20Constitution%20of%20the%20Republic%20of%20the%20Philippines.pdf" },
      { title: "Three studies on Philippine English across generations", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Andrew%20Gonzalez/Three%20studies%20on%20Philippine%20English%20across%20generations%20-%20Towards%20an%20integration%20and%20some%20implications.pdf" },
    ],
  },

  {
    name: "Arsenio Balisacan",
    photo: "https://www.phcc.gov.ph/file-manager/1/Photo%20Gallery/Photos/balisacan-1.png",
    papers: [
      { title: "Agrarian Reform and Poverty Reduction in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Agrarian_Reform_and_Poverty_Reduction_in_the_Philippines.pdf" },
      { title: "Agricultural Growth Employment Growth and Rural Poverty", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Agricultural_Growth_Employment_Growth_and_Rural_Poverty.pdf" },
      { title: "Agricultural Growth Landlessness Off-farm Employment and Rural Poverty in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Agricultural_Growth_Landlessness_Off-farm_Employment_and_Rural_Poverty_in_the_Philippines.pdf" },
      { title: "Agricultural Growth and Rural Performance a Philippine Perspective", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Agricultural_Growth_and_Rural_Performance_a_Philippine_Perspective.pdf" },
      { title: "Aids in the Philippines New Estimates for Policy Analysis", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Aids_in_the_Philippines_New_Estimates_for_Policy_Analysis.pdf" },
      { title: "An Analysis of the Philippine Inter-Island Shipping Industry", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/An_Analysis%20of%20the%20Philippine%20Inter-Island%20Shipping%20Industry.pdf" },
      { title: "An Overview: Spatial Development, Land Use, and Urban-Rural Growth Linkages in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/An_Overview_Spatial%20Development,%20Land%20Use,%20and%20Urban-Rural%20Growth%20Linkages%20in%20the%20Philippines.pdf" },
      { title: "Anatomy of Poverty during Adjustment—The Case of the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Anatomy_of%20Poverty%20during%20Adjustment-The%20Case%20of%20the%20Philippines.pdf" },
      { title: "Anatomy of Rural Household Welfare, The Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Anatomy_of%20Rural%20Household%20Welfare,%20The%20Philippines.pdf" },
      { title: "Approaches to Targeting the Poor", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Approaches_to%20Targeting%20the%20Poor.pdf" },
      { title: "Aspects of Employment Location, Regional Redistribution, and Poverty and Inequality in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Aspects_of%20Employment%20Location,%20Regional%20Redistribution,%20and%20Poverty%20and%20Inequality%20in%20the%20Philippines.pdf" },
      { title: "Averting Hunger and Food Insecurity In Asia", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Averting_Hunger_and_Food_Insecurity_In_Asia.pdf" },
      { title: "Changes In Spatial Income Inequality In the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Changes_In_Spatial_Income_Inequality_In_the_Philippines.pdf" },
      { title: "Conceptual Framework for the Development of an Integrated Poverty Monitoring and Indicator System", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Conceptual_Framework%20for%20the%20Development%20of%20an%20Integrated%20Poverty%20Monitoring%20and%20Indicator%20System.pdf" },
      { title: "Demand for Food in the Philippines, Responses to Price and Income Changes", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Demand_for%20Food%20in%20the%20Philippines,%20Responses%20to%20Price%20and%20Income%20Changes.pdf" },
      { title: "Deregulation in Philippine Agriculture", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Deregulation_in_Philippine_Agriculture.pdf" },
      { title: "Did the Estrada Administration Benefit the Poor", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Did_the%20Estrada%20Administration%20Benefit%20the%20Poor..pdf" },
      { title: "Distortions to Agricultural Incentives in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Distortions_to_Agricultural_Incentives_in_the_Philippines.pdf" },
      { title: "Dynamics of Rural Development Linkages Poverty and Incomes Distribution", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Dynamics_of_Rural_Development_Linkages_Poverty_and_Incomes_Distribution.pdf" },
      { title: "Economic Growth and Poverty Reduction in Vietnam", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Economic_Growth_and_Poverty_Reduction_in_Vietnam.pdf" },
      { title: "Economic Incentives and Comparative Advantage in the Philippine Cotton Industry", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Economic_Incentives_and_Comparative_Advantage_in_the_Philippine_Cotton_Industry.pdf" },
      { title: "Economic Policies and Capital Formation in Philippine Agriculture", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Economic_Policies%20and%20Capital%20Formation%20in%20Philippine%20Agriculture.pdf" },
      { title: "Employment Structure and Urban Growth", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Employment_Structure%20and%20Urban%20Growth.pdf" },
      { title: "Equivalence Scale and Poverty Assessment in a Poor Country", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Equivalence_Scale_and_Poverty_Assessment_in_a_Poor_Country.pdf" },
      { title: "Getting the Story Right, Growth, Redistribution, and Poverty Alleviation in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Getting_the%20Story%20Right,%20Growth,%20Redistribution,%20and%20Poverty%20Alleviation%20in%20the%20Philippines.pdf" },
      { title: "Going Beyond Cross Country Averages: Revisiting Growth Inequality and Poverty in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Going_Beyond_Cross_Country_Averages_Revisiting_Growth_Inequality_and_Poverty_in_the_Philippines.pdf" },
      { title: "Green Revolution-type Growth, Policy Regime, and Income Distribution, The Philippine Case", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Green_Revolution-type%20Growth,%20Policy%20Regime,%20and%20Income%20Distribution,%20The%20Philippine%20Case.pdf" },
      { title: "Growth Inequality Politics and Poverty Reduction in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Growth_Inequality_Politics_and_Poverty_Reduction_in_the_Philippines.pdf" },
      { title: "Growth Inequality and Politics Revisited: A Developing Country Case", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Growth_Inequality_and_Politics_Revisited_A%20Developing_Country_Case.pdf" },
      { title: "Growth Poverty and Income Inequality in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Growth_Poverty_and_Income_Inequality_in_the_Philippines.pdf" },
      { title: "Growth and Equity in the Philippines, A Reexamination", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Growth_and%20Equity%20in%20the%20Philippines,%20A%20Reexamination.pdf" },
      { title: "Growth and Equity in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Growth_and%20Equity%20in%20the%20Philippines.pdf" },
      { title: "High Population Growth Threatens Food Security", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/High_Population_Growth_Threatens_Food_Security.pdf" },
      { title: "In Search of Proxy Indicators for Poverty Targeting", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/In_Search_of_Proxy_Indicators_for_Poverty_Targeting.pdf" },
      { title: "Inclusive Agribusiness Growth in the Philippines: the Role of Direct and Indirect Channels with a Focus on the Labor Market", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Inclusive_Agribusiness_Growth_in_the_Philippines_the_Role_of_Direct_and_Indirect_Channels_with_a_Focus_on_the_Labor_Market.pdf" },
      { title: "Inequality, Poverty, and Urban-Rural Growth Linkages", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Inequality,_Poverty,%20and%20Urban-Rural%20Growth%20Linkages.pdf" },
      { title: "Inequality In Asia: A Synthesis of Recent Research on the Levels Trends Effects and Determinants of Inequality", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Inequality_In_Asia_A_Synthesis_of_Recent_Research_on_the_Levels_Trends_Effects_and_Determinants_of_Inequality_in_its_Diff~1.pdf" },
      { title: "Is Spatial Income Inequality Increasing in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Is_Spatial_Income_Inequality_Increasing_in_the_Philippines.pdf" },
      { title: "MDG 1 In the Philippines: Setting the Scores Right and Achieving the Targets", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/MDG%201_In_the_Philippines_Setting_the_Scores_Right_and_Achieving_the_Targets.pdf" },
      { title: "Mainstreaming Agriculture in the Development Agenda", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Mainstreaming_Agriculture%20in%20the%20Development%20Agenda.pdf" },
      { title: "Philippine Agricultural Development in Historical Perspective", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Philippine_Agricultural%20Development%20in%20Historical%20Perspective.pdf" },
      { title: "Philippine Policy Linkages Scoping Study", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Philippine_Policy_Linkages_Scoping_Study.pdf" },
      { title: "Policy Reforms and Agricultural Development in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Policy_Reforms%20and%20Agricultural%20Development%20in%20the%20Philippines.pdf" },
      { title: "Political Investment in Economic Protection, A Note", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Political_Investment%20in%20Economic%20Protection,%20A%20Note.pdf" },
      { title: "Poverty, Urbanization and Development Policy, A Philippine Perspective", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Poverty,_Urbanization%20and%20Development%20Policy,%20A%20Philippine%20Perspective.pdf" },
      { title: "Poverty in the Philippines, An Update and Reexamination", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Poverty_in%20the%20Philippines,%20An%20Update%20and%20Reexamination.pdf" },
      { title: "Regional Development Dynamics and Decentralization in the Philippines: Ten Lessons from a Fast Starter", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Regional_Development_Dynamics_and_Decentralization_in_the_Philippines_Ten_Lessons_from_a_Fast_Starter.pdf" },
      { title: "Revisiting Growth and Poverty Reduction in South Indonesia", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Revisiting_Growth_and_Poverty_Reduction_in_South_Indonesia.pdf" },
      { title: "Robust Determinants of Income Growth in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Robust_Determinants_of_Income_Growth_in_the_Philippines.pdf" },
      { title: "Rural Growth, Food Security, and Poverty Alleviation in Developing Asian Countries", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Rural_Growth,%20Food%20Security,%20and%20Poverty%20Alleviation%20in%20Developing%20Asian%20Countries.pdf" },
      { title: "Rural Poverty in the Philippines, Incidence, Issues and Policies", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Rural_Poverty%20in%20the%20Philippines,%20Incidence,%20Issues%20and%20Policies.pdf" },
      { title: "Rural Poverty In Southeast Asia: Issues Policies and Challenges", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Rural_Poverty_In_Southeast_Asia_Issues_Policies_and_Challenges.pdf" },
      { title: "Securing Rice, Reducing Poverty", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Securing_Rice,%20Reducing%20Poverty.pdf" },
      { title: "Social Impact of the Global Financial Crisis in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Social_Impact_of_the_Global_Financial_Crisis_in_the_Philippines.pdf" },
      { title: "Tackling Poverty and Social Impacts", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Tackling_Poverty_and_Social_Impacts.pdf" },
      { title: "Targeting Transfers to the Poor: the Case of Food Subsidies", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Targeting_Transfers_to_the_Poor_the_Case_of_Food_Subsidies.pdf" },
      { title: "The Human Face of Poverty During a Period of Macroeconomic Adjustment", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The%20Human_Face%20of%20Poverty%20During%20a%20Period%20of%20Macroeconomic%20Adjustment.pdf" },
      { title: "The Dynamics of Regional Development: the Philippines In East Asia", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Dynamics_of_Regional_Development_the_Philippines_In_East_Asia.pdf" },
      { title: "The Human Face of Poverty During a Period of Macroeconomic Adjustment (copy)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Human_Face_of_Poverty_During_a_Period_of_Macroeconomic_Adjustment.pdf" },
      { title: "The Philippine Economy: Development, Policies, and Challenges", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Philippine%20Economy%20Development,%20Policies,%20and%20Challenges.pdf" },
      { title: "The Philippine Development Puzzle", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Philippine_Development_Puzzle.pdf" },
      { title: "The Philippine Economy and Poverty During the Global Economic Crisis", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Philippine_Economy_and_Poverty_During_the_Global_Economic_Crisis.pdf" },
      { title: "The Philippines and Regional Development: An Overview", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Philippines_and_Regional_Development_An_Overview.pdf" },
      { title: "The Political Contest for Land Reform in a Developing Country", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Political%20Contest%20for%20Land%20Reform%20in%20a%20Developing%20Country.pdf" },
      { title: "The Poor During A Period of Macroeconomic Adjustment", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Poor_During_A_Period_of_Macroeconomic_Adjustment.pdf" },
      { title: "The Principles and Practice of Sustainable Economic Development, Overview and Synthesis", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/The_Principles%20and%20Practice%20of%20Sustainable%20Economic%20Development,%20Overview%20and%20Synthesis.pdf" },
      { title: "What Do We Really Know—or Don't Know—about Economic Inequality and Poverty in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/What_Do%20We%20Really%20Know%20-%20or%20Don_t%20Know%20-%20about%20Economic%20Inequality%20and%20Poverty%20in%20the%20Philippines..pdf" },
      { title: "What Does It Take to Win the War Against Poverty in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/What_Does_It_Take_to_Win_the_War_Against_Poverty_in_the_Philippines.pdf" },
      { title: "What Else Besides Growth Matters to Poverty Reduction Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/What_Else_Besides_Growth_Matters_to_Poverty_Reduction_Philippines.pdf" },
      { title: "What Has Really Happened to Poverty in the Philippines: New Measures Evidence and Policy Implications", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/What_Has_Really_Happened_to_Poverty_in_the_Philippines_New_Measures_Evidence_and_Policy_Implications.pdf" },
      { title: "Why Does Poverty Persist in the Philippines: Facts, Fancies, and Policies", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Arsenio%20Balisacan/Why_Does%20Poverty%20Persist%20in%20the%20Philippines%20Facts,%20Fancies,%20and%20Policies.pdf" },
    ],
  },

  {
    name: "Bonifacio Sibayan",
    photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Sibayan.png",
    papers: [
      { title: "Imperatives of change and tomorrow's teachers", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Bonifacio%20Sibayan/Imperatives%20of%20change%20and%20tomorrow_s%20teachers.pdf" },
      { title: "The Intellectualization of Filipino and education essays. Manila", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Bonifacio%20Sibayan/The%20Intellectualization%20of%20Filipino%20and%20education%20essays.%20Manila.pdf" },
      { title: "The long-ago teacher – Reflections on Philippine Education", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Bonifacio%20Sibayan/The%20long-ago%20teacher%20-%20Reflections%20on%20Phlippine%20Education.pdf" },
      { title: "The status and role of English and Pilipino in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Bonifacio%20Sibayan/The%20status%20and%20role%20of%20English%20and%20Pilipino%20in%20the%20Philippines.pdf" },
    ],
  },

  {
    name: "Dominador Rosell",
    papers: [
      { title: "22nd International Geographical Congress", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/22nd%20International%20Geographical%20Congress.pdf" },
      { title: "Conservation of Natural Resources: A Vital Environmental Issue in the Phil", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Conservation%20of%20Natural%20Resources_A%20Vital%20Environmental%20Issue%20in%20the%20Phil.pdf" },
      { title: "Environmental Studies: The Fifth Tradition of Geography", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Environmental%20Studies_The%20Fifth%20Tradition%20of%20Geography.pdf" },
      { title: "Geographic Approach to Philippine Economic Development", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Geographic%20Approach%20to%20Philippine%20Economic%20Development.pdf" },
      { title: "Geographical Notes of Interest", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Geographical%20Notes%20of%20Interest.pdf" },
      { title: "Geographical Point of View: Appropriate Technology, Phil Setting", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Geographical%20Point%20of%20View%20--%20Appropriate%20Technology_Phil%20Setting.pdf" },
      { title: "Geographical Point of View: Your Career and Geography", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Geographical%20Point%20of%20View%20--%20Your%20Career%20and%20Geography.pdf" },
      { title: "Geography of food and Population", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Geography%20of%20food%20and%20Population.pdf" },
      { title: "Impression on the 150th Anniversary Celebration", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Impression%20on%20the%20150th%20Anniversary%20Celebration.pdf" },
      { title: "Impressions on the IGU Regional Conference in New Zealand", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Impressions%20on%20the%20IGU%20Regional%20Conference%20in%20New%20Zealand.pdf" },
      { title: "Map Communication in Social Science Study", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Map%20Communication%20in%20Social%20Science%20Study.pdf" },
      { title: "Natural Resources Conservation: Geographers View", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Natural%20Resources%20Conservation_Geographers%20View.pdf" },
      { title: "PHILCUSA-FOA Pump Irrigation Program in the Phil", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/PHILCUSA-FOA%20Pump%20Irrigation%20Program%20in%20the%20Phil.pdf" },
      { title: "Research and Development of Water Resources of the Phil", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Research%20and%20Development%20of%20Water%20Resources%20of%20the%20Phil.pdf" },
      { title: "Suggested Research and Development of Water Resources of the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Suggested%20Research%20and%20Development%20of%20Water%20Resources%20of%20the%20Philippines.pdf" },
      { title: "The Birth of the Philippine Geographical Society", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/The%20Birth%20of%20the%20Philippine%20Geographical%20Society.pdf" },
      { title: "The Concept of Landscape in Land-Use Study", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/The%20Concept%20of%20Landscape%20in%20Land-Use%20Study.pdf" },
      { title: "Two Years of PHILCUSA-FOA Pump Irrigation Program in the Phil", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Two%20Years%20of%20PHILCUSA-FOA%20Pump%20Irigation%20Program%20in%20the%20Phil.pdf" },
      { title: "Water Pollution, A Conservation Problem", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Dominador%20Rosell/Water%20Pollution,%20A%20Conservation%20Problem.pdf" },
    ],
  },

  {
    name: "Domingo Salita",
    papers: [
      { title: "25 Years of the Philippine Geographical Society", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/25%20Years%20of%20the%20Philippine%20Geographical%20Society.pdf" },
      { title: "Educational Programs in Environmental Sciences at the University of the Philippines System", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Educational%20Programs%20in%20Enironmental%20Sciences%20at%20the%20Unicersity%20of%20the%20Philippins%20System.pdf" },
      { title: "Geographic Education in Relation to Map Making and Map Reading in the Phil", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Geographic%20Education%20in%20Relation%20to%20Map%20Making%20and%20Map%20Reading%20in%20the%20Phil.pdf" },
      { title: "Geographical Viewpoint: Man and His Environment", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Geographical%20Viewpoint%20--%20Man%20and%20His%20Environment.pdf" },
      { title: "Geography: The Core in Environmental Education", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Geography%20--%20The%20Core%20in%20Environmental%20Education.pdf" },
      { title: "Geography: The Core in the Unity of Knowledge", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Geography%20--%20The%20Core%20in%20the%20Unity%20of%20Knowledge.pdf" },
      { title: "Geography and Environmental Education", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Geography%20and%20Environmental%20Education.pdf" },
      { title: "Integrated Study of Environmental Problems of Metro Manila: Air, Water and Land Pollution", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Integrated%20Study%20of%20Environmental%20Problems%20of%20Metro%20Manila_Air,%20Water%20and%20Land%20Pollution.pdf" },
      { title: "Mineral Resources: Impact of Exploitation Environment in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Mineral%20Resources%20--%20Impact%20of%20Exploitaion%20Environmen%20in%20the%20Philippines.pdf" },
      { title: "New Trends in the Discipline of Geography in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/New%20Trends%20in%20the%20Discipline%20of%20Geography%20in%20the%20Philippines.pdf" },
      { title: "The Geographic Base in the Economic Development of the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/The%20Geographic%20Base%20in%20the%20Economic%20Development%20of%20the%20Philippines.pdf" },
      { title: "The UNESCO Symposium on Tropical Weathering", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/The%20UNESCO%20Symposium%20on%20Tropical%20Weathering.pdf" },
      { title: "Urbanization and National Policies in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Domingo%20Salita/Urbanization%20and%20National%20Policies%20in%20the%20Philippines.pdf" },
    ],
  },

  {
    name: "Emma Porio",
    photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Porio.png",
    papers: [
      { title: "An Assessment of Education and the Worst Forms of Child Labour", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/An_Assessment_of_Education_and_the_Worst_Forms_of_Child_Labour.pdf" },
      { title: "Children of the Streets: Socialization and Formation of the Self in Rapidly Urbanizing Context", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Children%20of%20the%20Streets_%20Socialization%20and%20Formation%20of%20the%20Self%20in%20Rapidly%20Urbanizing%20Context.pdf" },
      { title: "Civil Society and Democratization in Asia", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Civil_Society_and_Democratization_in_Asia.pdf" },
      { title: "Decentralization Power and Networked Governance Practices in Metro Manila", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Decentralization_Power_and_Networked_Governance_Practices_in_Metro_Manila.pdf" },
      { title: "Exploring Explanations for Job Attitudes and Behavior in a Metro Manila Factory", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Exploring_Explanations%20for%20Job%20Attitudes%20and%20Behavior%20in%20a%20Metro%20Manila%20Factory.pdf" },
      { title: "Global Householding, Gender and Filipino Migration", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Global_Householding_Gender_and_Filipino_Migration.pdf" },
      { title: "Life Paths and Disadvantage Among Street Children", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Life_Paths%20and%20Disadvantage%20Among%20Street%20Children.pdf" },
      { title: "Participatory Approaches to Communication and Development", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Participatory_Approaches_to_Communication_and_Development.pdf" },
      { title: "Policy-Driven Research, Audit Culture and Power", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Policy_Driven_Research_Audit_Culture_and_Power.pdf" },
      { title: "Property rights, security of tenure and the urban poor in Metro Manila", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Property%20rights,%20security%20of%20tenure%20and%20the%20urban%20poor%20in%20Metro%20Manila%5b1%5d.pdf" },
      { title: "Shifting Spaces of Power in Metro Manila", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Shifting_Spaces_of_Power_in_Metro_Manila.pdf" },
      { title: "Sociology, Society and the State", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Sociology_Society_and_the_State_.pdf" },
      { title: "The Use of Children in the Production, Sale and Trafficking of Drugs", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/The_Use_of_Children_in_the_Production_Sale_and_Trafficking_of_Drugs.pdf" },
      { title: "Urban Transition, Poverty and Development in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Emma%20Porio/Urban_Transition_Poverty_and_Development_in_the_Philippines.pdf" },
    ],
  },

  {
    name: "Felipe Miranda",
    photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Miranda.png",
    papers: [
      { title: "Filipino Public Opinion on the issue of American Military Facilities in the Phils", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Filipino%20Public%20Opinion%20on%20the%20issue%20of%20American%20Military%20Facilities%20in%20the%20Phils.pdf" },
      { title: "Philippine Defense Expenditures and Threat Perceptions", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Philippine%20Defense%20Expenditures%20and%20Threat%20Perceptions.pdf" },
      { title: "Political Economy in A Democratizing Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Political%20Economy%20in%20A%20Democratizing%20Philippines.pdf" },
      { title: "Political Economy in the Post-Marcos Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Political%20Economy%20in%20the%20Post-Marcos%20Philippines.pdf" },
      { title: "Presidential Popularity and the August 28, 1987 Coup", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Presidential%20Popularity%20and%20the%20August%2028,%201987%20Coup.pdf" },
      { title: "Probing Our Futures", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Probing%20Our%20Futures.pdf" },
      { title: "Public Reactions to the August 28, 1987 Coup Attempt", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Public%20Reactions%20to%20the%20August%2028,%201987%20Coup%20Attempt.pdf" },
      { title: "Social Weather Stations Survey", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Social%20Weather%20Stations%20Survey.pdf" },
      { title: "The August 28, 1987 Coup", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20August%2028,%201987%20Coup.pdf" },
      { title: "The Current Philippine Crisis", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20Current%20Philippine%20Crisis.pdf" },
      { title: "The March 1987 Public Opinion Report", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20March%201987%20Public%20Opinion%20Report.pdf" },
      { title: "The May 1986 Public Opinion Report", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20May%201986%20Public%20Opinion%20Report.pdf" },
      { title: "The October 1986 Public Opinion Report", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20October%201986%20Public%20Opinion%20Report.pdf" },
      { title: "The Philippine Political Crisis of 1986", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20Philippine%20Political%20Crisis%20of%201986.pdf" },
      { title: "The Political System and Nation-Building in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20Political%20System%20and%20Nation-Building%20in%20the%20Philippines.pdf" },
      { title: "The Politicization of the Military", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20Politicization%20of%20the%20Military.pdf" },
      { title: "The Post-EDSA Military and Philippine Democratization", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/The%20Post-EDSA%20Military%20and%20Philippine%20Democratization.pdf" },
      { title: "Views: Newsday Opinion", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Felipe%20Miranda/Views_%20Newsday%20Opinion.pdf" },
    ],
  },

  {
    name: "Florangel Braid",
    photo: "https://pssc.org.ph/wp-content/uploads/2022/10/Braid.png",
    papers: [
      { title: "Children in the Information Age", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Children%20in%20the%20%20Information%20Age.pdf" },
      { title: "Communication Education and Training", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Communication%20Education%20and%20Training.pdf" },
      { title: "Communication Media in the Philippines 1521–1986", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Communication%20Media%20in%20the%20Philippines%201521-1986.pdf" },
      { title: "Information and Communication Technology and Mass Media", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Information%20and%20Communication%20Technology%20and%20Mass%20Media.pdf" },
      { title: "NWICO Value Concepts and Philippine Communication Issues", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/NWICO%20Value%20Concepts%20and%20Philippine%20Communication%20Issues.pdf" },
      { title: "Post-EDSA Communication Media", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Post-EDSA%20Communication%20Media.pdf" },
      { title: "Social Responsibility in Communication Media", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/Social%20Responsibility%20in%20Communication%20Media.pdf" },
      { title: "The Process Approach in Capability-building for Distance Education: Focus on Multimedia Development", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/The%20Process%20Approach%20in%20Capability-buildingfor%20Distance%20Education-%20Focus%20on%20Multimedia%20Development.pdf" },
      { title: "The Role of Media in Conflict Reporting", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Florangel%20Braid/The%20Role%20of%20Media%20in%20Conflict%20Reporting.pdf" },
    ],
  },

  {
    // NOTE: the site's tab label reads "Francis Maigan" but the actual
    // folder/file names on the server say "Francis Madigan" — kept the
    // display name as-is to match the existing config, hrefs point to
    // the real "Madigan" folder.
    name: "Francis Maigan",
    papers: [
      { title: "A New Approach to Rural Development in the Phils (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/A%20New%20Approach%20to%20Rural%20Development%20in%20the%20Phils%20(PSR).pdf.pdf" },
      { title: "Birth and Death Rates from a Dual-Records System (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Birth%20and%20Death%20Rates%20from%20a%20Dual-Records%20System%20(PSR).pdf.pdf" },
      { title: "Current Fertility—A First Glimpse from the 1983 NDS (PPJ)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Current%20Fertility-A%20First%20Glimpse%20from%20the%201983%20NDS%20(PPJ).pdf.pdf" },
      { title: "Decisional Sociology (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Decisional%20Sociology%20(PSR).pdf.pdf" },
      { title: "Estimated Trends of Fertility, Mortality and Natural Increase (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Estimated%20Trends%20of%20Fertility,%20Mortality%20and%20Natural%20Increase%20(PSR).pdf.pdf" },
      { title: "Intensive Population Study in Mindanao (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Intensive%20Population%20Study%20in%20Mindanao%20(PSR).pdf.pdf" },
      { title: "Is Social Science Relevant in the Phils Today (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Is%20Social%20Science%20Relevant%20in%20the%20Phils%20Today%20(PSR).pdf.pdf" },
      { title: "Part II – The Northern Mindanao Region (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Part%20II%20-%20The%20Northernn%20Mindanao%20Region%20(PSR).pdf.pdf" },
      { title: "Philippine Fertility and Mortality with Ref. to N. Mindanao Part I (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Philippine%20Fertility%20and%20Mortality%20with%20Ref.%20to%20N.%20Mindanao%20Part%20I%20(PSR).pdf.pdf" },
      { title: "Some Population Characteristics of CDO (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Some%20Population%20Characteristics%20of%20CDO%20(PSR).pdf.pdf" },
      { title: "The Socioeconomic Aspects of Developmental Infrastructure (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/The%20Socioeconomic%20Aspects%20of%20Developmental%20Infrastucture%20(PSR).pdf.pdf" },
      { title: "Twenty-two Months of Vital Rate Coverage (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Twehty-two%20Months%20of%20Vital%20Rate%20Coverage%20(PSR).pdf.pdf" },
      { title: "Where Trees are Fewer (PSR)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francis%20Madigan/Where%20Trees%20are%20Fewer%20(PSR).pdf.pdf" },
    ],
  },

  {
    name: "Francisco Nemenzo",
    photo: "https://pssc.org.ph/wp-content/uploads/2020/07/Francisco-Nemenzo.jpg",
    papers: [
      { title: "A Season of Coups – Reflections on the Role of the Military in Politics", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/A%20Season%20of%20Coups%20-%20Reflections%20on%20the%20Role%20of%20the%20Military%20in%20Politics.pdf" },
      { title: "Beyond February – The Task of Socialist", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/Beyond%20February%20-%20The%20Task%20of%20Socialist.pdf" },
      { title: "Military Insurgency – Reflections on Gringo's Adventure", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/Military%20Insurgency%20-%20Reflections%20on%20Gringo_s%20Adventure.pdf" },
      { title: "Military Insurgency – Reflections on Gringo's Adventure (copy)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/Military%20Insurgency%20-%20Reflections%20on%20Gringo_s%20Adventure(1).pdf" },
      { title: "The Left and the Traditional Opposition in The Philippines After Marcos", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/The%20Left%20and%20the%20Traditional%20Opposition%20in%20The%20Philippines%20After%20Marcos.pdf" },
      { title: "The Millenarian-Populist Aspects of Filipino Marxism", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/The%20Millenarian-Populist%20Aspects%20of%20Filipino%20Marxism.pdf" },
      { title: "The Sovereign Quest – Freedom from Foreign Military Bases", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/The%20Sovereign%20Quest%20-%20Freedom%20from%20Foreign%20Military%20Bases.pdf" },
      { title: "U.P. into the 21st Century and Other Essays", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Francisco%20Nemenzo/U.P.%20into%20the%2021st%20Century%20and%20Other%20Essays.pdf" },
    ],
  },

  {
    name: "Frank X. Lynch",
    papers: [
      { title: "A Bittersweet Taste of Sugar", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/A%20Bittersweet%20Taste%20of%20Sugar.pdf" },
      { title: "A Family-Planning Acceptor Study", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/A%20Family-Planning%20Acceptor%20Study.pdf" },
      { title: "A Tribute to Frank Lynch S.J.", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/A%20Tribute%20to%20Frank%20Lynch%20S.J..pdf" },
      { title: "A Tribute to Frank Lynch S.J. (copy)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/A%20Tribute%20to%20Frank%20Lynch%20S.J.(1).pdf" },
      { title: "Ateneo de Manila 1976 Housing Survey", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Ateneo%20de%20Manila%201976%20Housing%20Survey.pdf" },
      { title: "Beyond the Minimum Wage", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Beyond%20the%20Minimum%20Wage.pdf" },
      { title: "Brain Drain in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Brain%20Drain%20in%20the%20Philippines.pdf" },
      { title: "Cognitive Mapping in the Tagalog Area", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Cognitive%20Mapping%20in%20the%20Tagalog%20Area.pdf" },
      { title: "Farmers of the River Basin's Land Consolidation Project Area", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Farmers%20of%20the%20River%20Basin_s%20Land%20Consolidation%20Project%20Area.pdf" },
      { title: "Farmers of the River Basin's Land Consolidation Project Area (copy)", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Farmers%20of%20the%20River%20Basin_s%20Land%20Consolidation%20Project%20Area(1).pdf" },
      { title: "Four Readings on Philippine Values", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Four%20Readings%20on%20Philippine%20Values.pdf" },
      { title: "Happiness Starts With A Good Job And A Good Home", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Happiness%20Starts%20With%20A%20Good%20Job%20And%20A%20Good%20Home.pdf" },
      { title: "How Well Does It Work in Camarines Sur", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/How%20Well%20Does%20It%20Work%20in%20Camarines%20Sur.pdf" },
      { title: "IPC-DSW Home Aide Service Evaluation", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/IPC-DSW%20Home%20Aide%20Service%20Evaluation.pdf" },
      { title: "IPC-POPCOM 1971 Mass Media Study", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/IPC-POPCOM%201971%20Mass%20Media%20Study.pdf" },
      { title: "JEA-IPC Textbook Needs Inquiry", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/JEA-IPC%20Textbook%20Needs%20Inquiry.pdf" },
      { title: "Medical Services and Nutrition in the Bicol River Basin", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Medical%20Services%20and%20Nutrition%20in%20the%20Bicol%20River%20Basin.pdf" },
      { title: "Of Blackbirds and Boxes", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Of%20Blackbirds%20and%20Boxes.pdf" },
      { title: "Patterns of Income Distribution and Household Spending in the Bicol River Basin", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Patterns%20of%20Income%20Distribution%20and%20Household%20Spending%20in%20the%20Bicol%20River%20Basin.pdf" },
      { title: "Perspectives on Filipino Clannishness", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Perspectives%20on%20Filipino%20Clannishness.pdf" },
      { title: "Revelance Philippine Style", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Revelance%20Philippine%20Style.pdf" },
      { title: "Review of Ilocano Rice Farmers by H. Lewis", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Review%20of%20Ilocano%20Rice%20Farmers%20by%20H.%20Lewis.pdf" },
      { title: "Rice-Farm Harvests and Practices in Camarines Sur", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Rice-Farm%20Harvests%20and%20Practices%20in%20Camarines%20Sur.pdf" },
      { title: "Socioeconomic Status of Ateneo Students and Selected Inventories of Philippine National Problems", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Socioeconomic%20Status%20of%20Ateneo%20Students%20and%20Selected%20Inventories%20of%20Philippine%20National%20Proble.pdf" },
      { title: "Sociological Surveys in the Rural Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Sociological%20Surveys%20in%20the%20Rural%20Philippines.pdf" },
      { title: "The B'lit Manobo & the Tasaday", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20B_lit%20Manobo%20_%20the%20Tasaday.pdf" },
      { title: "The Filipino Family Community and Nation", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Filipino%20Family%20Community%20and%20Nation.pdf" },
      { title: "The Filipino Family, Community and Nation – The Same Yesterday, Today and Tomorrow", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Filipino%20Family,%20Community%20and%20Nation%20-%20The%20same%20Yesterday,%20Today%20and%20Tomorrow.pdf" },
      { title: "The Flipflop Power of Press Release", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Flipflop%20Power%20of%20Press%20Release.pdf" },
      { title: "The IPC-POMCH 1970 National Survey", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20IPC-POMCH%201970%20National%20Survey.pdf" },
      { title: "The Philippine Peace Corps Survey Final Report", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Philippine%20Peace%20Corps%20Survey%20Final%20Report.pdf" },
      { title: "The Philippine Peace Corps Survey", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Philippine%20Peace%20Corps%20Survey.pdf" },
      { title: "The Proposed Balongay Fishpond Estate", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Proposed%20Balongay%20Fishpond%20Estate.pdf" },
      { title: "The Role of a Social Science Research Org.", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Role%20of%20a%20Social%20Science%20Research%20Org..pdf" },
      { title: "The Unemployed And Underemployed in the Bicol River Basin", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/The%20Unemployed%20And%20Underemployed%20in%20the%20Bicol%20River%20Basin.pdf" },
      { title: "These Are The Problems We Face Daw", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/These%20Are%20The%20Problems%20We%20Face%20Daw.pdf" },
      { title: "Trends Report of Studies in Social Stratification and Social Mobility in the Philippines", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Trends%20Report%20of%20Studies%20in%20Social%20Stratificaiton%20and%20Social%20Mobility%20in%20the%20Philippines.pdf" },
      { title: "What Rice Farmers of Camarines Sur Say They Want from The Philippine Government", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/What%20Rice%20Farmers%20of%20Camarines%20Sur%20Say%20They%20Want%20from%20The%20Philippine%20Government.pdf" },
      { title: "Where Do They Go, What Do They Go", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Where%20Do%20They%20Go,%20What%20Do%20they%20Go.pdf" },
      { title: "Who Get the Jobs – The Old or the Educated", href: "https://pssc.org.ph/wp-content/uploads/2026/07/../../../pssc-archives/Works/Frank%20X.%20Lynch/Who%20Get%20the%20Jobs%20-%20The%20Old%20or%20the%20Educated.pdf" },
    ],
  },
];
