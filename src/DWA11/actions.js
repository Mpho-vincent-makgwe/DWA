import {Task, Count}from "./store.js"

const counterValueInput = document.querySelector(".counter__value");
function updateCounterValue() {
    counterValueInput.value = counterValue;
}
console.log('helloworld');
let counterValue = 0;

/**
 * Increases the value of the count by one
 * 
 * @typedef {object} AddButton
 * @prop {'ADD_BUTTON'} type
 * @prop {Task} task
 */
export const addButton = (AddValue, counterValue) => {
    
    
    counterValue++;
    console.log(counterValue);
    updateCounterValue();
    if(counterValue >= 51){
        counterValue = 0;
        updateCounterValue();
        alert("You've reached maximum value.");
    }
return{
        type:"ADD_A_VALUE",
        payload: {
            name: AddValue,
            number: counterValue,
        }

    }

};

/**
 * the count it's self will change by the given new count
 * 
 * @typedef {object} ChangeCounter
 * @prop {'CHANGE_COUNTER'} type
 * @prop {Count} count
 */


/**
 * 
 * Decreases the value of the count by one
 * 
 * @typedef {object} SubButton
 * @prop {'SUBTRACT_BUTTON'} type
 */
export const subtractButton = (SubValue, counterValue ) => {
    if (counterValue > 0) {
        counterValue--;
        console.log(counterValue);
        updateCounterValue();
    }
    return{
        type:"SUB_A_VALUE",
        payload: {
            name: SubValue,
            number: counterValue,
        }

    }
};
/**
 * resets the counter to the initial value
 * 
 * @typedef {object} ResetButton
 * @prop {'RESET_BUTTON'} type
 */
export const resetButton = (ResetValue, counterValue ) => {
    counterValue = 0;
    updateCounterValue();
    alert("Counter has been reset.");
    return{
        type:"RESET_A_VALUE",
        payload: {
            name: ResetValue,
            number: counterValue,
        }
    }
};

