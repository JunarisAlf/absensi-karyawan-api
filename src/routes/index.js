const router = require('express').Router();
const userRoutes = require('./user-routes')
const workDayRoutes = require('./work-day-routes')
const absensiRoutes = require('./absensi-routes')
const izinRequestRoutes = require('./izin-request-routes')
const reportRoutes = require('./report-routes')


router.get('/', (req, res)=> {
    res.send('HOME')
});

router.use( '/user', userRoutes);
router.use('/workday', workDayRoutes)
router.use('/absensi', absensiRoutes)
router.use('/izin', izinRequestRoutes)
router.use('/report', reportRoutes)





module.exports = router