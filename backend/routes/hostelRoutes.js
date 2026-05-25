import express from 'express';
import { getHostels, createHostel, getRooms, createRoom, deleteRoom } from '../controllers/hostelController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getHostels)
  .post(protect, authorize('admin'), createHostel);

router.route('/rooms')
  .get(protect, getRooms)
  .post(protect, authorize('admin'), createRoom);

router.route('/rooms/:id')
  .delete(protect, authorize('admin'), deleteRoom);

export default router;
