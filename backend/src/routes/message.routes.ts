import { Router } from 'express';
import { body } from 'express-validator';
import * as messageController from '../controllers/message.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.get('/', authenticate, messageController.getAllMessages);
router.get('/conversations', authenticate, messageController.getConversations);

router.post(
  '/',
  authenticate,
  [
    body('receiverId').notEmpty().withMessage('Receiver ID is required'),
    body('content').notEmpty().withMessage('Message content is required'),
    validate
  ],
  messageController.sendMessage
);

router.put('/:id/read', authenticate, messageController.markAsRead);
router.delete('/:id', authenticate, messageController.deleteMessage);

export default router;
