import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct, createProductReview, getTopProducts, getProductCategories } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id/reviews').post(protect, createProductReview);

router.get('/top', getTopProducts);

router.get('/categories', getProductCategories);

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;