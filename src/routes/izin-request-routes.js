const izinRequestController = require('../controllers/izin-request-controller');
const employeMiddleware = require('../middleware/employe-middleware');

const router = require('express').Router();
router.use(employeMiddleware);
router.post('/', izinRequestController.create)

module.exports = router;