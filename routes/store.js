import express from 'express';
const router = express.Router();


router.get('/:storeSlug', storeController.getStoreBySlug);

export default router;
