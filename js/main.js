import { homepageHTML } from "./homepage.js";
import { loadRandomBooks } from "./shelf.js";
import { ensureCovers } from "./covers.js";

document.addEventListener("DOMContentLoaded", () => {

    /* covers everywhere */
    ensureCovers();

    /* homepage only */
    if(document.body.id === "opac-main"){

        const container =
            document.querySelector("#OpacMainUserBlock .default_body") ||
            document.querySelector("#OpacMainUserBlock");

        if(!container) return;

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

loadCSS();
