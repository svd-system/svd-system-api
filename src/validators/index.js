const { validationResult } = require('express-validator');
const userValidator = require('./user');
const loginValidator = require('./login');
const vaccineValidator = require('./vaccine');
const vaccinationRecordValidator = require('./vaccination-record');
const newsfeedValidator = require('./newsfeed');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().forEach((err) => {
    extractedErrors.push({
      property: err.param,
      message: err.msg,
    });
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validate,
  userValidator,
  loginValidator,
  vaccineValidator,
  vaccinationRecordValidator,
  newsfeedValidator,
};
