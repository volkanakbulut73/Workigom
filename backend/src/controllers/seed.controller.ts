import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Controller to handle database seeding via API endpoint
 * Requires SEED_SECRET header for authentication
 */
export const runSeed = async (req: Request, res: Response) => {
  try {
    // Get SEED_SECRET from environment variable
    const seedSecret = process.env.SEED_SECRET;
    
    // Check if SEED_SECRET is configured
    if (!seedSecret) {
      console.error('⚠️ SEED_SECRET environment variable is not set');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: SEED_SECRET not configured'
      });
    }

    // Get the secret from request header
    const providedSecret = req.headers['x-seed-secret'] as string;

    // Validate the secret
    if (!providedSecret) {
      console.warn('❌ Seed attempt without secret header');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing x-seed-secret header'
      });
    }

    if (providedSecret !== seedSecret) {
      console.warn('❌ Seed attempt with invalid secret');
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid seed secret'
      });
    }

    // Log the seed attempt
    console.log('🌱 Starting database seed via API endpoint...');
    console.log('⏰ Timestamp:', new Date().toISOString());

    // Execute the Prisma seed command
    const { stdout, stderr } = await execAsync('npx prisma db seed', {
      cwd: process.cwd(),
      env: process.env
    });

    // Log the output
    if (stdout) {
      console.log('📝 Seed stdout:', stdout);
    }
    if (stderr) {
      console.warn('⚠️ Seed stderr:', stderr);
    }

    console.log('✅ Database seeding completed successfully');

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString(),
      output: stdout || 'Seed completed',
      warnings: stderr || null
    });

  } catch (error: any) {
    // Log the error
    console.error('❌ Error during database seeding:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Health check endpoint for seed service
 */
export const seedHealthCheck = async (req: Request, res: Response) => {
  const seedSecret = process.env.SEED_SECRET;
  
  return res.status(200).json({
    success: true,
    message: 'Seed service is available',
    configured: !!seedSecret,
    timestamp: new Date().toISOString()
  });
};

/**
 * Information endpoint for /run route
 * Helps users understand how to use the seed endpoint
 */
export const seedInfo = async (req: Request, res: Response) => {
  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
    error: 'GET method is not supported for this endpoint',
    usage: {
      method: 'POST',
      endpoint: '/api/seed/run',
      headers: {
        'Content-Type': 'application/json',
        'x-seed-secret': 'your_seed_secret_here'
      },
      description: 'This endpoint seeds the database with test data (users, jobs, donations)',
      example: 'curl -X POST https://workigom-backend.onrender.com/api/seed/run -H "x-seed-secret: your_secret"'
    },
    note: 'The x-seed-secret must match the SEED_SECRET environment variable'
  });
};
