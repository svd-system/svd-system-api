const { Op } = require('sequelize');
const { Vaccine } = require('../models');

/**
 * Criar vacina.
 */
exports.create = (req, res) => {
  Vaccine.create(req.body)
    .then((vaccine) => {
      res.status(201).send(vaccine);
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message,
      });
    });
};

const buildFilter = (queryParams) => {
  const { query, active } = queryParams;
  let where = {};
  if (query) {
    const or = [];
    ['serialNumber', 'label'].forEach((field) => {
      or.push({
        [field]: {
          [Op.iLike]: `%${query}%`,
        },
      });
    });

    where = {
      [Op.or]: or,
    };
  }

  if (active) {
    where.active = {
      [Op.eq]: active,
    };
  }

  return where;
};

/**
 * Listar todas as vacinas.
 */
exports.list = (req, res) => {
  const { limit, page } = req.query;
  let offset = null;
  if (limit && page) {
    offset = page * limit;
  }

  const where = buildFilter(req.query);
  return Vaccine.findAll({
    limit,
    offset,
    where,
  })
    .then((vaccines) => {
      if (vaccines) {
        res.status(200).send(vaccines);
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
