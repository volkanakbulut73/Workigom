import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { uploadAvatar } from '../config/multer';

const router = Router();

router.get('/', authenticate, authorize('ADMIN'), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);

router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone').optional(),
    validate
  ],
  userController.updateUser
);

router.put(
  '/:id/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  userController.updateUserAvatar
);

router.delete('/:id', authenticate, authorize('ADMIN'), userController.deleteUser);

export default router;
