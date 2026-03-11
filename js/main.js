import { loadRandomBooks } from "./shelf.js";
import { ensureCovers } from "./covers.js";


function loadCSS(){

const css=document.createElement("link");

css.rel="stylesheet";
css.href="https://abcalceta.github.io/koha-opac/css/theme.css";

document.head.appendChild(css);

}

loadCSS();

async function loadHomepage(){

    const r = await fetch(
        "https://abcalceta.github.io/koha-opac/html/homepage.html"
    );

    const html = await r.text();

    const container =
        document.querySelector("#OpacMainUserBlock .default_body") ||
        document.querySelector("#OpacMainUserBlock");

    if(!container) return;

    container.innerHTML = html;

    loadRandomBooks();
}

document.addEventListener("DOMContentLoaded", () => {

    ensureCovers();

    if(document.body.id === "opac-main"){
        loadHomepage();
    }

});