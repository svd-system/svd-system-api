const router = require('express').Router();
const { userController } = require('../controllers/index');

router.post('/', userController.create);

module.exports = router;
