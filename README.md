# Shoes Store Backend

## Installation
Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Clone the repository
```sh
git clone git@github.com:Emazov/shoes-store.git <folder name>
```
Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```
## Env file
Write your env variables
```sh
PORT=3000
DB_PASS=password
DB_NAME=database name
JWT_SECRET_TOKEN=secret
```
## Models
### User Model
```sh
const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }],
	favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
});
```
### Role Model
```sh
const RoleModel = new Schema({
	value: { type: String, unique: true, default: 'USER' },
});
```
### Brand Model
```sh
const brandSchema = new Schema({
	name: { type: String, required: true, unique: true },
});
```
### Collection Model
```sh
const collectionSchema = new Schema({
	name: { type: String, required: true, unique: true },
	brand: {
		name: { type: String, required: true },
		id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
	},
});
```
### Product Model
```sh
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
```

## Feedback from Master
[Feedback docs](https://docs.google.com/document/d/1DGrIXF5Lf8ijz9EZ36MYdLiMW1Q-FocMnP_6z0r5jSA/edit?usp=sharing)
