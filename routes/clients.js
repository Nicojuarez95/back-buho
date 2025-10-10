import express from 'express';
import clientController from '../controllers/ClientController.js';
import authenticateToken from '../middlewares/authenticate.js';

const router = express.Router();

// Protegemos todas las rutas de clientes con el middleware
router.use(authenticateToken);

// POST /api/clients -> Crear un nuevo cliente
router.post('/', clientController.createClient);

// GET /api/clients -> Obtener todos los clientes de la tienda
router.get('/', clientController.getClientsByUser);

// GET /api/clients/:id -> Obtener un cliente específico
router.get('/:id', clientController.getClientById);

// PUT /api/clients/:id -> Actualizar un cliente
router.put('/:id', clientController.updateClient);

// DELETE /api/clients/:id -> Eliminar un cliente
router.delete('/:id', clientController.deleteClient);

export default router;
