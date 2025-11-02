import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/adminAuth.middleware';
import { validate } from '../middleware/validation.middleware';
import { sendNotification } from '../controllers/adminNotification.controller';
import { sendNotificationValidation } from '../validators/adminNotification.validator';

const router = Router();

/**
 * @route   POST /api/admin/send-notification
 * @desc    Send notification to users (admin only)
 * @access  Private (Admin only)
 */
router.post(
  '/send-notification',
  authenticate,
  requireAdmin,
  sendNotificationValidation,
  validate,
  sendNotification
);

export default router;
