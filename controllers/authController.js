const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Role = require('../models/RoleModel');
const User = require('../models/UserModel');

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const generateAccessToken = (id, email, roles) => {
	const payload = {
		id,
		email,
		roles,
	};

	return jwt.sign(payload, JWT_SECRET_TOKEN, { expiresIn: '24h' });
};

class AuthController {
	async register(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorsMsg = errors.errors[0].msg;
				return res
					.status(400)
					.json({ message: 'Validation error!!', errorsMsg });
			}

			const { username, email, password } = req.body;
			const isEmail = await User.findOne({ email });
			if (isEmail) {
				return res
					.status(400)
					.json({ message: `Email (${email}) is already registered` });
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });
			const user = new User({
				username,
				email,
				password: hashPassword,
				roles: [userRole.value],
			});

			await user.save();

			return res.json({ message: 'User successfully registered!' });
		} catch (error) {
			console.log('--auth register err--', error);
			res.status(404).json({ message: 'Registration error' });
		}
	}
	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ message: `User with email (${email}) is not found)` });
			}

			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: 'Incorrect email or password' });
			}

			const token = generateAccessToken(user._id, user.email, user.roles);

			return res.json({ token });
		} catch (error) {
			console.log('--auth register err--', error);
			res.status(404).json({ message: 'Login error' });
		}
	}
	async getProfile(req, res) {
		const email = req.user.email;
		const profile = await User.findOne({ email });

		return res.json(profile);
	}
	async getAllUsers(req, res) {
		try {
			const users = await User.find();

			return res.json(users);
		} catch (error) {
			console.log('--auth controller err--', error);
		}
	}
}

module.exports = new AuthController();
