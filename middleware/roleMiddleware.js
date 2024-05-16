const jwt = require('jsonwebtoken');
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next();
		}

		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return res.status(404).json({ message: 'User is not authorized' });
			}

			const { roles: userRoles } = jwt.verify(token, JWT_SECRET_TOKEN);
			let hasRole = false;
			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			});

			if (!hasRole) {
				return res.status(404).json({ message: 'No access' });
			}

			next();
		} catch (error) {
			console.log(error);
			return res.status(404).json({ message: 'User is not authorized' });
		}
	};
};
