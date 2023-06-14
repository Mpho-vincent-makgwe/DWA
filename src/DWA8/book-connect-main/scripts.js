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
import { settings } from './modules/settingsModule.js';
import { initialFragment, createPreviewElements } from './modules/initialBooks.js';
import { search } from './modules/searchModule.js';


window.addEventListener('DOMContentLoaded', (event) =>{  
 initialFragment();  
  search();

  settings();
});

