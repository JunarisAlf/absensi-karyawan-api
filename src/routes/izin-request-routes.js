const izinRequestController = require('../controllers/izin-request-controller');
const employeMiddleware = require('../middleware/employe-middleware');
const adminMinddleware = require('../middleware/admin-middleware');
const authMiddleware = require('../middleware/auth-middleware');

const router = require('express').Router();

router.get('/', authMiddleware, izinRequestController.getAllRequest) //get all request
router.patch('/:id',adminMinddleware, izinRequestController.changeStatus) //approval


router.post('/',employeMiddleware, izinRequestController.create)
router.put('/:id',employeMiddleware, izinRequestController.update)
router.delete('/:id',employeMiddleware, izinRequestController.delete)




module.exports = router;