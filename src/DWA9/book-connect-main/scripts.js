//@ts-check
/**
 * @callback {Function}
 */

/**
 * @typedef {Object} Book
@ -12,284 +15,13 @@
 * Represents a collection of books.
 * @type {Book[]}
 */
import { initialFragmentPreview, createPreviewElements } from './modules/initialBooks.js';

import { settings } from './modules/settingsModule.js';
import { search } from './modules/searchModule.js';
import { selectors } from './modules/selectors.js';
import { BookPreviewComponent } from'./Components/Preview.js';

function booksPreviews (event) {
  initialFragmentPreview();
  search();
  settings();
    const bookPreviewComponent = new BookPreviewComponent();
  selectors.objects.listItems.appendChild(bookPreviewComponent);
}

window.addEventListener('DOMContentLoaded', booksPreviews);
selectors.objects.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  search();});

settings();
// new bookPreviewComponent();

