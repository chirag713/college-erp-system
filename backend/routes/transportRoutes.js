import express from 'express';
import {
  createRoute, getRoutes, createVehicle,
  assignTransport, getMyTransport
} from '../controllers/transportController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/routes')
  .get(protect, getRoutes)
  .post(protect, authorize('admin'), createRoute);

router.post('/vehicles', protect, authorize('admin'), createVehicle);

router.post('/allocations', protect, authorize('admin'), assignTransport);
router.get('/allocations/student/:studentId', protect, getMyTransport);

export default router;
