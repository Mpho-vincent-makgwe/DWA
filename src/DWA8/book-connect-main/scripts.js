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
import { initialFragmentPreview } from './modules/initialBooks.js';
import { settings } from './modules/settingsModule.js';
import { search } from './modules/searchModule.js';
function booksPreviews (event) {
  initialFragmentPreview();
  settings();
  search();

  window.addEventListener('DOMContentLoaded', booksPreviews);
}
booksPreviews();