const { body } = require('express-validator');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
const INVALID_EXPIRATION_DATE_ERROR_MSG =
  'Não é permitida data anterior a hoje';
const INVALID_FORMAT_ERROR_MSG = 'Formato inválido';

const checkIfPresentOrFuture = (value) => {
  const expirationDate = new Date(value);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return expirationDate >= today;
};

const create = () => {
  return [
    body('title').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('description').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('expiresAt')
      .if((value) => value)
      .isISO8601()
      .withMessage(INVALID_FORMAT_ERROR_MSG)
      .custom((value) => checkIfPresentOrFuture(value))
      .withMessage(INVALID_EXPIRATION_DATE_ERROR_MSG),
  ];
};

module.exports = {
  create,
};
