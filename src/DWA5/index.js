// @ts-check; //
const form = document.querySelector('[data-form="data-form"]');
const result = document.querySelector('[data-result="data-result"]');
/**
* Event listener callback function for the form submission.
*
* @param {Event} event - The submit event object.
*/
form.addEventListener('submit', (event) => {
event.preventDefault();

const entries = new FormData(event.target);
const { dividend, divider } = Object.fromEntries(entries);
const quotient = parseFloat(dividend) / parseFloat(divider);
result.innerText = parseInt(quotient);

// Scenario: Providing anything that is not a number should crash the program
if (isNaN(dividend) || isNaN(divider)) {
    document.body.innerHTML = `<h1 class="errorScreen">'Something critical went wrong. Please reload the page'</h1>`;
    console.error('Invalid input provided');
setTimeout(() => {
    alert('Please input numbers');
    window.location.reload()
}, 2000);

return;
}
// Scenario: An invalid division should log an error in the console
if (divider <= 0) {
        // Scenario: Validation when values are missing
if (divider === '' || dividend === '') {
result.innerText = 'Division not performed. Both values are required in inputs. Try again';
setTimeout(() => {
    alert('Both values are required in inputs');
}, 1000);
refresh();
return;
};

result.innerText = 'Division not performed. Invalid number provided. Try again';
setTimeout(() => {
console.error('Invalid division by zero');
alert('Invalid division');
}, 1000);
refresh();
return;
}

});
