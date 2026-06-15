import express from 'express';
import { getBookIssues, getMyBookIssues, issueBook, returnBook } from '../controllers/bookIssueController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getBookIssues)
  .post(protect, authorize('admin'), issueBook);

router.route('/my')
  .get(protect, getMyBookIssues);

router.route('/:id/return')
  .put(protect, authorize('admin'), returnBook);

export default router;
