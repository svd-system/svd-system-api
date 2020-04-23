const jwt = require('jsonwebtoken');
const fs = require('file-system');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { HttpError } = require('../errors');

const TOKEN_EXPIRATION_TIME = 1800;
const TOKEN_ALGORITHM = 'RS256';

const getExpiration = () => {
  const now = new Date();
  return new Date(now.getTime() + TOKEN_EXPIRATION_TIME * 1000);
};

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
          const token = this.genToken(user.id);
          const expiration = getExpiration();
          return res.status(200).send({
            auth: same,
            token,
            expiration,
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

exports.genToken = (id) => {
  const privateKey = fs.readFileSync('./.private.key', 'utf8');
  const token = jwt.sign({ id }, privateKey, {
    expiresIn: TOKEN_EXPIRATION_TIME,
    algorithm: TOKEN_ALGORITHM,
  });

  return `Bearer ${token}`;
};
