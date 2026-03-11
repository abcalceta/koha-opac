export const homepageHTML = `
<h2>Discover Books</h2>

<div class="discover-wrapper">

    <button class="scroll-btn left">‹</button>

    <div id="random-books" class="discover-shelf"></div>

    <button class="scroll-btn right">›</button>

</div>

<h2>Anthropology Highlights</h2>

<div class="discover-wrapper">

    <button class="scroll-btn left">‹</button>

    <div id="anthro-books" class="discover-shelf"></div>

    <button class="scroll-btn right">›</button>

</div>
`;



loadShelf("random-books", 6);     // report id for random books
loadShelf("anthro-books", 7);     // report id for anthropology