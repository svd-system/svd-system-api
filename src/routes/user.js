const router = require('express').Router();
const { userController } = require('../controllers/index');

router.post('/', userController.create);
router.get('/count', userController.count);

module.exports = router;
