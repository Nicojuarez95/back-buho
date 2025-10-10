import express from 'express';
import authRouter from './auth.js';
import productRouter from './products.js';
import clientRouter from './clients.js';
import purchaseRouter from './compra.js';
import storeRouter from './store.js';

const router = express.Router();

// --- RUTAS PÚBLICAS ---
// Rutas para la vidriera de la tienda
router.use('/store', storeRouter);


// --- RUTAS PRIVADAS (Requieren autenticación) ---
// Rutas de autenticación de la tienda (login, register)
router.use('/auth', authRouter);

// Rutas para la gestión de productos
router.use('/products', productRouter);

// Rutas para la gestión de clientes
router.use('/clients', clientRouter);

// Rutas para la gestión de compras y cashback
router.use('/purchases', purchaseRouter);

export default router;

