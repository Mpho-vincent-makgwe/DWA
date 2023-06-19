// DayAndNightOverlay.js


const overlayHTML =/*html*/
 `
 <dialog class="overlay" data-settings-overlay>
  <div class="overlay__content">
    <form class="overlay__form" data-settings-form id="settings">
      <label class="overlay__field">
        <div class="overlay__label">Theme</div>
        <select class="overlay__input overlay__input_select" data-settings-theme name="theme">
          <option value="day">Day</option>
          <option value="night">Night</option>
        </select>
      </label>
    </form>
    <div class="overlay__row">
      <button class="overlay__button" data-settings-cancel>Cancel</button>
      <button class="overlay__button overlay__button_primary" type="submit" form="settings">Save</button>
    </div>
  </div>
</dialog>`;

export class DayAndNightOverlay extends HTMLElement {
  static themes = ['day', 'night'];

  connectedCallback() {
    const initialTheme = this.getAttribute('theme') || 'day';
    this.applyTheme(initialTheme);
    this.createButton(); // Add this line
    this.addEventListener('submit', this.handleFormSubmit);
    this.createOverlay();
  }
  createButton() {
    const button = document.createElement('button');
    button.className = 'header__button';
    button.setAttribute('data-header-settings', '');
    button.innerHTML = `
      <svg class="header__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960">
        <path d="M479.796 562q-77.203 0-126-48.796Q305 464.407 305 387.204 305 310 353.796 261q48.797-49 126-49Q557 212 606.5 261T656 387.204q0 77.203-49.5 126Q557 562 479.796 562ZM135 934V813.205q0-44.507 22.828-77.721Q180.656 702.27 217 685q69-31 133.459-46.5T479.731 623q66.731 0 130.5 16 63.769 16 131.69 46.194 37.911 16.085 60.995 49.445Q826 768 826 812.945V934H135Zm94-94h502v-23q0-15.353-9.5-29.323Q712 773.706 698 767q-60-28-110.495-38.5-50.496-10.5-108-10.5Q424 718 371.5 728.5 319 739 261.429 766.844 247 773.559 238 787.575q-9 14.016-9 29.425v23Zm250.796-372Q515 468 538 445.154t23-58.119q0-35.685-22.796-58.36-22.797-22.675-58-22.675Q445 306 422 328.721t-23 57.819q0 35.51 22.796 58.485 22.797 22.975 58 22.975Zm.204-81Zm0 453Z"></path>
      </svg>
    `;
  
    const settingsButton = this.shadowRoot.querySelector('[data-header-settings]');
    settingsButton.replaceWith(button);
  
    button.addEventListener('click', () => {
      this.setAttribute('data-settings', '');
    });
  
    // Append the button to the actual DOM
    const header = document.querySelector('header');
    header.appendChild(button);
  }
  

  createOverlay() {
    const template = document.createElement('template');
    template.innerHTML = overlayHTML;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-settings') {
          const isVisible = this.hasAttribute('data-settings');
          const settingsOverlay = shadowRoot.querySelector('[data-settings-overlay]');
          settingsOverlay.open = isVisible;
        }
      });
    });

    observer.observe(this, { attributes: true });

    const settingsButton = shadowRoot.querySelector('[data-header-settings]');
  settingsButton.addEventListener('click', () => {
    this.setAttribute('data-settings', true);
  });

  const cancelButton = shadowRoot.querySelector('[data-settings-cancel]');
  cancelButton.addEventListener('click', () => {
    this.removeAttribute('data-settings');
  });
  }

  set theme(value) {
    if (DayAndNightOverlay.themes.includes(value)) {
      this.setAttribute('theme', value);
      this.applyTheme(value);
    }
  }

  get theme() {
    return this.getAttribute('theme');
  }

  applyTheme(theme) {
    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    this.theme = theme;
    this.removeAttribute('data-settings');
  }
  
}

customElements.define('day-and-night-overlay', DayAndNightOverlay);

export default DayAndNightOverlay;
