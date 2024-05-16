const CollectionModel = require('../models/CollectionModel');
const BrandModel = require('../models/BrandModel');

class CollectionController {
	async createCollection(req, res) {
		try {
			const { name, brandName } = req.body;
			const isCollection = await CollectionModel.findOne({ name });
			if (isCollection) {
				return res.status(400).json({ message: 'Collection already exists' });
			}

			const brand = await BrandModel.findOne({ name: brandName });
			if (!brand) {
				return res.status(404).json({ error: 'Brand not found' });
			}

			const newCollection = new CollectionModel({
				name,
				brand: {
					name: brandName,
					id: brand._id
				},
			});

			const savedCollection = await newCollection.save();

			res.status(201).json(savedCollection);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAllCollections(req, res) {
		try {
			const collections = await CollectionModel.find();

			return res.json(collections);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new CollectionController();
