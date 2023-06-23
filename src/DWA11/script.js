//script.js',
import './component.js';
import { createTallyStore } from './customStore.js';
import { addAction, subtractAction, resetAction } from './actions.js';
// import './actions.js'
// consoleAction();

const counterValueInput = document.querySelector(".counter__value");
const addButton = document.querySelector('[data-key="add"]');
const subtractButton = document.querySelector('[data-key="subtract"]');
const resetButton = document.querySelector('[data-key="reset"]');

let counterValue = 0;

function updateCounterValue() {
    counterValueInput.value = counterValue;
}
function resetCounterValue() {
    counterValue=0;
    alert("Counter has been reset.");
    updateCounterValue();
    store.dispatch(resetAction());
    console.log(store.getState());
}
addButton.addEventListener("click", () => {
    if (counterValue <=20){
    counterValue = +1;
    updateCounterValue();
    store.dispatch(addAction());
    console.log(store.getState());
    }else if (counterValue >= 20){
        resetCounterValue()
    }
});

subtractButton.addEventListener("click", () => {
    if (counterValue > -10) {
        counterValue = counterValue-1;
        updateCounterValue();
        store.dispatch(subtractAction());
        console.log(store.getState());
    }
});

resetButton.addEventListener("click", () => {
    resetCounterValue();
});

// Scenario 1: Increment the counter by one
// GIVEN no interactions have been performed yet
// WHEN the "getState" method is run
// AND the result is logged to the console
// AND the browser console is open
// THEN the state should show a count of 0
console.log(counterValue); // Output: 0

const store = createTallyStore();

store.subscribe(() => {
  const state = store.getState();
  counterValue = state.count;
  updateCounterValue();
});
// Scenario 2: Increment the counter by one
// GIVEN no interactions have been performed yet
// WHEN an "ADD" action is dispatched
// AND another "ADD" action is dispatched
// AND the browser console is open
// THEN the state should show a count of 2
store.dispatch(addAction());
store.dispatch(addAction());
console.log(store.getState()); // Output: { count: 2 }

// Scenario 3: Increment the counter by one
// GIVEN the current count in the state is 2
// WHEN a "SUBTRACT" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 1
store.dispatch(subtractAction());
console.log(store.getState()); // Output: { count: 1 }


// Scenario 4: Resetting the Tally Counter
// GIVEN the current count in the state is 1
// WHEN a "RESET" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 0
store.dispatch(resetAction());
console.log(store.getState()); // Output: { count: 0 }