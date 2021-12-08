import { LOGIN_SUCCESSFULL, LOGIN_FAILURE } from "types";

const initialState = {
    data: null,
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESSFULL:
            return { data: action.payload };
        case LOGIN_FAILURE:
            return { error: action.payload };
        default:
            return state
    }
}

export default loginReducer;