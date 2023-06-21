//@ts-check
/**
 * @callback {Function}
 *
 * /


/**
 * @typedef {Object} Book
 * @property {string} author - The author of the book.
 * @property {string} id - The unique identifier of the book.
 * @property {string} image - The URL of the book's image.
 * @property {string} title - The title of the book.
 */

/**
 * Represents a collection of books.
 * @type {Book[]}
 */
import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { selectors } from './selectors.js';
import { BookPreviewComponent } from '../Components/Preview.js';
/**
 * Create preview elements for the given items.
 * @param {Book[]} items - The array of book items.
 * @returns {DocumentFragment} - The document fragment containing the preview elements.
 */
export function createPreviewElements(items) {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of items) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
    `;
    fragment.appendChild(element);
  }

  return fragment;
  
}



export function initialFragmentPreview() {
  /** @type {number} */
  let page = 1;
  /** @type {Book[]} */
  let matches = books;

  

  selectors.buttons.listButton.disabled = (matches.length - page * BOOKS_PER_PAGE) <= 0;
  selectors.buttons.listButton.innerText = `Show more (${matches.length - page * BOOKS_PER_PAGE})`;

  selectors.buttons.listButton.addEventListener('click', () => {
    const start = (page - 1) * BOOKS_PER_PAGE;
    const end = page * BOOKS_PER_PAGE;
    const itemsToAppend = matches.slice(start, end);
    const fragment = createPreviewElements(itemsToAppend);

    selectors.buttons.listButton.innerText = `Show more (${matches.length - end})`;
    selectors.objects.listItems.appendChild(fragment);

    if (end >= matches.length) {
      selectors.buttons.listButton.style.display = 'none';
    }
    page += 1;
  });

  const initialItems = matches.slice(0, BOOKS_PER_PAGE);
  const initialFragmentPreview = createPreviewElements(initialItems);
  selectors.objects.listItems.appendChild(initialFragmentPreview);


  if (matches.length <= BOOKS_PER_PAGE) {
    selectors.buttons.listButton.style.display = 'none';
  }

  selectors.buttons.headerSearch.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = true;
  });

  selectors.buttons.headerSettings.addEventListener('click', () => {
    selectors.overlays.settingsOverlay.open = true;
  });

  selectors.buttons.searchOverlayCancelButton.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = false;
  });

  selectors.buttons.settingsOverlayCancelButton.addEventListener('click', () => {
    selectors.overlays.settingsOverlay.open = false;
  });

};
