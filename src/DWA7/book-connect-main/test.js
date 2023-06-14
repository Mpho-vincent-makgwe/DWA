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

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
const selectors = {
    overlays:{
    /** @type {} */
    searchOverlay : document.querySelector('[data-search-overlay]'),
    /** @type {} */
    settingsOverlay : document.querySelector('[data-settings-overlay]'),
    },
    buttons:{
    /** @type {} */
    searchOverlayCancelButton : document.querySelector('[data-search-cancel]'),
    /** @type {} */
    settingsOverlayCancelButton : document.querySelector('[data-settings-cancel'),
    /** @type {} */
    listButton : document.querySelector('[data-list-button]'),
    /** @type {} */
    settingsTheme : document.querySelector('[data-settings-theme]'),
    /** @type {} */
    closeList : document.querySelector('[data-list-close]'),
    /** @type {} */
    headerSettings : document.querySelector('[data-header-settings'),
    /** @type {} */
    headerSearch : document.querySelector('[data-header-search]'),
    },
    objects:{
            /** @type {} */
    settingsForm : document.querySelector('[data-settings-form]'),

    /** @type {} */
    descriptionList : document.querySelector('[data-list-descriptio]'),

    /** @type {} */
    activeList : document.querySelector('[data-list-active]'),

    /** @type {} */
    blurList : document.querySelector('[data-list-blur]'),
    /* @type {} */
    imageList : document.querySelector('[data-list-image]'),
    /** @type {} */
    titleList : document.querySelector('[data-list-title]'),
    /** @type {} */
    subactiveList : document.querySelector('[data-list-subtitle]'),
            /** @type {} */
    searchGenres : document.querySelector('[data-search-genres]'),
    /** @type {} */
    searchAuthors : document.querySelector('[data-search-authors]'),
            /** @type {} */
    searchForm : document.querySelector('[data-search-form]'),
    /** @type {} */
    messageList : document.querySelector('[data-list-message]'),
            /** @type {} */
    listItems : document.querySelector('[data-list-items]'),
        /** @type {} */
    searchTitle : document.querySelector('[data-search-title]'),
    },
};
// Query Selectors from Html file

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
  
  // ...
  
  selectors.buttons.listButton.addEventListener('click', () => {
    const fragment = createPreviewElements(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    selectors.objects.listItems.appendChild(fragment);
    page += 1;
  });
  

  // Rest of the code...

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
// Module 2: settingsModule.js
const settingsModule = (function() {
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
settingsModule.applyTheme('night');

selectors.objects.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    settingsModule.applyTheme(theme);
    selectors.overlays.settingsOverlay.open = false;
});

// Module 3: searchModule.js
const searchModule = (function() {
    // Private variables and functions
    const filters = {
        genre: 'any',
        title: '',
        author: 'any',
    };

    function filterBooks() {
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

        return result;
    }

    // Public methods
    return {
        filters, // Expose filters as a public property
        filterBooks, // Expose filterBooks as a public method
    };
})();

// Usage
const result = searchModule.filterBooks();

// ...
