

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