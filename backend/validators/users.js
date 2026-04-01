const { body } = require('express-validator');

exports.userUpdateValidator = [
  body('name', 'Name is required').optional().notEmpty(),
  body('email', 'Please include a valid email').optional().isEmail(),
  body('role', 'Role must be admin or user').optional().isIn(['admin', 'user']),
  body('isActive', 'isActive must be a boolean').optional().isBoolean()
];
