import { Router } from 'express';
import { createCharge, getCharges } from '../controllers/billingController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Route to create a charge
router.post('/charge', authenticate, createCharge);

// Route to get all charges for a user
router.get('/charges', authenticate, getCharges);

export default router;