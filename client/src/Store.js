import { createStore } from 'redux';

const initialState = {
    isLoaded: false,
    isAdmin: false,
    userId: ""
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

    if (action.type === "SetUserId") {
        return {
            ...state,
            userId: action.setUserId,
        }
    }

    return state;
} 

export default createStore(reducer);
