//store.js',
export const createStore = () => {
let state = { count: 0 };
const listeners = [];

const getState = () => state;

const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
};

const subscribe = listener => {
    listeners.push(listener);
    return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
    };
};

return {
    getState,
    dispatch,
    subscribe,
};
};


