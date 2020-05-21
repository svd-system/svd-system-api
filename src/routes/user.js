const router = require('express').Router();
const { userController } = require('../controllers');
const { userValidator, validate } = require('../validators');
const { securityService } = require('../security');

router.post('/', userValidator.create(), validate, userController.create);
router.get('/', securityService.authenticate, userController.list);
router.get('/count', userController.count);
router.get('/:id', securityService.authenticate, userController.get);

module.exports = router;
