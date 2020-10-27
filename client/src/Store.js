import { createStore } from 'redux';

const initialState = {
    isLoaded: false,
    isAdmin: false
}

const reducer = (state = initialState, action) => {
    if (action.type === "SetIsLoaded") {
        return {
            ...state,
            isLoaded: action.setLoaded,
        }
    }

    if (action.type === "SetIsAdmin") {
        return {
            ...state,
            isAdmin: action.setAdmin,
        }
    }

    return state;
} 

export default createStore(reducer);
