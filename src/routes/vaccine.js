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
router.put(
  '/:id',
  vaccineValidator.update(),
  validate,
  securityService.authenticate,
  vaccineController.update
);

module.exports = router;
