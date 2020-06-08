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

module.exports = router;
