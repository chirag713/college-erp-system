import express from 'express';
import { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment } from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getEnrollments)
  .post(protect, createEnrollment); // Students can enroll

router.route('/:id')
  .get(protect, getEnrollmentById)
  .put(protect, authorize('admin', 'faculty'), updateEnrollment)
  .delete(protect, authorize('admin'), deleteEnrollment);

export default router;
