
export async function loadShelf(shelfId, reportId){

    const shelf = document.querySelector(`#${shelfId}`);
    if(!shelf) return;

    const data = await fetch(`/cgi-bin/koha/svc/report?id=${reportId}`)
        .then(r => r.json());

    shelf.innerHTML = "";

    data.forEach(row => {

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
        label.textContent = subtitle ? `${title}: ${subtitle}` : title;

        link.appendChild(cover);
        link.appendChild(label);

        shelf.appendChild(link);

    });

	const wrapper = shelf.closest(".discover-wrapper");
	if(!wrapper) return;

	const leftBtn = wrapper.querySelector(".scroll-btn.left");
	const rightBtn = wrapper.querySelector(".scroll-btn.right");

	if(!shelf.dataset.scrollInit){

	    leftBtn?.addEventListener("click", () => {
	        shelf.scrollBy({ left: -400, behavior: "smooth" });
	    });

	    rightBtn?.addEventListener("click", () => {
	        shelf.scrollBy({ left: 400, behavior: "smooth" });
	    });

	    shelf.dataset.scrollInit = "1";
	}

}