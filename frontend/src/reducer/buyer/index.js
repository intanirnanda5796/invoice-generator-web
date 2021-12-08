import { BUYER_LIST_INVOICE, BUYER_DETAIL_INVOICE } from "types";

const initialState = {
    data: [],
    detail: null
};

const buyerReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUYER_LIST_INVOICE:
            return { data: action.payload };
        case BUYER_DETAIL_INVOICE:
            return { detail: action.payload };
        default:
            return state;
    }
}

export default buyerReducer;
