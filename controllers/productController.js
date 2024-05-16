const BrandModel = require('../models/BrandModel');
const CollectionModel = require('../models/CollectionModel');
const ProductModel = require('../models/ProductModel');

class ProductController {
	async create(req, res) {
		try {
			const {
				name,
				description,
				price,
				brandName,
				collectionName,
				colors,
				gender,
				size,
			} = req.body;

			const brand = await BrandModel.findOne({ name: brandName });
			if (!brand) {
				return res
					.status(404)
					.json({ error: `Brand not found ${brandName} ${brandName}` });
			}

			const product = new ProductModel({
				name,
				description,
				price,
				brand: {
					name: brandName,
					id: brand._id,
				},
				gender,
				colors,
				size,
			});

			let newProd = {};

			if (collectionName) {
				const collection = await CollectionModel.findOne({
					name: collectionName,
				});

				newProd = new ProductModel({
					...product,
					collection: {
						name: collectionName,
						id: collection._id,
					},
				});

				if (!collection) {
					return res.status(404).json({ error: 'collection not found' });
				}
			}

			// const savedProduct = await product.save();

			const savedProduct = collectionName
				? await newProd.save()
				: await product.save();

			res.status(201).json(savedProduct);
		} catch (error) {
			console.error('Create product error', error);
			res.status(500).json({ error: `Create product error ${req.body}` });
		}
	}
}

module.exports = new ProductController();
