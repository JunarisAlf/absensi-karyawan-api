const izinRequestController = require('../controllers/izin-request-controller');
const employeMiddleware = require('../middleware/employe-middleware');
const adminMinddleware = require('../middleware/admin-middleware');

const router = require('express').Router();

router.get('/',adminMinddleware, izinRequestController.getAllRequest) //get all request by Admin
router.get('/:id',adminMinddleware, izinRequestController.getOneRequest) //get One request by Admin
router.patch('/:id',adminMinddleware, izinRequestController.changeStatus) //approval

router.post('/',employeMiddleware, izinRequestController.create)


module.exports = router;