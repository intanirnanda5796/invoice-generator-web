import BaseService from "services";

const sellerCreateInvoice = (userId, product, token) => async (dispatch) => {
  const result = await BaseService.post(
    `${process.env.REACT_APP_BACKEND_URL}/create-invoice`,
    { userId, product },
    token
  );
  dispatch({
    type: "SELLER_CREATE_INVOICE",
    payload: result.data,
  });
};

const sellerListBuyer = (token) => async (dispatch) => {
  const result = await BaseService.get(
    `${process.env.REACT_APP_BACKEND_URL}/list-buyer`,
    {},
    token
  );
  dispatch({
    type: "SELLER_LIST_BUYER",
    payload: result.data,
  });
};

const sellerListInvoice = (token) => async (dispatch) => {
  const result = await BaseService.get(
    `${process.env.REACT_APP_BACKEND_URL}/seller-list-invoice`,
    {},
    token
  );
  dispatch({
    type: "SELLER_LIST_INVOICE",
    payload: result.data,
  });
};

const sellerDeleteInvoice = (id, token) => async (dispatch) => {
  await BaseService.delete(
    `${process.env.REACT_APP_BACKEND_URL}/delete-invoice`,
    id,
    token
  );
  dispatch({
    type: "SELLER_DELETE_INVOICE",
    payload: { id },
  });
};

export {
  sellerCreateInvoice,
  sellerListBuyer,
  sellerListInvoice,
  sellerDeleteInvoice,
};
