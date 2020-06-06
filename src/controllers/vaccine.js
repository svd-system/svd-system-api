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

/**
 * Editar a vacina.
 */
exports.update = (req, res) => {
  const vaccine = req.body;
  return Vaccine.update(
    {
      label: vaccine.label,
      defaultQuantity: vaccine.defaultQuantity,
      active: vaccine.active,
    },
    { returning: true, where: { id: req.params.id } }
  )
    .then(([rows, [updatedVaccine]]) => {
      if (!rows)
        return res.status(404).send({
          message: 'Vaccine not found',
        });

      return res.status(200).send(updatedVaccine);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};

/**
 * Contar total de vacinas de acordo com parâmetros definidos na requisição.
 */
exports.count = (req, res) => {
  return Vaccine.count({
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
