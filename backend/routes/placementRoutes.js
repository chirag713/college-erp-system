import express from 'express';
import {
  createCompany, createJobPost, applyForJob,
  getApplications, updateApplicationStatus
} from '../controllers/placementController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/companies', protect, authorize('admin'), createCompany);
router.post('/jobs', protect, authorize('admin'), createJobPost);

router.post('/apply', protect, authorize('student'), applyForJob);
router.get('/jobs/:jobId/applications', protect, authorize('admin'), getApplications);
router.put('/applications/:applicationId', protect, authorize('admin'), updateApplicationStatus);

export default router;
