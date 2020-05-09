const bcrypt = require('bcrypt');
const { User } = require('../models');
const { HttpError } = require('../errors');
const { securityUtils } = require('../security');

exports.login = (req, res) => {
  const errors = [];
  User.findOne({
    where: { cpf: req.body.cpf },
  })
    .then((user) => {
      if (!user) {
        throw new HttpError('cpf', 'CPF não cadastrado');
      }

      bcrypt.compare(req.body.password, user.password, (error, same) => {
        if (same) {
          const token = securityUtils.generateToken(user.id);
          const expiration = securityUtils.getExpiration();
          return res.status(200).send({
            auth: same,
            token,
            expiration,
            user: `/api/users/${user.id}`,
          });
        }

        errors.push({ password: 'Senha incorreta' });
        return res.status(409).send({ errors });
      });
    })
    .catch((err) => {
      errors.push({ [err.param]: err.message });
      return res.status(404).send({ errors });
    });
};
