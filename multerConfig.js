const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/static/images');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '&name=';
		cb(null, uniqueSuffix + file.originalname);
	},
});

module.exports = multer({ storage });
