import { Router } from 'express';
import { body } from 'express-validator';
import * as donationController from '../controllers/donation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.get('/', donationController.getAllDonations);
router.get('/:id', donationController.getDonationById);

router.post(
  '/',
  authenticate,
  authorize('CORPORATE', 'ADMIN'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('foodType').notEmpty().withMessage('Food type is required'),
    body('quantity').notEmpty().withMessage('Quantity is required'),
    body('location').notEmpty().withMessage('Location is required'),
    validate
  ],
  donationController.createDonation
);

router.put('/:id', authenticate, donationController.updateDonation);
router.put('/:id/request', authenticate, donationController.requestDonation);
router.put('/:id/complete', authenticate, donationController.completeDonation);
router.delete('/:id', authenticate, donationController.deleteDonation);

export default router;
