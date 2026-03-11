console.log("MAIN MODULE LOADED");

const VERSION = "1.0.3";

import { homepageHTML } from "/koha-opac/js/homepage.js?v=" + VERSION;
import { loadShelf } from "/koha-opac/js/shelf.js?v=" + VERSION;
import { ensureCovers, watchResults, refreshGeneratedCovers }
  from "/koha-opac/js/covers.js?v=" + VERSION;


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

        const wrapper = shelf.closest(".discover-wrapper");

        const leftBtn = wrapper.querySelector(".scroll-btn.left");
        const rightBtn = wrapper.querySelector(".scroll-btn.right");

        if(!shelf.dataset.scrollInit){

            leftBtn?.addEventListener("click",()=>{
                shelf.scrollBy({ left:-400, behavior:"smooth" });
            });

            rightBtn?.addEventListener("click",()=>{
                shelf.scrollBy({ left:400, behavior:"smooth" });
            });

            shelf.dataset.scrollInit = "1";
        }

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