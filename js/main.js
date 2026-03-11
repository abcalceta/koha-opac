console.log("MAIN MODULE LOADED");

import { homepageHTML } from "./homepage.js";
console.log("homepage module loaded");

import { loadRandomBooks } from "./shelf.js";
console.log("shelf module loaded");

import { ensureCovers } from "./covers.js";
console.log("covers module loaded");



function init(){

    loadCSS();
    /* covers everywhere */
    ensureCovers();

    console.log("Creating homepage");

    if(document.body.id === "opac-main"){

        const container =
            document.querySelector("#OpacMainUserBlock .default_body") ||
            document.querySelector("#OpacMainUserBlock");

        if(!container) return;

        console.log("homepageHTML:", homepageHTML);

        container.innerHTML = homepageHTML;

        loadRandomBooks();

    }

}

/* run immediately if DOM already loaded */

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

