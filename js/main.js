import { ensureCovers } from "./covers.js";
import { loadRandomBooks } from "./random-books.js";

document.addEventListener("DOMContentLoaded", () => {

    ensureCovers();

    if(document.body.id === "opac-main"){
        loadRandomBooks();
    }

});