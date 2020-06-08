const { Op } = require('sequelize');
const { Newsfeed } = require('../models');

/**
 * Criar vacina.
 */
exports.create = (req, res) => {
  Newsfeed.create(req.body)
    .then((newsfeed) => {
      res.status(201).send(newsfeed);
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
    ['title'].forEach((field) => {
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
  return Newsfeed.findAll({
    limit,
    offset,
    where,
  })
    .then((newsfeed) => {
      if (newsfeed) {
        res.status(200).send(newsfeed);
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
 * Consultar vacina por id.
 */
exports.get = (req, res) => {
  return Newsfeed.findByPk(req.params.id)
    .then((newsfeed) => {
      if (newsfeed) {
        res.status(200).send(newsfeed);
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
 * Editar a vacina.
 */
exports.update = (req, res) => {
  const Newsfeed = req.body;
  return Newsfeed.update(
    {
      title: newsfeed.title,
      description: newsfeed.description,
      link: newsfeed.link,
      icon: newsfeed.icon,
    },
    { returning: true, where: { id: req.params.id } }
  )
    .then(([rows, [updatedNewsfeed]]) => {
      if (!rows)
        return res.status(404).send({
          message: 'Vaccine not found',
        });

      return res.status(200).send(updatedNewsfeed);
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
  return Newsfeed.count({
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