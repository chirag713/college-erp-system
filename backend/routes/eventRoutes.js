import express from 'express';
import {
  createEvent, getEvents, registerForEvent,
  getMyEvents, updateEventStatus
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getEvents)
  .post(protect, authorize('admin', 'faculty'), createEvent);

router.post('/register', protect, registerForEvent);
router.get('/my-events', protect, getMyEvents);
router.put('/:id/status', protect, authorize('admin', 'faculty'), updateEventStatus);

export default router;
