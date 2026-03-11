export async function loadRandomBooks(){

let shelf=document.querySelector("#random-books");

if(!shelf) return;

let data=await fetch("/cgi-bin/koha/svc/report?id=6")
.then(r=>r.json());

let html="";

data.forEach(row=>{

let biblio=row[0];
let title=row[1]||"Book";

html+=`
<a class="random-book"
href="/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}">
<div class="bookcover" data-title="${title}"></div>
<span class="booktitle">${title}</span>
</a>
`;

});

shelf.innerHTML=html;

ensureCovers();

}

/* enable scroll buttons */

document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:-400,behavior:"smooth"});
});

document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:400,behavior:"smooth"});
});

/* run when shelf exists */

document.addEventListener("DOMContentLoaded",loadRandomBooks);