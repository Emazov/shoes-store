const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	brandName: {
		name: { type: String, required: true },
		id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
	},
	collectionName: {
		name: { type: String },
		id: { type: Schema.Types.ObjectId, ref: 'Collection' },
	},
	gender: { type: [String], required: true },
	colors: { type: [String], required: true },
	size: { type: [Number], required: true },
});

module.exports = model('Product', productSchema);
