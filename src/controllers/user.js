const bcrypt = require('bcrypt');
const { User } = require('../models');

const SALT_RANDS = 12;

/**
 * Criar usuário do sistema.
 */
exports.create = (req, res) => {
  // Encriptar senha do usuário
  const newUser = req.body;
  bcrypt
    .hash(newUser.password, SALT_RANDS)
    .then((encoded) => {
      // Atribui a senha encriptada ao usuário e persiste no banco.
      newUser.password = encoded;
      return User.create(newUser);
    })
    .then((user) => {
      res.status(201).send(user.toJSON());
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message,
      });
    });
};
