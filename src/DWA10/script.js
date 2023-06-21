
import './component.js';
const counterValueInput = document.querySelector(".counter__value");
const addButton = document.querySelector('[data-key="add"]');
const subtractButton = document.querySelector('[data-key="subtract"]');
const resetButton = document.querySelector('[data-key="reset"]');

let counterValue = 0;

function updateCounterValue() {
    counterValueInput.value = counterValue;
}

addButton.addEventListener("click", () => {
    counterValue++;
    updateCounterValue();
    if(counterValue >= 51){
        counterValue = 0;
        updateCounterValue();
        alert("You've reached maximum value.");
    }
});

subtractButton.addEventListener("click", () => {
    if (counterValue > 0) {
        counterValue--;
        updateCounterValue();
    }
});

resetButton.addEventListener("click", () => {
    counterValue = 0;
    updateCounterValue();
    alert("Counter has been reset.");
});
