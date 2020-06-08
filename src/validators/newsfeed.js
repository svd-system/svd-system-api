const { body } = require('express-validator');
const { Newsfeed } = require('../models');

const REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
const CHECK_UNIQUE_ERROR_MSG = 'O {0} informado já está em uso';

const checkUnique = (query, message) => {
  return Newsfeed.findOne({
    where: query,
  }).then((user) => {
    if (user) {
      throw new Error(message);
    }
  });
};

const create = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage(REQUIRED_FIELD_ERROR_MSG)
      .bail()
      .custom((value) =>
        checkUnique(
          { serialNumber: value },
          CHECK_UNIQUE_ERROR_MSG.replace('{0}', 'Número de série')
        )
      ),

    body('description').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),
  ];
};

const update = () => {
  return [
    body('title').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('description').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('link').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),

    body('active').notEmpty().withMessage(REQUIRED_FIELD_ERROR_MSG),
  ];
};

module.exports = {
  create,
  update,
};