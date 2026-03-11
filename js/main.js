import "./random-books.js";
import "./generated-covers.js";
import "./homepage.js";


document.addEventListener("DOMContentLoaded", () => {
    console.log("Koha OPAC enhancements loaded");
});

let url = "https://USERNAME.github.io/koha-opac/html/homepage.html?v=" + Date.now();

fetch(url)
.then(r=>r.text())
.then(html=>{
document.querySelector("#OpacMainUserBlock").innerHTML = html;
});