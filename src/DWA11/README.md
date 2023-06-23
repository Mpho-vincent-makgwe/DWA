# Tally Count

Tally Count is a simple web application that allows you to increment, decrement, and reset a counter. It's built using JavaScript and demonstrates the usage of a custom store and actions for managing the state.

## Features

- Increment the counter by one.
- Decrement the counter by one.
- Reset the counter to zero.
- Display the current counter value.

### Getting Started

## Usage

- Click the "+" button to increment the counter by one.
- Click the "-" button to decrement the counter by one.
- Click the "C" button to reset the counter to zero.
- The current counter value is displayed in the input field.

## Custom Store

The Tally Count application uses a custom store implementation to manage the state. The store provides the following methods:

- **getState():** Returns the current state.

- **subscribe(listener):** Registers a listener function to be called whenever the state changes.
- **dispatch(action):** Dispatches an action to update the state.
The actions supported by the Tally Count application are:

- **addAction():** Increments the counter by one.
- **subtractAction():** Decrements the counter by one.
- **resetAction():** Resets the counter to zero.
The state is managed by a reducer function, which handles the different action types and updates the state accordingly.
