import { body } from 'express-validator';

/**
 * Validation rules for send notification endpoint
 */
export const sendNotificationValidation = [
  body('targetType')
    .isIn(['ALL', 'ALL_INDIVIDUALS', 'ALL_COMPANIES', 'SINGLE_INDIVIDUAL', 'SINGLE_COMPANY'])
    .withMessage('targetType ALL, ALL_INDIVIDUALS, ALL_COMPANIES, SINGLE_INDIVIDUAL veya SINGLE_COMPANY olmalıdır'),

  body('targetId')
    .optional()
    .isString()
    .withMessage('targetId bir metin olmalıdır')
    .custom((value, { req }) => {
      // If targetType is SINGLE_*, targetId is required
      if (req.body.targetType === 'SINGLE_INDIVIDUAL' || req.body.targetType === 'SINGLE_COMPANY') {
        if (!value) {
          throw new Error('SINGLE_INDIVIDUAL veya SINGLE_COMPANY için targetId zorunludur');
        }
      }
      return true;
    }),

  body('title')
    .notEmpty()
    .withMessage('Bildirim başlığı zorunludur')
    .isString()
    .withMessage('Başlık bir metin olmalıdır')
    .isLength({ min: 3, max: 100 })
    .withMessage('Başlık 3-100 karakter arasında olmalıdır'),

  body('message')
    .notEmpty()
    .withMessage('Bildirim mesajı zorunludur')
    .isString()
    .withMessage('Mesaj bir metin olmalıdır')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Mesaj 10-1000 karakter arasında olmalıdır'),

  body('link')
    .optional()
    .isString()
    .withMessage('Link bir metin olmalıdır')
    .isLength({ max: 500 })
    .withMessage('Link 500 karakterden uzun olamaz')
];
