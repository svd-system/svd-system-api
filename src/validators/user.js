const { body } = require('express-validator');
const { User } = require('../models');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
const INVALID_FORMAT_ERROR_MSG = 'Formato inválido';
const NUMERIC_ONLY_ERROR_MSG = 'Apenas valores numéricos são permitidos';
const INVALID_LENGTH_ERROR_MSG = 'O campo deve possuir {0} dígitos';
const INVALID_MINLENGTH_ERROR_MSG =
  'O campo deve possuir no mínimo {0} dígitos';
const INVALID_BIRTH_DATE_ERROR_MSG = 'Não é permitida data posterior a hoje';
const CHECK_UNIQUE_ERROR_MSG = 'O {0} informado já está em uso';

const CPF_LENGTH = 11;
const CEP_LENGTH = 8;
const STATE_LENGTH = 2;
const PASSWORD_MINLENGTH = 8;

const checkUnique = (query, message) => {
  return User.findOne({
    where: query,
  }).then((user) => {
    if (user) {
      throw new Error(message);
    }
  });
};

const checkBirthDate = (value) => {
  const birthDate = new Date(value);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return birthDate <= today;
};

const create = () => {
  return [
    body('firstName').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('lastName').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('cpf')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isDecimal()
      .withMessage(NUMERIC_ONLY_ERROR_MSG)
      .isLength({ min: CPF_LENGTH, max: CPF_LENGTH })
      .withMessage(INVALID_LENGTH_ERROR_MSG.replace('{0}', CPF_LENGTH))
      .bail()
      .custom((value) =>
        checkUnique(
          { cpf: value },
          CHECK_UNIQUE_ERROR_MSG.replace('{0}', 'CPF')
        )
      ),

    body('birthDate')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isISO8601()
      .withMessage(INVALID_FORMAT_ERROR_MSG)
      .custom((value) => checkBirthDate(value))
      .withMessage(INVALID_BIRTH_DATE_ERROR_MSG),

    body('phoneNumber')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isDecimal()
      .withMessage(NUMERIC_ONLY_ERROR_MSG),

    body('email')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isEmail()
      .withMessage(INVALID_FORMAT_ERROR_MSG)
      .bail()
      .custom((value) =>
        checkUnique(
          { email: value },
          CHECK_UNIQUE_ERROR_MSG.replace('{0}', 'email')
        )
      ),

    body('cep')
      .if((value) => value)
      .isDecimal()
      .withMessage(NUMERIC_ONLY_ERROR_MSG)
      .isLength({ min: CEP_LENGTH, max: CEP_LENGTH })
      .withMessage(INVALID_LENGTH_ERROR_MSG.replace('{0}', CEP_LENGTH)),

    body('city').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('state')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isLength({ min: STATE_LENGTH, max: STATE_LENGTH })
      .withMessage(INVALID_LENGTH_ERROR_MSG.replace('{0}', STATE_LENGTH)),

    body('password')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isLength({ min: PASSWORD_MINLENGTH })
      .withMessage(
        INVALID_MINLENGTH_ERROR_MSG.replace('{0}', PASSWORD_MINLENGTH)
      ),
  ];
};

module.exports = {
  create,
};
