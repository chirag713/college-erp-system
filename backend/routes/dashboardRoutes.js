import express from 'express';
import {
  getDashboardStats, getStudentCount, getFacultyCount,
  getFeeCollectionStats, getAttendanceStats, getLibraryStats
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // Restrict all dashboard routes to admin

router.get('/', getDashboardStats);
router.get('/students', getStudentCount);
router.get('/faculty', getFacultyCount);
router.get('/fees', getFeeCollectionStats);
router.get('/attendance', getAttendanceStats);
router.get('/library', getLibraryStats);

export default router;
