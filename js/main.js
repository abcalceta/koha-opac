console.log("MAIN MODULE LOADED");

import { homepageHTML } from "./homepage.js";
console.log("homepage module loaded");

import { loadRandomBooks } from "./shelf.js";
console.log("shelf module loaded");

import { ensureCovers } from "./covers.js";
console.log("covers module loaded");


loadCSS();


console.log("MAIN MODULE finished loadin");

document.addEventListener("DOMContentLoaded", () => {

    /* covers everywhere */
    ensureCovers();

    /* homepage only */
    if(document.body.id === "opac-main"){

        const container =
            document.querySelector("#OpacMainUserBlock .default_body") ||
            document.querySelector("#OpacMainUserBlock");

        console.log("homepageHTML:", homepageHTML);

        container.innerHTML = homepageHTML;

        loadRandomBooks();

    }

});

function loadCSS(){

const css=document.createElement("link");

css.rel="stylesheet";
css.href="https://abcalceta.github.io/koha-opac/css/theme.css";

document.head.appendChild(css);

}



