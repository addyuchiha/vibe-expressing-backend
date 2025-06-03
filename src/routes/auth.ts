import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/validation';

const router = Router();

// Route for user registration
router.post('/register', validateRegistration, register);

// Route for user login
router.post('/login', validateLogin, login);

export default router;