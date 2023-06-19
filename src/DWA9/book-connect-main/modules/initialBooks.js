//@ts-check

/**
 * @callback {Function}
 */

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
  let page = 1;
  let matches = books.slice();

  selectors.buttons.listButton.disabled = matches.length - page * BOOKS_PER_PAGE <= 1;
  selectors.buttons.listButton.innerText = `Show more(${matches.length})`;

  selectors.buttons.listButton.removeEventListener('click', showMoreItems);
  selectors.buttons.listButton.addEventListener('click', showMoreItems);

  const initialItems = matches.slice(0, BOOKS_PER_PAGE);
  const initialFragment = createPreviewElements(initialItems);
  selectors.objects.listItems.appendChild(initialFragment);

  if (matches.length <= BOOKS_PER_PAGE) {
    selectors.buttons.listButton.style.display = 'none';
  } else {
    selectors.buttons.listButton.style.display = 'block';
  }

  selectors.objects.listItems.removeEventListener('click', handlePreviewClick);
  selectors.objects.listItems.addEventListener('click', handlePreviewClick);

  selectors.buttons.headerSearch.removeEventListener('click', openSearchOverlay);
  selectors.buttons.headerSearch.addEventListener('click', openSearchOverlay);

  selectors.buttons.searchOverlayCancelButton.removeEventListener('click', closeSearchOverlay);
  selectors.buttons.searchOverlayCancelButton.addEventListener('click', closeSearchOverlay);

  selectors.buttons.previewCancel.removeEventListener('click', closeActiveList);
  selectors.buttons.previewCancel.addEventListener('click', closeActiveList);

  function showMoreItems() {
    const start = (page - 1) * BOOKS_PER_PAGE;
    const end = page * BOOKS_PER_PAGE;
    const itemsToAppend = matches.slice(start, end);
    const fragment = createPreviewElements(itemsToAppend);

    selectors.buttons.listButton.innerText = `Show more(${matches.length - page * BOOKS_PER_PAGE})`;
    selectors.objects.listItems.appendChild(fragment);

    if (end >= matches.length) {
      selectors.buttons.listButton.style.display = 'none';
    }

    page += 1;
  }

  function handlePreviewClick(event) {
    const pathArray = Array.from(event.composedPath ? event.composedPath() : event.path);
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        active = books.find(book => book.id === node.dataset.preview);
      }
    }

    if (active) {
      selectors.objects.activeList.open = true;
      selectors.objects.blurList.src = active.image;
      selectors.objects.imageList.src = active.image;
      selectors.objects.titleList.innerText = active.title;
      selectors.objects.subactiveList.innerText = `${authors[active.author]} (${new Date(
        active.published
      ).getFullYear()})`;
      selectors.objects.descriptionList.innerText = active.description;
    }
  }

  selectors.buttons.headerSearch.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = true;
  });

  selectors.buttons.searchOverlayCancelButton.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = false;
  });

  selectors.buttons.previewCancel.addEventListener('click', () => {
    selectors.objects.activeList.open = false;
  });
}
