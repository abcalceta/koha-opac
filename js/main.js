import { loadRandomBooks } from "./shelf.js";
import { ensureCovers } from "./covers.js";


function loadCSS(){

const css=document.createElement("link");

css.rel="stylesheet";
css.href="https://abcalceta.github.io/koha-opac/css/theme.css";

document.head.appendChild(css);

}

loadCSS();

function waitForElement(selector, callback){

  const el = document.querySelector(selector);

  if(el){
    callback(el);
    return;
  }

  const observer = new MutationObserver(() => {

    const el = document.querySelector(selector);

    if(el){
      observer.disconnect();
      callback(el);
    }

  });

  observer.observe(document.body,{
    childList:true,
    subtree:true
  });

}


document.addEventListener("DOMContentLoaded", () => {

  if(document.body.id !== "opac-main") return;

  waitForElement("#OpacMainUserBlock .default_body", async (container)=>{

    const r = await fetch(
      "https://abcalceta.github.io/koha-opac/html/homepage.html"
    );

    const html = await r.text();

    container.innerHTML = html;

    loadRandomBooks?.();

  });

});