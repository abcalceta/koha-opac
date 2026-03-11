

function loadRandomBooks(){

    fetch("/cgi-bin/koha/svc/report?id=6")
    .then(r => r.json())
    .then(data => {

        let html = "";

        data.forEach(row => {

            let biblio = row[0];
            let title = row[1] || "Book";

            html += `
            <a class="random-book"
               href="/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}">
                <div class="bookcover" data-title="${title}"></div>
                <span class="booktitle">${title}</span>
            </a>
            `;

        });

        document.querySelector("#random-books").innerHTML = html;

        generateMissingCovers();

    });

}

document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:-400,behavior:"smooth"});
});

document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:400,behavior:"smooth"});
});


document.addEventListener("DOMContentLoaded", () => {

    if(document.body.id === "opac-main"){

        fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
        .then(r=>r.text())
        .then(html=>{

            document.querySelector("#OpacMainUserBlock").innerHTML = html;

            /* start shelf */
            loadRandomBooks();

        });

    }

});