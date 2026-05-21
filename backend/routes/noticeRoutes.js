import express from 'express';
import { getNotices, getNoticeById, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotices)
  .post(protect, authorize('admin', 'faculty'), createNotice);

router.route('/:id')
  .get(protect, getNoticeById)
  .put(protect, authorize('admin', 'faculty'), updateNotice)
  .delete(protect, authorize('admin'), deleteNotice);

export default router;
