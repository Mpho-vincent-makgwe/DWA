import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { selectors, createPreviewElements} from './initialBooks.js';

export function search() {
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

    selectors.searchGenres.appendChild(genreHtml);

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

    selectors.searchAuthors.appendChild(authorsHtml);

    function filterBooks(event) {
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
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

      let page = 1;
      const matches = result;

      if (result.length < 1) {
        selectors.messageList.classList.add('list__message_show');
      } else {
        selectors.messageList.classList.remove('list__message_show');
      }

      selectors.listItems.innerHTML = '';
      const newItems = createPreviewElements(result.slice(0, BOOKS_PER_PAGE));
      selectors.listItems.appendChild(newItems);

      selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 1;
      selectors.listButton.innerText = `Show more(${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0}))`;

      window.scrollTo({ top: 0, behavior: 'smooth' });
      selectors.searchOverlay.open = false;
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
