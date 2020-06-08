const router = require('express').Router();
const { newsfeedController } = require('../controllers');
const { newsfeedValidator, validate } = require('../validators');
const { securityService } = require('../security');

router.post(
  '/',
  securityService.authenticate,
  newsfeedValidator.create(),
  validate,
  newsfeedController.create
);
router.get('/', securityService.authenticate, newsfeedController.list);
router.get('/count', securityService.authenticate, newsfeedController.count);
router.get('/:id', securityService.authenticate, newsfeedController.get);
router.put(
  '/:id',
  newsfeedValidator.update(),
  validate,
  securityService.authenticate,
  newsfeedController.update
);

module.exports = router;