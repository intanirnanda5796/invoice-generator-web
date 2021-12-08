import {
    CREATE_USER,
    LIST_USER,
    DELETE_USER,
    CREATE_USER_FAILURE
} from 'types';

const initialState = {
    data: [],
    error: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { data: [...state.data, action.payload] };
        case LIST_USER:
            return { data: action.payload };
        case DELETE_USER:
            return state.data.filter((id) => id !== action.payload.id);
        case CREATE_USER_FAILURE:
            return { error: action.payload };
        default:
            return state
    }
}

export default adminReducer;
