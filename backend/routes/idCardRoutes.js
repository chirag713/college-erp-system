import express from 'express';
import {
  generateStudentIdCard, generateFacultyIdCard,
  getMyIdCard, downloadIdCard
} from '../controllers/idCardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/generate/student', protect, authorize('admin'), generateStudentIdCard);
router.post('/generate/faculty', protect, authorize('admin'), generateFacultyIdCard);

router.get('/my-idcard', protect, getMyIdCard);
router.get('/my-idcard/download', protect, downloadIdCard);

export default router;
