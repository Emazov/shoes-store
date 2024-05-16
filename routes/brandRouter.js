const Router = require('express');
const router = new Router();

const brandController = require('../controllers/brandController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/create', roleMiddleware(['ADMIN']), brandController.createBrand);
router.get('/getAll', authMiddleware, brandController.getAllBrands);

module.exports = router;
