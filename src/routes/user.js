const router = require('express').Router();
const { userController } = require('../controllers');
const { userValidator, validate } = require('../validators');

router.post('/', userValidator.create(), validate, userController.create);
router.get('/count', userController.count);

module.exports = router;
