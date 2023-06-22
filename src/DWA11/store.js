/**
 * @typedef {object} Task 
 * @prop {string} id
 * @prop {string} title
 * @prop {Date} created
 */
export const Task = {};
/**
 * @typedef {'A-Z' | 'Z-A'} sorting
 */
export const Count = {};

/**
 * @typedef {object} Filters
 * @prop {'A-Z' | 'Z-A'} sorting
 */


/**
 * @typedef {state}
 * @prop {'subtracting' | "adding'} phase
 * @prop {Record<string, task>} tasks
 * @prop {Filter} filters
 */
/**
 * @callback getState
 * @returns {state}
 */
/**
 * @callback dispatch
 * @param {Action} action
 */
/**
 * @callback EmptyFn
 */
/**
 * @callback subscribe
 * @param {State} prev
 * @param {State} next
 * @returns {EmptyFn}
 */
/**
 * @typedef {object} Store
 * @prop {GetState} getState
 * @prop {subscribe} subscribe
 * @prop {Dispatch} dispatch
 * 
 */
export let getStateA = () =>{ 
    console.log("helloworld ");
}
