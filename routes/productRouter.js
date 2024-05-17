const Router = require('express');
const router = new Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multerConfig = require('../multerConfig');

router.post('/create', roleMiddleware(['ADMIN']), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.patch('/:id', roleMiddleware(['ADMIN']), productController.update);
router.delete('/:id', roleMiddleware(['ADMIN']), productController.remove);

module.exports = router;
