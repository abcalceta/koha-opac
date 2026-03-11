document.addEventListener("DOMContentLoaded", () => {

  if (document.body.id !== "opac-main") return;

  fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
    .then(r => r.text())
    .then(html => {

      const container = document.querySelector("#OpacMainUserBlock");
      if (!container) return;

      container.innerHTML = html;

      /* wait for DOM to update before initializing */
      requestAnimationFrame(() => {

        initShelf();

      });

    });

});

function initShelf(){

  const shelf = document.querySelector("#random-books");
  if(!shelf) return;

  loadRandomBooks();

  document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
    shelf.scrollBy({left:-400,behavior:"smooth"});
  });

  document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
    shelf.scrollBy({left:400,behavior:"smooth"});
  });

}