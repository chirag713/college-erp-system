import express from 'express';
import { getTimetables, createTimetable, deleteTimetable } from '../controllers/timetableController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTimetables)
  .post(protect, authorize('admin'), createTimetable);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteTimetable);

export default router;
