import { Router } from 'express';
import { runSeed, seedHealthCheck } from '../controllers/seed.controller';

const router = Router();

/**
 * @route   GET /api/seed/health
 * @desc    Check if seed service is available and configured
 * @access  Public
 */
router.get('/health', seedHealthCheck);

/**
 * @route   POST /api/seed/run
 * @desc    Trigger database seeding
 * @access  Private (requires x-seed-secret header)
 * 
 * Headers:
 * - x-seed-secret: Must match SEED_SECRET environment variable
 * 
 * Example:
 * curl -X POST https://workigom-backend.onrender.com/api/seed/run \
 *   -H "x-seed-secret: workigom_seed_2024"
 */
router.post('/run', runSeed);

export default router;
