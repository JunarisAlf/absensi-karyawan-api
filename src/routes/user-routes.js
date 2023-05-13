const userController = require('../controllers/user-controller');
const adminMiddleware = require('../middleware/admin-middleware');

const router = require('express').Router();
router.post('/auth', userController.login)
router.post('/admin', userController.createAdmin)
router.use(adminMiddleware);
router.post('/employe', userController.createEmploye)



module.exports = router;