console.log("MAIN MODULE LOADED");

import { homepageHTML } from "./homepage.js";
console.log("homepage module loaded");

import { loadShelf } from "./shelf.js";
console.log("shelf module loaded");

import { ensureCovers, watchResults, refreshGeneratedCovers } from "./covers.js";
console.log("covers module loaded");


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