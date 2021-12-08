import { body, param } from 'express-validator';

class InvoiceValidation {
  static create = [
    body('userId').exists().withMessage('user id must be exist').notEmpty()
      .withMessage('user id must be not empty')
      .isUUID()
      .withMessage('user id must be UUID format'),
    body('product').exists().withMessage('product must be exist').notEmpty()
      .withMessage('product must be not empty')
      .isArray()
      .withMessage('product must be array format'),
  ];

  static show = [
    param('id').exists().withMessage('param id must be exist').notEmpty()
      .withMessage('param id must not empty')
      .isUUID()
      .withMessage('param id must be UUID format'),
  ];
}

export default InvoiceValidation;
