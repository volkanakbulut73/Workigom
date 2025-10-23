import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role').optional().isIn(['INDIVIDUAL', 'CORPORATE']).withMessage('Invalid role'),
    validate
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
  ],
  authController.login
);

router.post(
  '/verify-email',
  [
    body('token').notEmpty().withMessage('Verification token is required'),
    validate
  ],
  authController.verifyEmail
);

router.post(
  '/forgot-password',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    validate
  ],
  authController.forgotPassword
);

router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
  ],
  authController.resetPassword
);

router.get('/me', authenticate, authController.getCurrentUser);

export default router;
