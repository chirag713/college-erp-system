import express from 'express';
import { getAllocations, getMyAllocation, allocateRoom, vacateRoom } from '../controllers/hostelAllocationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getAllocations)
  .post(protect, authorize('admin'), allocateRoom);

router.route('/my')
  .get(protect, getMyAllocation);

router.route('/:id/vacate')
  .put(protect, authorize('admin'), vacateRoom);

export default router;
