/* ============================================================
   homepage.js — Homepage HTML template
   Injected into #OpacMainUserBlock by main.js.
   Each .discover-shelf is populated dynamically by shelf.js.
   ============================================================ */

export const homepageHTML = `
<section class="discover-section">

    <h2>Discover Books</h2>

    <div class="discover-wrapper">
        <button class="scroll-btn left" aria-label="Scroll left">&#8249;</button>
        <div id="random-books" class="discover-shelf"></div>
        <button class="scroll-btn right" aria-label="Scroll right">&#8250;</button>
    </div>

    <h2>Anthropology Highlights</h2>

    <div class="discover-wrapper">
        <button class="scroll-btn left" aria-label="Scroll left">&#8249;</button>
        <div id="anthro-books" class="discover-shelf"></div>
        <button class="scroll-btn right" aria-label="Scroll right">&#8250;</button>
    </div>

</section>
`;
