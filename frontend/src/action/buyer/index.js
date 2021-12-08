import BaseService from "services";

const buyerListInvoice = (token) => async (dispatch) => {
  const result = await BaseService.get(
    `${process.env.REACT_APP_BACKEND_URL}/list-invoice`,
    {},
    token
  );
  dispatch({
    type: "BUYER_LIST_INVOICE",
    payload: result.data,
  });
};

const buyerDetailInvoice = (id, token) => async (dispatch) => {
  const result = await BaseService.getById(
    `${process.env.REACT_APP_BACKEND_URL}/show-invoice`,
    id,
    {},
    token
  );
  dispatch({
    type: "BUYER_DETAIL_INVOICE",
    payload: result.data,
  });
};

export { buyerListInvoice, buyerDetailInvoice };
