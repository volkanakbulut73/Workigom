import { Router } from 'express';
import { body } from 'express-validator';
import * as applicationController from '../controllers/application.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { uploadResume } from '../config/multer';

const router = Router();

router.get('/', authenticate, applicationController.getAllApplications);
router.get('/:id', authenticate, applicationController.getApplicationById);

router.post(
  '/',
  authenticate,
  uploadResume.single('resume'),
  [
    body('jobId').notEmpty().withMessage('Job ID is required'),
    validate
  ],
  applicationController.createApplication
);

router.put(
  '/:id/status',
  authenticate,
  [
    body('status').isIn(['PENDING', 'ASSIGNED', 'COMPLETED', 'REJECTED']).withMessage('Invalid status'),
    validate
  ],
  applicationController.updateApplicationStatus
);

router.delete('/:id', authenticate, applicationController.deleteApplication);

export default router;
