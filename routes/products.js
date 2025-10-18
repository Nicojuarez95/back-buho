import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticate.js';
import uploadMiddleware from '../middlewares/upload.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);

// Usamos el middleware de subida en las rutas de creación y actualización
router.post('/', authenticateToken, uploadMiddleware, createProduct);
router.put('/:id', authenticateToken, uploadMiddleware, updateProduct);

router.delete('/:id', authenticateToken, deleteProduct);

export default router;
