const { Op, Sequelize } = require('sequelize');
const { VaccinationRecord, Vaccine, User } = require('../models');
const { HttpError } = require('../errors');

/**
 * Criar vacina.
 */
exports.create = (req, res) => {
  const errors = [];
  const vaccination = req.body;
  User.findByPk(vaccination.providerId)
    .then((provider) => {
      if (!provider) {
        throw new HttpError('cpf', 'CPF não cadastrado');
      }

      VaccinationRecord.create(vaccination)
        .then((record) => {
          res.status(201).send(record);
        })
        .catch((err) => {
          res.status(400).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      errors.push({
        property: err.param,
        message: err.message,
      });
      return res.status(404).send({ errors });
    });
};

const buildFilter = (req) => {
  const { query, params } = req;
  // Filtrar pelo código do paciente.
  const and = [
    {
      patientId: params.id,
    },
  ];

  if (query) {
    // Filtrar por data
    const { from, to, q } = query;
    if (from && to) {
      and.push({
        createdAt: {
          [Op.between]: [from, to],
        },
      });
    } else if (from) {
      and.push({
        createdAt: {
          [Op.gte]: from,
        },
      });
    } else if (to) {
      and.push({
        createdAt: {
          [Op.lte]: to,
        },
      });
    }

    // Filtrar pelo termo de pesquisa
    if (q) {
      const or = [];
      [
        '"OBSERVACAO"',
        '"vaccine"."DESCRICAO"',
        '"provider"."NOME"',
        '"provider"."SOBRENOME"',
      ].forEach((field) => {
        or.push(Sequelize.literal(`Upper(${field}) like Upper('%${q}%')`));
      });

      and.push({
        [Op.or]: or,
      });
    }
  }

  return {
    [Op.and]: and,
  };
};

exports.listByPatient = (req, res) => {
  const { limit, page } = req.query;
  let offset = null;
  if (limit && page) {
    offset = page * limit;
  }

  const where = buildFilter(req);
  const attributes = ['id', 'firstName', 'lastName'];
  return VaccinationRecord.findAll({
    limit,
    offset,
    where,
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
    order: [['createdAt', 'DESC']],
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
