import { createStore } from 'redux';

const initialState = {
    isLoaded: false,
    isAdmin: false
}

const reducer = (state = initialState, action) => {
    // console.log(action);
    if (action.type === "SetIsLoaded") {
        return {
            ...state,
            isLoaded: action.setLoaded,
            isAdmin: action.setAdmin,
        }
    }
    return state;
} 

export default createStore(reducer);
