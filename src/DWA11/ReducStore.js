/**
 * @typedef {object} Task 
 * @prop {string} id
 * @prop {string} title
 * @prop {Date} created
 */
/**
 * @typedef {'A-Z' | 'Z-A'} sorting
 */

/**
 * @typedef {object} Filter
 * @prop {'A-Z' | 'Z-A'} sorting
 */

/**
 * @typedef {object} State
 * @prop {'subtracting' | 'adding'} phase
 * @prop {Record<string, Task>} tasks
 * @prop {Filter} filters
 */

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @typedef {object} Action
 * @prop {string} type
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Subscribe
 * @param {State} prev
 * @param {State} next
 * @returns {EmptyFn}
 */

/**
 * @typedef {object} Store
 * @prop {GetState} getState
 * @prop {Subscribe} subscribe
 * @prop {Dispatch} dispatch
 */

// Define the action types
const GET_STATE = 'GET_STATE';
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

// Define the actions
const getStateAction = () => ({ type: GET_STATE });
const addButtonAction = () => ({ type: ADD });
const subtractButtonAction = () => ({ type: SUBTRACT });
const resetButtonAction = () => ({ type: RESET });

// Define the reducer function
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case GET_STATE:
      return state;

    case ADD:
      return { count: state.count + 1 };

    case SUBTRACT:
      return { count: state.count - 1 };

    case RESET:
      return { count: 0 };

    default:
      return state;
  }
};

// Create the custom store
const createStore = () => {
  let state = reducer(undefined, {}); // Initialize the state
  const listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action); // Update the state based on the action

    // Notify listeners about state changes
    const prevState = state;
    listeners.forEach(listener => listener(prevState, state));
  };

  const subscribe = listener => {
    listeners.push(listener);

    // Return an unsubscribe function
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

// Create the store
const store = createStore();

// Scenario 1: Increment the counter by one
// GIVEN no interactions have been performed yet
// WHEN the "getState" method is run
// AND the result is logged to the console
// AND the browser console is open
// THEN the state should show a count of 0

console.log(store.getState()); // Output: { count: 0 }

// Scenario 2: Increment the counter by one
// GIVEN no interactions have been performed yet
// WHEN an "ADD" action is dispatched
// AND another "ADD" action is dispatched
// AND the browser console is open
// THEN the state should show a count of 2

store.dispatch(addButtonAction());
store.dispatch(addButtonAction());
console.log(store.getState()); // Output: { count: 2 }

// Scenario 3: Increment the counter by one
// GIVEN the current count in the state is 2
// WHEN a "SUBTRACT" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 1

store.dispatch(subtractButtonAction());
console.log(store.getState()); // Output: { count: 1 }

// Scenario 4: Resetting the Tally Counter
// GIVEN the current count in the state is 1
// WHEN a "RESET" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 0

store.dispatch(resetButtonAction());
console.log(store.getState()); // Output: { count: 0 }
