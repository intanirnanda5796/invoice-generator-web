import { body, param } from 'express-validator';

class UserValidation {
  static login = [
    body('email').exists().withMessage('email must be exist').notEmpty()
      .withMessage('email must be not empty')
      .isEmail()
      .withMessage('email must be format email'),
    body('password').exists().withMessage('password must be exist').notEmpty()
      .withMessage('password must be not empty'),
  ];

  static create = [
    body('email').exists().withMessage('email must be exist').notEmpty()
      .withMessage('email must be not empty')
      .isEmail()
      .withMessage('email must be format email'),
    body('password').exists().withMessage('password must be exist').notEmpty()
      .withMessage('password must be not empty')
      .isLength({ min: 4 })
      .withMessage('password length min 4'),
    body('fullname').exists().withMessage('fullname must be exist').notEmpty()
      .withMessage('fullname must be not empty'),
    body('phoneNumber').exists().withMessage('phone number must be exist').notEmpty()
      .withMessage('phone number must be not empty')
      .isMobilePhone()
      .withMessage('phone number must be phone number format'),
    body('role').exists().withMessage('role must be exist').notEmpty()
      .withMessage('role must be not empty')
      .isString()
      .withMessage('role must be string'),
  ];

  static delete = [
    param('id').exists().withMessage('param id must be exist').notEmpty()
      .withMessage('param id must be not empty')
      .isUUID()
      .withMessage('param id must be UUID format'),
  ];
}

export default UserValidation;
