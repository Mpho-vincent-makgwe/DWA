import { LitElement, html, css } from './Lit-HTML.js';
import { createTallyStore } from './customStore.js';
import { addAction, subtractAction, resetAction } from './actions.js';


// // Import the required components
// import './setting-button.js';
// import './user-action.js';

class MyElement extends LitElement {
static styles = css`
:root {
--color-green: #31c48d;
--color-white: #ffffff;
--color-dark-grey: #33333d;
--color-medium-grey: #424250;
--color-light-grey: #d2d6dc;
}

* {
box-sizing: border-box;
}

/* header */
.header{
text-align: center;
}

/* controls */
.controls{
background: yellow;
}
/* counter */
.counter{
background: var(--color-dark-grey);
}

.counter__value{
width: 100%;
height: 15rem;
text-align: center;
font-size: 6rem;
font-weight: 900;
color: var(--color-white);
background: none;
border-width: 0;
border-bottom: 1px solid var(--color-light-grey)
}

.counter__actions{
display: flex;
}

.counter__button{
background: none;
width: 50%;
border-width: 0;
color: var(--color-light-grey);
font-size: 3rem;
height: 10rem;
border-bottom: 1px solid var(--color-light-grey);
transition: transform 0.3s;
transform: translateY(0);
}

.counter__button:disabled{
background: rgb(220, 65, 65);
}
.counter__button:active{
background: var(--color-medium-grey);
transform: translateY(2%);
}

.counter__button_first{
border-right: 1px solid var(--color-light-grey)
}
/* footer */
.footer{
background: var(--color-dark-grey);
color: var(--color-light-grey);
padding: 2rem;
font-size: 0.8rem;
text-align: center;
}
.footer__link{
color:var(--color-white);
}
`;


store = createTallyStore();

  updateCounterValue() {
    this.shadowRoot.querySelector('.counter__value').value = this.counterValue;
// store.subscribe(() => {
//   const state = store.getState();
//   counterValue = state.count;
//   updateCounterValue();
// });
}


counterValue = 0;





  resetCounterValue() {
    this.counterValue = 0;
    alert('Counter has been reset.');
    this.updateCounterValue();
    this.store.dispatch(resetAction());
    console.log(this.store.getState());
  };

handleClick(action) {

   function updateCounterValue() {
        this.shadowRoot.querySelector('.counter__value').value = this.counterValue;};

   const store = createTallyStore();
   store.subscribe(() => {
    const state = store.getState();
    this.counterValue = state.count;
    updateCounterValue();
  });

switch (action) {

    case 'add':
    if (this.counterValue <= 20) {
        this.counterValue += 1;
        this.updateCounterValue();
        this.store.dispatch(addAction());
        console.log(this.store.getState());
    } else {
        this.resetCounterValue();
    }
    break;


    case 'subtract':
    if (this.counterValue > -10) {
        this.counterValue -= 1;
        this.updateCounterValue();
        this.store.dispatch(subtractAction());
        console.log(this.store.getState());
    }
    break;

    case 'reset':
    this.resetCounterValue();
    break;

    default:
    break;
}
};



render() {

return html`
    <header class="header">
    <h1>Tally Count</h1>
    </header>

    <setting-button class="controls"></setting-button>

    <main class="counter">
    <input class="counter__value" data-key="number" readonly value="${this.counterValue}">
    <div class="counter__actions">
        <user-action
        data-key="subtract"
        class="counter__button"
        @click="${() => this.handleClick('subtract')}"
        >
        -
        </user-action>
        <user-action
        data-key="reset"
        class="counter__button"
        @click="${() => this.handleClick('reset')}"
        >
        C
        </user-action>
        <user-action
        data-key="add"
        class="counter__button"
        @click="${() => this.handleClick('add')}"
        >
        +
        </user-action>
    </div>
    </main>

    <footer class="footer">
    <p>
        Inspired by
        <a class="footer__link" href="https://tallycount.app/" target="_blank">Tally count</a>.
        Note: This is for a school project and JavaScript practice.
    </p>
    </footer>

`;
}
}

customElements.define('mr-mpho', MyElement);
export default MyElement;