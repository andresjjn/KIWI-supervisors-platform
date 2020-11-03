import { createStore } from 'redux';

const initialState = {
    isLoaded: false,
    isAdmin: false,
    userId: "",
    supervisors: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SetIsLoaded":
            state = { ...state, isLoaded: action.setLoaded }
            break;
        case "SetIsAdmin":
            state = { ...state, isAdmin: action.setAdmin }
            break;
        case "SetUserId":
            state = { ...state, userId: action.setUserId }
            break;
        case "SetSupervisors":
            state = { ...state, supervisors: action.supervisors }
            break;
        default:
            break;
    }

    return state;
}

export default createStore(reducer);
