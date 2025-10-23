import { Router } from 'express';
import { body } from 'express-validator';
import * as jobController from '../controllers/job.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

router.post(
  '/',
  authenticate,
  authorize('CORPORATE', 'ADMIN'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('type').notEmpty().withMessage('Job type is required'),
    validate
  ],
  jobController.createJob
);

router.put('/:id', authenticate, jobController.updateJob);
router.delete('/:id', authenticate, jobController.deleteJob);

router.put('/:id/approve', authenticate, authorize('ADMIN'), jobController.approveJob);
router.put('/:id/reject', authenticate, authorize('ADMIN'), jobController.rejectJob);

export default router;
