const router = require('express').Router();
const { loginController } = require('../controllers');
const { loginValidator, validate } = require('../validators');

router.post('/', loginValidator.login(), validate, loginController.login);

module.exports = router;
