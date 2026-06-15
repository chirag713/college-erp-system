import express from 'express';
import { getAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAttendance)
  .post(protect, authorize('faculty', 'admin'), createAttendance);

router.route('/:id')
  .get(protect, getAttendanceById)
  .put(protect, authorize('faculty', 'admin'), updateAttendance)
  .delete(protect, authorize('faculty', 'admin'), deleteAttendance);

export default router;
