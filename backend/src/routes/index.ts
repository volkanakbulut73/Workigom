import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './application.routes';
import donationRoutes from './donation.routes';
import messageRoutes from './message.routes';
import notificationRoutes from './notification.routes';
import seedRoutes from './seed.routes';
import prisma from '../config/database';

const router = Router();

// Health check - Enhanced to check database connectivity
router.get('/health', async (_req, res) => {
  try {
    // Quick database connectivity check
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({ 
      success: true, 
      message: 'Workigom API is running',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    // Return 200 even if DB is down, but indicate the issue
    // Railway health checks should pass even if DB is temporarily unavailable
    console.error('Health check warning: Database not connected:', error);
    res.status(200).json({ 
      success: true, 
      message: 'Workigom API is running',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      warning: 'Database connection issue'
    });
  }
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/donations', donationRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/seed', seedRoutes);

export default router;
