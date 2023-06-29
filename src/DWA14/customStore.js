// customStore.js',


import './actions.js'
import './store.js'
import {reducer} from './reducers.js'
// 



export const createTallyStore = () => {
	let state = reducer(undefined, {}); // Initialize the state
	const listeners = [];
	
	const getState = () => state;
	
	const dispatch = action => {
		state = reducer(state, action); // Update the state based on the action
		listeners.forEach(listener => listener());
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















/**
//  * @typedef {object} Task 
//  * @prop {string} id
//  * @prop {string} title
//  * @prop {Date} created
//  */

// /**
//  * @typedef {'A-Z' | 'Z-A'} sorting
//  */


// /**
//  * @typedef {object} Filters
//  * @prop {'A-Z' | 'Z-A'} sorting
//  */



// /**
//  * @typedef {states} 
//  * @prop {'subtracting' | "adding'} phase
//  * @prop {Record<string, task>} tasks
//  * @prop {Filter} filters
//  */

// /**
//  * @callback getState
//  * @returns {state}
//  */




// /**
//  * @callback dispatch
//  * @param {Action} action
//  */


// /**
//  * @callback EmptyFn
//  */
// /**
//  * @callback subscribe
//  * @param {State} prev
//  * @param {State} next
//  * @returns {EmptyFn}
//  */
// /**
//  * @typedef {object} Store
//  * @prop {GetState} getState
//  * @prop {subscribe} subscribe
//  * @prop {Dispatch} dispatch
//  * 
//  */