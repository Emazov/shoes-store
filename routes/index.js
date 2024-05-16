const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter')
const brandRouter = require('./brandRouter');
const collectionRouter = require('./collectionRouter');
const productRouter = require('./productRouter');

router.use('/auth', authRouter)
router.use('/brands', brandRouter);
router.use('/collections', collectionRouter);
router.use('/products', productRouter);

module.exports = router;
