const jwt = require('jsonwebtoken')
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(404).json({ message: 'User is not authorized' });
		}

		const decodedData = jwt.verify(token, JWT_SECRET_TOKEN);
		req.user = decodedData;

		next();
	} catch (error) {
		console.log(error);
		return res.status(404).json({ message: 'User is not authorized' });
	}
};
