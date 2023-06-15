import { } from './initialBooks.js';
import { selectors } from './selectors.js';

export function settings () {
// Module 2: settingsModule.js
/**
 * The settingsModule handles the theme settings for the book collection interface.
 */
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
};