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
// import { settings } from './modules/settingsModule.js';
import { search } from './modules/searchModule.js';
import { selectors } from './modules/selectors.js';
import DayAndNightOverlay from './Components/DayAndNight.js';

function booksPreviews(event) {
  initialFragmentPreview();
  search();
  const dayAndNightOverlay = new DayAndNightOverlay();
  const settingsButton = dayAndNightOverlay.createButton(); // Move createButton outside the class
  const header = document.querySelector('header');
  header.appendChild(settingsButton); // Append the button to the header element
  settings();
}


window.addEventListener('DOMContentLoaded', booksPreviews);

selectors.objects.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});
