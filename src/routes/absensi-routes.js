const absensiController = require('../controllers/absensi-controller');
const employeMiddleware = require('../middleware/employe-middleware');

const router = require('express').Router();
router.use(employeMiddleware);
router.post('/check-in', absensiController.checkIn)
router.post('/check-out', absensiController.checkOut)
router.get('/history', absensiController.history)




module.exports = router;