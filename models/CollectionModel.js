const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
	name: { type: String, required: true, unique: true },
	brand: {
		name: { type: String, required: true },
		id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
	},
});

module.exports = model('Collection', collectionSchema);
