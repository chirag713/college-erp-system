import express from 'express';
import { getStudentProfiles, getStudentProfileById, createStudentProfile, updateStudentProfile, deleteStudentProfile } from '../controllers/studentProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getStudentProfiles)
  .post(protect, createStudentProfile);

router.route('/:id')
  .get(protect, getStudentProfileById)
  .put(protect, updateStudentProfile)
  .delete(protect, deleteStudentProfile);

export default router;
