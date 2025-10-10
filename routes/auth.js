import express from 'express';
import authController from '../controllers/authController.js';

let router = express.Router();

// Ruta para registrar una nueva tienda. Es pública.
router.post('/register', authController.register);

// Ruta para iniciar sesión. Es pública.
router.post('/login', authController.login);

export default router;
