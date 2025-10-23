
import app from './app';
import prisma from './config/database';

const PORT = process.env.PORT || 3001;

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received, closing server gracefully...`);
  
  try {
    // Disconnect Prisma
    await prisma.$disconnect();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Start server
const server = app.listen(PORT, async () => {
  console.log('='.repeat(50));
  console.log(`🚀 Workigom Backend API Server`);
  console.log('='.repeat(50));
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
  
  // Test database connection
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  console.error('Unhandled Rejection:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;
