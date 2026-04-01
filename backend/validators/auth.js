const { body } = require('express-validator');

exports.registerValidator = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

exports.loginValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];
