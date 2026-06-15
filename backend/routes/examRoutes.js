import express from 'express';
import { createExam, getExams } from '../controllers/examController.js';
import { createSchedule, getSchedules } from '../controllers/examScheduleController.js';
import { generateAdmitCard, getAdmitCard } from '../controllers/admitCardController.js';
import { enterMarks, getGradesByStudent } from '../controllers/gradeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Exams
router.route('/')
  .get(protect, getExams)
  .post(protect, authorize('admin'), createExam);

// Schedules
router.route('/schedules')
  .get(protect, getSchedules)
  .post(protect, authorize('admin'), createSchedule);

// Admit Cards
router.route('/admit-cards')
  .post(protect, authorize('admin'), generateAdmitCard);
router.get('/admit-cards/:examId', protect, getAdmitCard);
router.get('/admit-cards/:examId/:studentId', protect, getAdmitCard);

// Grades
router.route('/grades')
  .post(protect, authorize('admin', 'faculty'), enterMarks);
router.get('/grades/student/:studentId', protect, getGradesByStudent);

export default router;
