import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './application.routes';
import donationRoutes from './donation.routes';
import messageRoutes from './message.routes';
import notificationRoutes from './notification.routes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Workigom API is running' });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/donations', donationRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);

export default router;
