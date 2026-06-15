import express from 'express';
import {
  createCertificate, getCertificates, getMyCertificates,
  verifyCertificate, deleteCertificate, downloadCertificate
} from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public endpoint for anyone to verify a certificate using the hash
router.get('/verify/:hash', verifyCertificate);

// Protected routes
router.post('/', protect, authorize('admin'), createCertificate);
router.get('/', protect, authorize('admin'), getCertificates);
router.get('/my-certificates', protect, getMyCertificates);
router.get('/:id/download', protect, downloadCertificate);
router.delete('/:id', protect, authorize('admin'), deleteCertificate);

export default router;
