import express from 'express';
import { getFeeInvoices, getMyFeeInvoices, createFeeInvoice, payFeeInvoice, deleteFeeInvoice } from '../controllers/feeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getFeeInvoices)
  .post(protect, authorize('admin'), createFeeInvoice);

router.route('/my')
  .get(protect, authorize('student'), getMyFeeInvoices);

router.route('/:id/pay')
  .put(protect, authorize('student', 'admin'), payFeeInvoice);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteFeeInvoice);

export default router;
