import express from 'express';
import { signup, signin, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// GET /api/users
router.get('/', protect, authorize('admin', 'faculty'), getUsers);

// POST /api/users/signup
router.post('/signup', signup);

// POST /api/users/signin
router.post('/signin', signin);

export default router;
