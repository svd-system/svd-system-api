const router = require('express').Router();
const { vaccineController } = require('../controllers');
const { vaccineValidator, validate } = require('../validators');
const { securityService } = require('../security');

router.post(
  '/',
  securityService.authenticate,
  vaccineValidator.create(),
  validate,
  vaccineController.create
);
router.get('/', securityService.authenticate, vaccineController.list);

module.exports = router;
