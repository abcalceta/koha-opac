const VERSION = "1.1.31"; 
console.log("MAIN MODULE VERSION LOADED: " + VERSION);

const { homepageHTML } = await import(`./homepage.js?v=${VERSION}`);
const { ensureCovers, watchResults, applyGeneratedCovers, refreshGeneratedCovers } =
  await import(`./covers.js?v=${VERSION}`);
const { loadShelf } = await import(`./shelf.js?v=${VERSION}`);


/* =========================
   SEARCH RESULT COVERS
========================= */
$(document).ready(function () {
  $('.searchresults .bibliocol').each(function () {
    const $cell = $(this);

    // remove Koha default covers if present
    $cell.find('.coverimages').remove();

    // try to find real cover link
    const link = $cell.find('a[href*="/covers/"]').attr('href');

    if (link) {
      // ✅ real cover
      const img = $('<img>', {
        src: link,
        class: 'custom-cover'
      });

      $cell.prepend(img);

    } else {
      // 🎨 fallback placeholder
      const title = $cell.find('.title a').text().trim() || "No Title";
      const placeholder = generatePlaceholder(title);

      $cell.prepend(placeholder);
    }
  });
});


/* =========================
   PLACEHOLDER GENERATOR
========================= */
function generatePlaceholder(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    '#6C5CE7', '#00B894', '#0984E3',
    '#D63031', '#E17055', '#2D3436'
  ];

  const color = colors[Math.abs(hash) % colors.length];

  const shortTitle = title.split(' ').slice(0, 6).join(' ');

  const div = $('<div>', {
    class: 'generated-cover',
    text: shortTitle
  });

  div.css({
    width: '80px',
    height: '120px',
    background: color,
    color: '#fff',
    padding: '8px',
    fontSize: '10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '6px',
    marginRight: '10px'
  });

  return div;
}


/* =========================
   INIT LOGIC
========================= */
function init(){

    loadCSS();

    console.log("Creating homepage");

    if(document.body.id === "opac-main"){

        const container =
            document.querySelector("#OpacMainUserBlock .default_body") ||
            document.querySelector("#OpacMainUserBlock");

        if(!container) return;

        container.innerHTML = homepageHTML;

        loadShelf("random-books", 6);
        loadShelf("anthro-books", 7);

    } else{
        refreshGeneratedCovers();
    }

}


function runSearchCovers(){
    if(document.body.id !== "opac-main"){
        applyGeneratedCovers();
    }
}


if(document.readyState !== "loading"){
    init();
    runSearchCovers();
}else{
    document.addEventListener("DOMContentLoaded", init);
    document.addEventListener("DOMContentLoaded", runSearchCovers);
}


/* =========================
   LOAD CSS
========================= */
function loadCSS(){

    const css = document.createElement("link");

    css.rel = "stylesheet";
    css.href = "https://abcalceta.github.io/koha-opac/css/theme.css";

    document.head.appendChild(css);

}