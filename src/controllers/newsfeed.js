const { Sequelize, Op } = require('sequelize');
const { Newsfeed } = require('../models');

/**
 * Criar post.
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

/**
 * Listar todas os posts.
 */
exports.list = (req, res) => {
  const { limit, page } = req.query;
  let offset = null;
  if (limit && page) {
    offset = page * limit;
  }

  return Newsfeed.findAll({
    limit,
    offset,
    where: {
      expiresAt: {
        [Op.or]: [{ [Op.gte]: Sequelize.fn('NOW') }, { [Op.eq]: null }],
      },
    },
    order: [['createdAt', 'DESC']],
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
