
const VERSION = "1.1.0"; 
console.log("MAIN MODULE VERSION LOADED: "+VERSION);

const { homepageHTML } = await import(`./homepage.js?v=${VERSION}`);
const { ensureCovers, watchResults, refreshGeneratedCovers } =
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

        loadShelf("random-books", 6);     // report id for random books
        loadShelf("anthro-books", 7);     // report id for anthropology

    } else{
        ensureCovers();
    }

}


document.addEventListener("DOMContentLoaded", () => {

    if(document.body.id !== "opac-main"){
        ensureCovers();
        watchResults();
    }

});


window.addEventListener("load", () => {
    console.log("load")
    refreshGeneratedCovers();
});


if(document.readyState !== "loading"){
    init();
}else{
    document.addEventListener("DOMContentLoaded", init);
}


function loadCSS(){

    const css=document.createElement("link");

    css.rel="stylesheet";
    css.href="https://abcalceta.github.io/koha-opac/css/theme.css";

    document.head.appendChild(css);

}