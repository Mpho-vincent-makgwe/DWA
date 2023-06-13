// Fully working scripts.js file
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


// Query Selectors from Html file

/** @type {} */
const searchOverlayCancelButton = document.querySelector('[data-search-cancel]');
/** @type {} */
const searchOverlay = document.querySelector('[data-search-overlay]');
/** @type {} */
const settingsOverlayCancelButton = document.querySelector('[data-settings-cancel]');
/** @type {} */
const settingsOverlay = document.querySelector('[data-settings-overlay]');
/** @type {} */
const searchTitle = document.querySelector('[data-search-title]');
/** @type {} */
const listItems = document.querySelector('[data-list-items]');
/** @type {} */
const listButton = document.querySelector('[data-list-button]');
/** @type {} */
const messageList = document.querySelector('[data-list-message]');
/** @type {} */
const searchForm = document.querySelector('[data-search-form]');
/** @type {} */
const headerSearch = document.querySelector('[data-header-search]');
/** @type {} */
const searchGenres = document.querySelector('[data-search-genres]');
/** @type {} */
const searchAuthors = document.querySelector('[data-search-authors]');
/** @type {} */
const settingsTheme = document.querySelector('[data-settings-theme]');
/** @type {} */
const settingsForm = document.querySelector('[data-settings-form]');
/** @type {} */
const activeList = document.querySelector('[data-list-active]');
/** @type {} */
const blurList = document.querySelector('[data-list-blur]');
/** @type {} */
const imageList = document.querySelector('[data-list-image]');
/** @type {} */
const titleList = document.querySelector('[data-list-title]');
/** @type {} */
const subactiveList = document.querySelector('[data-list-subtitle]');
/** @type {} */
const descriptionList = document.querySelector('[data-list-description]');
/** @type {} */
const closeList = document.querySelector('[data-list-close]');
/** @type {} */
const headerSettings = document.querySelector('[data-header-settings]');
//**selectors end here */

// HTML displays

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
};


/** @type {number} */
let page = 1;
/** @type {Book[]} */
let matches = books

const starting = createPreviewElements(matches.slice(0, BOOKS_PER_PAGE));
listItems.appendChild(starting);

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

searchGenres.appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

searchAuthors.appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    settingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    settingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

listButton.innerText = `Show more (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})`
listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`




searchOverlayCancelButton.addEventListener('click', () => {
    searchOverlay.open = false
})

settingsOverlayCancelButton.addEventListener('click', () => {
    settingsOverlay.open = false
})

headerSearch.addEventListener('click', () => {
    searchOverlay.open = true 
    searchTitle.focus()
})

headerSettings.addEventListener('click', () => {
    settingsOverlay.open = true 
})

closeList.addEventListener('click', () => {
    activeList.open = false
})

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    settingsOverlay.open = false
})

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        messageList.classList.add('list__message_show')
    } else {
        messageList.classList.remove('list__message_show')
    }

    listItems.innerHTML = ''
    const newItems = createPreviewElements(result.slice(0, BOOKS_PER_PAGE));
    listItems.appendChild(newItems);

    listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
    listButton.innerText =`Show more(${(matches.length - (page * BOOKS_PER_PAGE))})` 
    listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
    window.scrollTo({top: 0, behavior: 'smooth'});
    searchOverlay.open = false
})
/**
 * Handles the click event on the list button to load more books.
 * 
 */
listButton.addEventListener('click', () => {
  const fragment = createPreviewElements(matches.slice(page * BOOKS_PER_PAGE - (page + 1) * BOOKS_PER_PAGE));
  listButton.innerText =`Show more(${(matches.length - (page * BOOKS_PER_PAGE))})` 
listItems.appendChild(fragment);
page += 1;
});

/**
 * Handles the click event on the list items to show the active book details.
 * @param {Event} event - The click event.
 */
listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    

    if (active) {
        activeList.open = true
        blurList.src = active.image
        imageList.src = active.image
        titleList.innerText = active.title
        subactiveList.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        descriptionList.innerText = active.description
    }
})