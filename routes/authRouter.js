const Router = require('express');
const router = new Router();
const { check } = require('express-validator');

const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
	'/register',
	[
		check('username', 'Username is required').notEmpty(),
		check('email', 'Write valid email').isEmail().normalizeEmail(),
		check('password', 'Password min 6 symbols and Max 26 symbols').isLength({
			min: 6,
			max: 26,
		}),
	],
	AuthController.register
);
router.post('/login', AuthController.login);
router.get('/profile', authMiddleware, AuthController.getProfile);
router.get('/getAll', roleMiddleware(['ADMIN']), AuthController.getAllUsers);

module.exports = router;
