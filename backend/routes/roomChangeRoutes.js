import express from 'express';
import { getRoomChangeRequests, getMyRoomChangeRequests, createRoomChangeRequest, updateRoomChangeStatus } from '../controllers/roomChangeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getRoomChangeRequests)
  .post(protect, createRoomChangeRequest); // Student requests room change

router.route('/my')
  .get(protect, getMyRoomChangeRequests);

router.route('/:id/status')
  .put(protect, authorize('admin'), updateRoomChangeStatus);

export default router;
