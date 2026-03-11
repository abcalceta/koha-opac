async function loadRandomBooks(){

    const container = document.getElementById("random-books");
    if(!container) return;

    const res = await fetch("/cgi-bin/koha/svc/report?id=6");
    const data = await res.json();

    container.innerHTML = "";

    data.forEach(row => {

        let biblio = row[0];
        let title = row[1];

        let card = document.createElement("a");
        card.href = `/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}`;
        card.className = "random-book";

        let title_truncated = title.substring(0, 20);
        card.innerHTML = `
            <div class="generated-cover" data-title="${title}">
                ${title_truncated}
            </div>
            <span class="booktitle">${title}</span>
        `;

        container.appendChild(card);

    });

}

loadRandomBooks();
