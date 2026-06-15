import express from 'express';
import { getResults, getResultById, createResult, updateResult, deleteResult } from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getResults)
  .post(protect, authorize('faculty', 'admin'), createResult);

router.route('/:id')
  .get(protect, getResultById)
  .put(protect, authorize('faculty', 'admin'), updateResult)
  .delete(protect, authorize('faculty', 'admin'), deleteResult);

export default router;
