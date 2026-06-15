import express from 'express';
import { createSemester, getSemesters } from '../controllers/semesterController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSemesters)
  .post(protect, authorize('admin'), createSemester);

export default router;
