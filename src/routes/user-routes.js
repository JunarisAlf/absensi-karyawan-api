const UserController = require('../controllers/user-controller');
const adminMiddleware = require('../middleware/admin-middleware');

const router = require('express').Router();
router.post('/auth', UserController.login)
router.post('/admin', UserController.createAdmin)
router.use(adminMiddleware);
router.post('/employe', UserController.createEmploye)



module.exports = router;