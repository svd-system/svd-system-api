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
