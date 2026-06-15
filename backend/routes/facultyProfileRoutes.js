import express from 'express';
import { getFacultyProfiles, getFacultyProfileById, createFacultyProfile, updateFacultyProfile, deleteFacultyProfile } from '../controllers/facultyProfileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getFacultyProfiles)
  .post(protect, authorize('admin', 'faculty'), createFacultyProfile);

router.route('/:id')
  .get(protect, getFacultyProfileById)
  .put(protect, authorize('admin', 'faculty'), updateFacultyProfile)
  .delete(protect, authorize('admin'), deleteFacultyProfile);

export default router;
