const router = require('express').Router();
const userRoutes = require('./user-routes')
router.get('/', (req, res)=> {
    res.send('HOME')
});

router.use( '/user', userRoutes);


module.exports = router