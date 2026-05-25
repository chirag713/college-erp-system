import express from 'express';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getBooks) // All authenticated users can see the catalog
  .post(protect, authorize('admin'), createBook);

router.route('/:id')
  .put(protect, authorize('admin'), updateBook)
  .delete(protect, authorize('admin'), deleteBook);

export default router;
