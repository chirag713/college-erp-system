import express from 'express';
import {
  createAuditLog, getAuditLogs, getUserActivityLogs, deleteAuditLog
} from '../controllers/auditLogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // Only admins should access audit logs

router.post('/', createAuditLog);
router.get('/', getAuditLogs);
router.get('/user/:userId', getUserActivityLogs);
router.delete('/:id', deleteAuditLog);

export default router;
