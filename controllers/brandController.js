const BrandModel = require('../models/BrandModel');

class BrandController {
	async createBrand(req, res) {
		try {
			const { name } = req.body;
			const isBrand = await BrandModel.findOne({ name });
			if (isBrand) {
				return res.status(400).json({ message: 'Brand already exists' });
			}

			const newBrand = new BrandModel({ name });
			const savedBrand = await newBrand.save();

			res.status(201).json(savedBrand);
		} catch (error) {
			res.status(500).json({ error: `${error.message} ${req.body.name}` });
		}
	}

	async getAllBrands(req, res) {
		try {
			const brands = await BrandModel.find();

			return res.json(brands);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new BrandController();
