import express from 'express';
import {
  createAssignment, getAssignments, deleteAssignment,
  submitAssignment, getMySubmissions, gradeSubmission
} from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize('admin', 'faculty'), createAssignment);

router.delete('/:assignmentId', protect, authorize('admin', 'faculty'), deleteAssignment);

router.post('/submit', protect, authorize('student'), submitAssignment);
router.get('/my-submissions/:studentId', protect, authorize('student'), getMySubmissions);
router.put('/grade', protect, authorize('admin', 'faculty'), gradeSubmission);

export default router;
