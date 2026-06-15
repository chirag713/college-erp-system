import express from 'express';
import {
  createAlumniProfile, getAlumniProfiles,
  updateAlumniProfile, postAlumniOpportunity
} from '../controllers/alumniController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .post(protect, createAlumniProfile)
  .put(protect, updateAlumniProfile);

router.get('/', protect, getAlumniProfiles);
router.post('/opportunities', protect, postAlumniOpportunity);

export default router;
