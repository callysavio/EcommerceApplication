// routes/product.js
import express from 'express';
import { addProduct, fetchProducts, fetchProduct } from '../controllers/productController.js';
import upload from '../middlewares/multerConfig.js';
const router = express.Router();

router.post('/add-product', upload.array('images', 5), addProduct); // Accept up to 5 images
router.get('/products', fetchProducts)
router.get('/product/:id', fetchProduct)


export default router;
