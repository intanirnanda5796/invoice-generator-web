import {
  SELLER_CREATE_INVOICE,
  SELLER_DELETE_INVOICE,
  SELLER_LIST_INVOICE,
  SELLER_LIST_BUYER,
} from "types";

const initialState = {
    data: [],
};

const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_CREATE_INVOICE:
            return { data: [...state.data, action.payload] };
        case SELLER_LIST_INVOICE:
            return { data: action.payload };
        case SELLER_LIST_BUYER:
            return { data: action.payload };
        case SELLER_DELETE_INVOICE:
            return state.data.filter((id) => id !== action.payload.id);
        default:
            return state;
    }
}

export default sellerReducer;
