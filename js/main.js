import { ensureCovers } from "./covers.js";
import { loadRandomBooks } from "./shelf.js";

document.addEventListener("DOMContentLoaded", () => {

  if (document.body.id !== "opac-main") return;

  fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
    .then(r => r.text())
    .then(html => {

      const container =
        document.querySelector("#OpacMainUserBlock .default_body") ||
        document.querySelector("#OpacMainUserBlock");

      if (!container) {
        console.log("Homepage container not found");
        return;
      }

      container.innerHTML = html;

      /* initialize homepage features */
      initShelf?.();

    })
    .catch(err => console.error("Homepage fetch failed:", err));

});