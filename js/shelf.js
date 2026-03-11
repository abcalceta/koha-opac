import { createGeneratedCover } from "./covers.js";

export async function loadRandomBooks(){

    const shelf = document.querySelector("#random-books");
    if(!shelf) return;

    const data = await fetch("/cgi-bin/koha/svc/report?id=6")
        .then(r => r.json());

    shelf.innerHTML = "";

    data.forEach(row=>{

        const biblio = row[0];
        const title = row[1] || "[NO TITLE]";
        const subtitle = row[2] || "";
        const author = row[3] || "";

        const title_short = title.substring(0,30);

        const link = document.createElement("a");
        link.className = "random-book";
        link.href = `/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}`;

        const cover = createGeneratedCover(title_short, author);

        const label = document.createElement("span");
        label.className = "booktitle";
        label.textContent = `${title} ${subtitle}`;

        link.appendChild(cover);
        link.appendChild(label);

        shelf.appendChild(link);

    });

    document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
        shelf.scrollBy({left:-400,behavior:"smooth"});
    });

    document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
        shelf.scrollBy({left:400,behavior:"smooth"});
    });

}