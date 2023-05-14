const reportController = require('../controllers/report-controller');
const adminMiddleware = require('../middleware/admin-middleware');

const router = require('express').Router();
router.get('', adminMiddleware, reportController.getReport)




module.exports = router;