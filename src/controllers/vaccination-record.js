const { VaccinationRecord } = require('../models');

/**
 * Criar vacina.
 */
exports.create = (req, res) => {
  const vaccination = req.body;
  vaccination.patientId = req.params.userId;
  VaccinationRecord.create(vaccination)
    .then((record) => {
      res.status(201).send(record);
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message,
      });
    });
};
