import { body } from 'express-validator';

const authValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password is too short').isLength({min: 6, max: 12}),
  body('fullName', 'Full name is too short').isLength({min: 3}),
  body('avatarUrl', 'Invalid Url format').optional().isURL(),
];

export { authValidation };