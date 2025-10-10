import express from 'express';
import storeController from '../controllers/storeController.js';

const router = express.Router();

// GET /api/store/:storeSlug
// Esta es la ruta pública que usará el frontend para mostrar la vidriera.
// No necesita autenticación.
router.get('/:storeSlug', storeController.getStoreBySlug);

export default router;
