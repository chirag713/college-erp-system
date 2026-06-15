import express from 'express';
import { createSubject, getSubjects, assignFacultyToSubject, assignSubjectToCourse } from '../controllers/subjectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSubjects)
  .post(protect, authorize('admin'), createSubject);

router.post('/assign-faculty', protect, authorize('admin'), assignFacultyToSubject);
router.post('/assign-course', protect, authorize('admin'), assignSubjectToCourse);

export default router;
