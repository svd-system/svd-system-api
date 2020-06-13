const router = require('express').Router();
const { vaccinationRecordController } = require('../controllers');
const { vaccinationRecordValidator, validate } = require('../validators');
const { securityService } = require('../security');

router.post(
  '/',
  securityService.authenticate,
  vaccinationRecordValidator.create(),
  validate,
  vaccinationRecordController.create
);

module.exports = router;
