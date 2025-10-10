import express from 'express';
import productController from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticate.js';

const router = express.Router();

// --- RUTAS PROTEGIDAS ---
// Todas las rutas definidas aquí requerirán un token válido.
router.use(authenticateToken);

// POST /api/products -> Crear un nuevo producto
router.post('/', productController.createProduct);

// GET /api/products -> Obtener todos los productos de la tienda logueada
router.get('/', productController.getProductsByUser);

// PUT /api/products/:id -> Actualizar un producto específico
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id -> Eliminar un producto específico
router.delete('/:id', productController.deleteProduct);

export default router;
