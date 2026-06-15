import express from 'express';
import { getTimetables, createTimetable, deleteTimetable } from '../controllers/timetableController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTimetables)
  .post(protect, authorize('admin'), createTimetable);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteTimetable);

export default router;
