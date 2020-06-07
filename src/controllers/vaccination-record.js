const { VaccinationRecord, Vaccine, User } = require('../models');

/**
 * Criar vacina.
 */
exports.create = (req, res) => {
  VaccinationRecord.create(req.body)
    .then((record) => {
      res.status(201).send(record);
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message,
      });
    });
};

exports.listByPatient = (req, res) => {
  const attributes = ['id', 'firstName', 'lastName'];
  return VaccinationRecord.findAll({
    where: {
      patientId: req.params.id,
    },
    include: [
      {
        model: Vaccine,
        as: 'vaccine',
        attributes: ['id', 'serialNumber', 'label'],
      },
      { model: User, as: 'patient', attributes },
      {
        model: User,
        as: 'provider',
        attributes,
      },
    ],
  })
    .then((vaccinations) => {
      if (vaccinations) {
        res.status(200).send(vaccinations);
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
