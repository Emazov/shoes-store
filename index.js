require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static/image')));
app.use(fileUpload({}));

const router = require('./routes/index');
app.use('/api', router);

const start = async () => {
	try {
		await mongoose
			.connect(
				`mongodb+srv://admin:${DB_PASS}@cluster0.pd09zds.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
			)
			.then(() => console.log('DB connect'))
			.catch((err) => console.log('--DB error--', err));

		app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
	} catch (error) {
		console.log('--start error--', error);
	}
};

start();
