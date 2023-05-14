const workDayController = require('../controllers/work-day-controller');
const adminMiddleware = require('../middleware/admin-middleware');

const router = require('express').Router();
router.use(adminMiddleware);
router.post('', workDayController.create)
router.get('', workDayController.workDayHistory)


module.exports = router;