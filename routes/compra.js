import express from 'express';
import purchaseController from '../controllers/purchaseController.js';
import authenticateToken from '../middlewares/authenticate.js';

const router = express.Router();

// Protegemos todas las rutas de compras
router.use(authenticateToken);

// POST /api/purchases/:clientId/add -> Registrar una nueva compra para un cliente
router.post('/:clientId/add', purchaseController.addPurchase);

// POST /api/purchases/:clientId/redeem -> Canjear cashback para un cliente
router.post('/:clientId/redeem', purchaseController.redeemCashback);

// GET /api/purchases/:clientId/history -> Ver el historial de un cliente
router.get('/:clientId/history', purchaseController.getPurchaseHistoryByClient);

export default router;
