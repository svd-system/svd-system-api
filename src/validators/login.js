const { body } = require('express-validator');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

const login = () => {
  return [
    body('cpf').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('password').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),
  ];
};

module.exports = {
  login,
};
