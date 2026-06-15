import express from 'express';
import {
  getSettings, updateSettings, setAcademicYear, setCurrentSemester
} from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Allow all authenticated users to read settings
router.get('/', protect, getSettings);

// Only admins can update settings
router.put('/', protect, authorize('admin'), updateSettings);
router.put('/academic-year', protect, authorize('admin'), setAcademicYear);
router.put('/current-semester', protect, authorize('admin'), setCurrentSemester);

export default router;
