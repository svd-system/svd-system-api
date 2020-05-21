const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
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

/**
 * Listar todos os pacientes.
 */
exports.list = (req, res) => {
  const { limit, page, excludeId, activeOnly } = req.query;
  let offset = null;
  if (limit && page) {
    offset = page * limit;
  }

  const where = {};
  if (excludeId || activeOnly) {
    if (excludeId) {
      where.id = {
        [Op.not]: [excludeId],
      };
    }

    if (activeOnly && activeOnly === 'true') {
      where.active = {
        [Op.eq]: true,
      };
    }
  }

  return User.findAll({
    limit,
    offset,
    where,
  })
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      } else {
        res.status(404).send([]);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};

/**
 * Consultar usuário por id.
 */
exports.get = (req, res) => {
  return User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};

/**
 * Contar total de usuários de acordo com parâmetros definidos na requisição.
 */
exports.count = (req, res) => {
  return User.count({
    where: req.query,
  })
    .then((count) => {
      res.status(200).send({ count });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};
