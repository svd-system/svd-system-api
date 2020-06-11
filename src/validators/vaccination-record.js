const { body } = require('express-validator');
const { User, Vaccine } = require('../models');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
const NUMERIC_ONLY_ERROR_MSG = 'Apenas valores numéricos são permitidos';

const create = () => {
  return [
    body('vaccineId')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .bail()
      .custom((value) => {
        return Vaccine.findOne({
          where: {
            id: value,
            active: true,
          },
        }).then((vaccine) => {
          if (!vaccine) {
            throw new Error('A vacina informada não existe');
          }
        });
      }),

    body('patientId')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .bail()
      .custom((value) => {
        return User.findOne({
          where: {
            id: value,
            active: true,
          },
        }).then((user) => {
          if (!user) {
            throw new Error('O paciente informado não existe');
          }
        });
      }),

    body('providerId')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .bail()
      .custom((value) => {
        return User.findOne({
          where: {
            id: value,
            role: 'COLABORADOR',
            active: true,
          },
        }).then((user) => {
          if (!user) {
            throw new Error('O colaborador informado não existe');
          }
        });
      }),

    body('quantity')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .isDecimal()
      .withMessage(NUMERIC_ONLY_ERROR_MSG),
  ];
};

module.exports = {
  create,
};
