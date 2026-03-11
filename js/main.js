[
"https://abcalceta.github.io/koha-opac/js/generated-covers.js",
"https://abcalceta.github.io/koha-opac/js/main.js"
"https://abcalceta.github.io/koha-opac/js/homepage.js"
].forEach(src=>{
    let s=document.createElement("script");
    s.src=src;
    document.head.appendChild(s);
});



document.addEventListener("DOMContentLoaded", () => {
    console.log("Koha OPAC enhancements loaded");
});

let url = "https://abcalceta.github.io/koha-opac/html/homepage.html?v=" + Date.now();

fetch(url)
.then(r=>r.text())
.then(html=>{
document.querySelector("#OpacMainUserBlock").innerHTML = html;
});