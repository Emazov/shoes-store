const Router = require('express');
const router = new Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multerConfig = require('../multerConfig');

router.post('/create', roleMiddleware(['ADMIN']), productController.create);
router.get('/', authMiddleware);
router.get('/:id', authMiddleware);
router.put('/:id', roleMiddleware(['ADMIN']));
router.delete('/:id', roleMiddleware(['ADMIN']));

module.exports = router;
