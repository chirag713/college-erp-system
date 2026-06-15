import express from 'express';
import {
  createNotification, getMyNotifications,
  markNotificationAsRead, deleteNotification
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'faculty'), createNotification);
router.get('/my-notifications', protect, getMyNotifications);
router.put('/:id/read', protect, markNotificationAsRead);
router.delete('/:id', protect, deleteNotification);

export default router;
