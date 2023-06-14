//@ts-check

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
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
const initialBooks = () =>{
const selectors = {
  overlays: {
    searchOverlay: document.querySelector('[data-search-overlay]'),
    settingsOverlay: document.querySelector('[data-settings-overlay]'),
  },
  buttons: {
    searchOverlayCancelButton: document.querySelector('[data-search-cancel]'),
    settingsOverlayCancelButton: document.querySelector('[data-settings-cancel]'),
    listButton: document.querySelector('[data-list-button]'),
    settingsTheme: document.querySelector('[data-settings-theme]'),
    closeList: document.querySelector('[data-list-close]'),
    headerSettings: document.querySelector('[data-header-settings]'),
    headerSearch: document.querySelector('[data-header-search]'),
  },
  objects: {
    settingsForm: document.querySelector('[data-settings-form]'),
    descriptionList: document.querySelector('[data-list-description]'),
    activeList: document.querySelector('[data-list-active]'),
    blurList: document.querySelector('[data-list-blur]'),
    imageList: document.querySelector('[data-list-image]'),
    titleList: document.querySelector('[data-list-title]'),
    subactiveList: document.querySelector('[data-list-subtitle]'),
    searchGenres: document.querySelector('[data-search-genres]'),
    searchAuthors: document.querySelector('[data-search-authors]'),
    searchForm: document.querySelector('[data-search-form]'),
    messageList: document.querySelector('[data-list-message]'),
    listItems: document.querySelector('[data-list-items]'),
    searchTitle: document.querySelector('[data-search-title]'),
  },
};

/** @type {number} */
let page = 1;
/** @type {Book[]} */
let matches = books;

/**
 * Create preview elements for the given items.
 * @param {Book[]} items - The array of book items.
 * @returns {DocumentFragment} - The document fragment containing the preview elements.
 */
function createPreviewElements(items) {
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
    
selectors.buttons.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 1;
selectors.buttons.listButton.innerText = `Show more(${(matches.length)}))`

selectors.buttons.listButton.addEventListener('click', () => {
    const start = (page - 1) * BOOKS_PER_PAGE;
    const end = page * BOOKS_PER_PAGE;
    const itemsToAppend = matches.slice(start, end);
    const fragment = createPreviewElements(itemsToAppend);
    
  selectors.buttons.listButton.innerText = `Show more(${(matches.length - (page * BOOKS_PER_PAGE))}))`
    selectors.objects.listItems.appendChild(fragment);
  
    if (end >= matches.length) {
      selectors.buttons.listButton.style.display = 'none';
    }
  
    page += 1;
  });
  
  const initialItems = matches.slice(0, BOOKS_PER_PAGE);
  const initialFragment = createPreviewElements(initialItems);
  selectors.objects.listItems.appendChild(initialFragment);
  
  if (matches.length <= BOOKS_PER_PAGE) {
    selectors.buttons.listButton.style.display = 'none';
  }

  const fragment = createPreviewElements(matches.slice(0, BOOKS_PER_PAGE));
  selectors.objects.listItems.appendChild(fragment);
  page += 1;

selectors.objects.listItems.addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    selectors.objects.activeList.open = true;
    selectors.objects.blurList.src = active.image;
    selectors.objects.imageList.src = active.image;
    selectors.objects.titleList.innerText = active.title;
    selectors.objects.subactiveList.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    selectors.objects.descriptionList.innerText = active.description;
  }
});
selectors.buttons.headerSearch.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = true;
    selectors.objects.searchTitle.focus();
  });
  
  selectors.buttons.headerSettings.addEventListener('click', () => {
    selectors.overlays.settingsOverlay.open = true;
  });
  
  selectors.buttons.closeList.addEventListener('click', () => {
    selectors.objects.activeList.open = false;
  });
  
  selectors.buttons.searchOverlayCancelButton.addEventListener('click', () => {
    selectors.overlays.searchOverlay.open = false;
  });
  
  selectors.buttons.settingsOverlayCancelButton.addEventListener('click', () => {
    selectors.overlays.settingsOverlay.open = false;
  });

// Module 2: settingsModule.js
const settingsModule = (function () {
  // Private variables and functions
  const themes = ['day', 'night']; // Private array to store available themes

  function applyTheme(theme) {
    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  }

  // Public methods
  return {
    themes, // Expose themes as a public property
    applyTheme, // Expose applyTheme as a public method
  };
})();

// Usage
settingsModule.applyTheme('day');

selectors.objects.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  settingsModule.applyTheme(theme);
  selectors.overlays.settingsOverlay.open = false;
});


  
// Module 3: searchModule.js
const searchModule = (function () {
  // Private variables and functions
  const filters = {
    genre: 'any',
    title: '',
    author: 'any',
  };

// Populate genre options
const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

selectors.objects.searchGenres.appendChild(genreHtml);

// Populate author options
const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.innerText = 'All Authors';
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

selectors.objects.searchAuthors.appendChild(authorsHtml);

  
  function filterBooks(event) {
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === 'any';

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) genreMatch = true;
      }

      if (
        (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === 'any' || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }
    page = 1;
  matches = result;

  if (result.length < 1) {
    selectors.objects.messageList.classList.add('list__message_show');
  } else {
    selectors.objects.messageList.classList.remove('list__message_show');
  }

  selectors.objects.listItems.innerHTML = '';
  const newItems = createPreviewElements(result.slice(0, BOOKS_PER_PAGE));
  selectors.objects.listItems.appendChild(newItems);

  selectors.buttons.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 1;
  selectors.buttons.listButton.innerText = `Show more(${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0}))`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  selectors.overlays.searchOverlay.open = false;
}

  // Public methods
  return {
    filters, // Expose filters as a public property
    filterBooks, // Expose filterBooks as a public method
  };
})();
selectors.objects.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchModule.filterBooks(event);
  });
// Usage
const results = searchModule.filterBooks(event); // Get the filtered results
};
initialBooks();

