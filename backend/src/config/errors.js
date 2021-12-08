const attribute = {
  EMAIL: ':email',
  ID: ':id',
};

const ERRORS = {
  EMAIL_NOT_EXIST: `user email with ${attribute.EMAIL} does not exist`,
  WRONG_PASSWORD: 'please check again your password',
  USER_NOT_EXIST: `user with id ${attribute.ID} does not exist`,
  INVOICE_NOT_EXIST: `invoice with id ${attribute.ID} does not exist`,
};

export default ERRORS;
