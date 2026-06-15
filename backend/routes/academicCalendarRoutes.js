import express from 'express';
import {
  createAcademicEvent, getAcademicCalendar,
  updateAcademicEvent, deleteAcademicEvent
} from '../controllers/academicCalendarController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAcademicCalendar)
  .post(protect, authorize('admin'), createAcademicEvent);

router.route('/:id')
  .put(protect, authorize('admin'), updateAcademicEvent)
  .delete(protect, authorize('admin'), deleteAcademicEvent);

export default router;
