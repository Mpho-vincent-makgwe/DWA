//reducers.js',
export const reducer = (state = { count: 0 }, action) => {
    const actionHandlers = {
    GET_STATE: () => state,
    ADD: () => ({ count: state.count + 1 }),
    SUBTRACT: () => ({ count: state.count - 1 }),
    RESET: () => ({ count: 0 }),
};

const actionHandler = actionHandlers[action.type];

return actionHandler ? actionHandler() : state;
};

// const reservationHistory = (oldCounterValue = [], action) => {
// if(action.type === "ADD_A_VALUE"){
//     console.log(counterValue);
//     return [...oldCounterValue, action.payload];
// }else if (action.type === "SUB_A_VALUE"){
//     return oldCounterValue.filter(record => {return record !== action.payload.name;
//     })
// }
// };


// export const reducer = (state = { count: 0 }, action) => {
//     switch (action.type) {
//       case 'ADD':
//         return { count: state.count + 1 };
//       case 'SUBTRACT':
//         return { count: state.count - 1 };
//       case 'RESET':
//         return { count: 0 };
//       default:
//         return state;
//     }
//   };


