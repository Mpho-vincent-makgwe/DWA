//reducers.js',
/**
 * Increases the value of the count by one
 * 
 * @typedef {object} AddAction
 * @prop {'ADD_BUTTON'} type
 * @prop {Task} ADD
 */


export const addAction = () => ({ type: 'ADD' });

/**
 * the count it's self will change by the given new count
 * 
 * @typedef {object} GetStateAction
 * @prop {'GET_STATE'} type
 * @prop {Count} getState
 */
export const getStateAction = () => ({ type: 'GET_STATE' });

/**
 * 
 * Decreases the value of the count by one
 * 
 * @typedef {object} SubtractAction 
 * @prop {'SUBTRACT'} type
 */
export const subtractAction = () => ({ type: 'SUBTRACT' });
/**
 * resets the counter to the initial value
 * 
 * @typedef {object} ResetAction
 * @prop {'RESET'} type
 */

export const resetAction = () => ({ type: 'RESET' });



