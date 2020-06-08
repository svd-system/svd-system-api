const { body } = require('express-validator');
const { Vaccine } = require('../models');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
const CHECK_UNIQUE_ERROR_MSG = 'O {0} informado já está em uso';

const checkUnique = (query, message) => {
  return Vaccine.findOne({
    where: query,
  }).then((user) => {
    if (user) {
      throw new Error(message);
    }
  });
};

const create = () => {
  return [
    body('serialNumber')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .bail()
      .custom((value) =>
        checkUnique(
          { serialNumber: value },
          CHECK_UNIQUE_ERROR_MSG.replace('{0}', 'Número de série')
        )
      ),

    body('label').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),
  ];
};

const update = () => {
  return [
    body('label').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('defaultQuantity').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('active').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),
  ];
};

module.exports = {
  create,
  update,
};