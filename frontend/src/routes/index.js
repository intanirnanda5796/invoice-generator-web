const PARAMS = {
    ID: ':id'
}

export const USERROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    BUYER_DASHBOARD: '/buyer/dashboard',
    BUYER_DETAIL_INVOICE: `/buyer/detail-invoice/${PARAMS.ID}`,
    SELLER_CREATEPAYMENT: '/seller/createpayment',
    SELLER_LIST_INVOICE: '/seller/list-invoice',
    SELLER_DASHBOARD: '/seller/dashboard',
    BUYER_INVOICE: '/buyer/invoice',
    ADMIN_LIST_USER: '/admin/list-user',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_CREATE_USER: '/admin/create-user',
    NOTFOUND: '/notfound',
}