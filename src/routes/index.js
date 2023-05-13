const router = require('express').Router();
const userRoutes = require('./user-routes')
const workDayRoutes = require('./work-day-routes')
const absensiRoutes = require('./absensi-routes')


router.get('/', (req, res)=> {
    res.send('HOME')
});

router.use( '/user', userRoutes);
router.use('/workday', workDayRoutes)
router.use('/absensi', absensiRoutes)



module.exports = router