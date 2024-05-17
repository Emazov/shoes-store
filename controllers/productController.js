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
				return res.status(404).json({ error: `Brand not found ${brandName}` });
			}

			const product = new ProductModel({
				name,
				description,
				price,
				brandName: {
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
					name,
					description,
					price,
					brandName: {
						name: brandName,
						id: brand._id,
					},
					collectionName: {
						name: collectionName,
						id: collection._id,
					},
					gender,
					colors,
					size,
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
			res.status(500).json({ error: `Create product error ${newProd}` });
		}
	}

	async update(req, res) {
		try {
			const productId = req.params.id;
			const product = await ProductModel.findById(productId);

			if (!product) {
				return res.status(400).json({ error: 'Invalid product ID' });
			}

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
					.json({ error: `Brand not found '${brandName}'` });
			}

			if (collectionName) {
				const collection = await CollectionModel.findOne({
					name: collectionName,
				});

				if (!collection) {
					return res
						.status(404)
						.json({ error: `Collection not found '${collectionName}'` });
				}
			}

			const updates = {};
			const unsetFields = {};

			if (name !== undefined) updates.name = name;
			if (description !== undefined) updates.description = description;
			if (price !== undefined) updates.price = price;
			if (brandName !== undefined) updates.brandName = brandName;
			if (collectionName !== undefined) updates.collectionName = collectionName;
			if (colors !== undefined) updates.colors = colors;
			if (gender !== undefined) updates.gender = gender;
			if (size !== undefined) updates.size = size;

			const allPossibleFields = [
				'name',
				'description',
				'price',
				'brandName',
				'collectionName',
				'colors',
				'gender',
				'size',
			];

			allPossibleFields.forEach((field) => {
				if (!(field in req.body)) {
					unsetFields[field] = '';
				}
			});

			const updateQuery = {};
			if (Object.keys(updates).length > 0) {
				updateQuery.$set = updates;
			}
			if (Object.keys(unsetFields).length > 0) {
				updateQuery.$unset = unsetFields;
			}

			const updatedProduct = await ProductModel.findOneAndUpdate(
				{ _id: productId },
				{ ...updateQuery },
				{ new: true }
			);

			res
				.status(200)
				.json({ message: 'Product updated', product: updatedProduct });
		} catch (error) {
			console.error('Update product error', error);
			res.status(500).json({ error: `Update product error` });
		}
	}

	async getAll(req, res) {
		try {
			const products = await ProductModel.find();

			res.status(201).json(products);
		} catch (error) {
			console.error('Get product error', error);
			res.status(500).json({ error: `Get products error` });
		}
	}

	async getOne(req, res) {
		try {
			const productId = req.params.id;
			const product = await ProductModel.findById(productId);

			if (!product) {
				return res.status(400).json({ error: 'Invalid product ID' });
			}

			res.status(201).json(product);
		} catch (error) {
			console.error('Remove product error', error);
			res.status(500).json({ error: `Remove product error` });
		}
	}

	async remove(req, res) {
		try {
			const productId = req.params.id;
			const product = await ProductModel.findById(productId);

			if (!product) {
				return res.status(400).json({ error: 'Invalid product ID' });
			}

			const result = await ProductModel.findOneAndDelete({
				_id: productId,
			});

			if (!result) {
				return res.status(404).json({ error: 'Product not found' });
			}

			res.status(200).json({ message: 'Product deleted', product: product });
		} catch (error) {
			console.error('Remove product error', error);
			res.status(500).json({ error: `Remove product error` });
		}
	}
}

module.exports = new ProductController();
