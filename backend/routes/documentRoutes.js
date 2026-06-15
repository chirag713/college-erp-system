import express from 'express';
import {
  uploadDocument, getDocuments, getMyDocuments,
  verifyDocument, deleteDocument
} from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadDocument);
router.get('/my-documents', protect, getMyDocuments);

router.get('/', protect, authorize('admin'), getDocuments);
router.put('/:id/verify', protect, authorize('admin'), verifyDocument);
router.delete('/:id', protect, authorize('admin'), deleteDocument);

export default router;
