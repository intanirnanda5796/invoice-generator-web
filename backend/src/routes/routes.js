const ROUTE_PARAMS = {
  ID: ':id',
};

const API_ROUTES = {
  ROOT: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  CREATE_USER: '/create-user',
  LIST_USER: '/list-user',
  LIST_BUYER: '/list-buyer',
  DELETE_USER: `/delete-user/${ROUTE_PARAMS.ID}`,
  CREATE_INVOICE: '/create-invoice',
  LIST_INVOICE: '/list-invoice',
  SHOW_INVOICE: `/show-invoice/${ROUTE_PARAMS.ID}`,
  LIST_SELLER_INVOICE: '/seller-list-invoice',
  DELETE_INVOICE: `/delete-invoice/${ROUTE_PARAMS.ID}`,
};

export default API_ROUTES;
