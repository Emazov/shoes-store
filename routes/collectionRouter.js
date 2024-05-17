const Router = require('express');
const router = new Router();

const collectionController = require('../controllers/collectionController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
	'/create',
	roleMiddleware(['ADMIN']),
	collectionController.createCollection
);
router.get('/getAll', collectionController.getAllCollections);

module.exports = router;
