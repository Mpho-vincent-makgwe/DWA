import { selectors } from '../modules/selectors.js';
import { books, authors } from '../modules/data.js';

const previewOverlay = document.createElement('template');
previewOverlay.innerHTML = `
<style>
* {
    box-sizing: border-box;
}
.overlay__row {
    display: flex;
    gap: 0.5rem;
    margin: 0 auto;
    justify-content: center;
}
.overlay__button_primary {
    background-color: rgba(var(--color-blue), 1);
    color: rgba(var(--color-force-light), 1);
}
.overlay__button_primary:hover {
    background-color: rgba(var(--color-blue), 0.8);
    color: rgba(var(--color-force-light), 1);
}
.overlay__title {
    padding: 1rem 0 0.25rem;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.1px;
    max-width: 25rem;
    margin: 0 auto;
    color: rgba(var(--color-dark), 0.8);
}
.overlay__content {
    padding: 2rem 1.5rem;
    text-align: center;
    padding-top: 3rem;
}
.overlay__preview {
    overflow: hidden;
    margin: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.overlay__data_secondary {
    color: rgba(var(--color-dark), 0.6);
}
.overlay__blur {
    width: 100%;
    height: 200px;
    filter: blur(10px);
    opacity: 0.5;
    transform: scale(2);
}
.overlay__data {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: rgba(var(--color-dark), 0.8);
}
.overlay__image {
    max-width: 10rem;
    position: absolute;
    top: 1.5rem;
    left: calc(50% - 5rem);
    border-radius: 2px;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.preview-item {
    cursor: pointer;
}
</style>
<dialog class="overlay" data-list-active>
<div class="overlay__preview">
    <img class="overlay__blur" data-list-blur src="" />
    <img class="overlay__image" data-list-image src="" />
</div>
<div class="overlay__content">
    <h3 class="overlay__title" data-list-title></h3>
    <div class="overlay__data" data-list-subtitle></div>
    <p class="overlay__data overlay__data_secondary" data-list-description></p>
</div>
<div class="overlay__row">
    <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
</div>
</dialog>`;

export class BookPreviewComponent extends HTMLElement {
constructor() {
super();
this.attachShadow({ mode: 'open' });
this.shadowRoot.appendChild(previewOverlay.content.cloneNode(true));
}

connectedCallback() {
const author = this.getAttribute('author') || '';
const image = this.getAttribute('image') || '';
const title = this.getAttribute('title') || '';

this.updateContent(author, image, title);

this.addEventListener('click', (event) => {
    this.handleClick(event);
});
}

static get observedAttributes() {
return ['author', 'image', 'title'];
}

attributeChangedCallback(name, oldValue, newValue) {
if (oldValue !== newValue) {
    const author = this.getAttribute('author') || '';
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || '';

    this.updateContent(author, image, title);
}
}

set book(book) {
this._book = book;
this.render();
}

updateContent(authors, image, title) {
    this.shadowRoot.querySelector('.overlay__title').textContent = title;
    this.shadowRoot.querySelector('.overlay__subactive').textContent = authors[author];
    this.shadowRoot.querySelector('.overlay__description').textContent = '';
    this.shadowRoot.querySelector('.overlay__image').src = image;
    this.shadowRoot.querySelector('.overlay__blur').src = image;
}


handleClick(event) {
const activeId = event.target.dataset.preview;
const active = books.find((book) => book.id === activeId);

if (active) {
    selectors.objects.activeList.open = true;
    selectors.objects.blurList.src = active.image;
    selectors.objects.imageList.src = active.image;
    selectors.objects.titleList.innerText = active.title;
    selectors.objects.subactiveList.innerText = authors[active.author];
    selectors.objects.descriptionList.innerText = active.description;
}

const clickEvent = new CustomEvent('previewClick', {
    detail: { book: this.book },
});
this.dispatchEvent(clickEvent);
}

render() {
if (!this.book) {
    this.shadowRoot.innerHTML = '';
    return;
}
}
}

customElements.define('book-preview', BookPreviewComponent);
