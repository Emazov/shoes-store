const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }],
	favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
});

module.exports = model('User', userSchema);
