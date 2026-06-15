import express from 'express';
import {
  createComplaint, getComplaints, getMyComplaints,
  updateComplaintStatus, deleteComplaint
} from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'hostelwarden'), getComplaints)
  .post(protect, createComplaint);

router.get('/my-complaints', protect, getMyComplaints);
router.put('/:complaintId', protect, authorize('admin', 'hostelwarden'), updateComplaintStatus);
router.delete('/:complaintId', protect, authorize('admin'), deleteComplaint);

export default router;
