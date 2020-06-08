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
router.get('/count', securityService.authenticate, vaccineController.count);
router.get('/:id', securityService.authenticate, vaccineController.get);
router.put(
  '/:id',
  vaccineValidator.update(),
  validate,
  securityService.authenticate,
  vaccineController.update
);

module.exports = router;
