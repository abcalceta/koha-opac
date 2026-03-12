const VERSION = "1.1.10"; 
console.log("MAIN MODULE VERSION LOADED: "+VERSION);

const { homepageHTML } = await import(`./homepage.js?v=${VERSION}`);
const { ensureCovers, watchResults, applyGeneratedCovers } =
  await import(`./covers.js?v=${VERSION}`);
const { loadShelf } = await import(`./shelf.js?v=${VERSION}`);


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
        applyGeneratedCovers();
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


function loadCSS(){

    const css=document.createElement("link");

    css.rel="stylesheet";
    css.href="https://abcalceta.github.io/koha-opac/css/theme.css";

    document.head.appendChild(css);

}