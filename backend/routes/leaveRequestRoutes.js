import express from 'express';
import { getLeaveRequests, getMyLeaveRequests, createLeaveRequest, updateLeaveRequestStatus } from '../controllers/leaveRequestController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getLeaveRequests)
  .post(protect, createLeaveRequest); // Student applies for leave

router.route('/my')
  .get(protect, getMyLeaveRequests);

router.route('/:id/status')
  .put(protect, authorize('admin'), updateLeaveRequestStatus);

export default router;
