const jwt = require('jsonwebtoken');
const fs = require('file-system');
const { HttpError } = require('../errors');
const constants = require('./constants');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new HttpError('Authorization', 'Campo obrigatório');
    }

    const token = authorization.substring(7);
    const publicKey = fs.readFileSync('./.public.key', 'utf8');
    jwt.verify(
      token,
      publicKey,
      { algorithm: [constants.TOKEN_ALGORITHM] },
      (err) => {
        if (err) {
          throw new HttpError('Authorization', 'Token inválido');
        }

        next();
      }
    );
  } catch (err) {
    if (err instanceof HttpError) {
      const errors = [{ [err.param]: err.message }];
      return res.status(401).send({ errors });
    }

    throw err;
  }
};

module.exports = {
  authenticate,
};
