// Quick test script to verify routes are properly configured
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking backend routes configuration...\n');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found. Please run: npm run build');
  process.exit(1);
}

console.log('✅ dist directory exists');

// Check if routes directory exists
const routesPath = path.join(distPath, 'routes');
if (!fs.existsSync(routesPath)) {
  console.error('❌ dist/routes directory not found');
  process.exit(1);
}

console.log('✅ dist/routes directory exists');

// Check for required route files
const requiredRoutes = [
  'index.js',
  'job.routes.js',
  'auth.routes.js',
  'user.routes.js',
  'application.routes.js',
  'donation.routes.js',
  'message.routes.js',
  'notification.routes.js'
];

let allRoutesExist = true;
for (const route of requiredRoutes) {
  const routePath = path.join(routesPath, route);
  if (fs.existsSync(routePath)) {
    console.log(`✅ ${route} exists`);
  } else {
    console.log(`❌ ${route} missing`);
    allRoutesExist = false;
  }
}

if (!allRoutesExist) {
  console.error('\n❌ Some route files are missing. Please run: npm run build');
  process.exit(1);
}

// Check the main index.js exports
const indexPath = path.join(routesPath, 'index.js');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Check if jobs route is mounted
if (indexContent.includes("router.use('/jobs'")) {
  console.log('\n✅ Jobs route is properly mounted in index.js');
} else {
  console.error('\n❌ Jobs route not found in index.js');
  process.exit(1);
}

// Check job.routes.js for GET endpoint
const jobRoutesPath = path.join(routesPath, 'job.routes.js');
const jobRoutesContent = fs.readFileSync(jobRoutesPath, 'utf8');

if (jobRoutesContent.includes("router.get('/'")) {
  console.log('✅ GET / route is defined in job.routes.js');
} else {
  console.error('❌ GET / route not found in job.routes.js');
  process.exit(1);
}

// Check if app.ts mounts the routes
const appPath = path.join(distPath, 'app.js');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  if (appContent.includes("app.use('/api'")) {
    console.log('✅ API routes are mounted at /api in app.js');
  } else {
    console.error('❌ API routes not properly mounted in app.js');
    process.exit(1);
  }
} else {
  console.error('❌ dist/app.js not found');
  process.exit(1);
}

console.log('\n🎉 All route checks passed!');
console.log('\nExpected endpoint structure:');
console.log('  - GET  /api/jobs       -> Get all jobs');
console.log('  - GET  /api/jobs/:id   -> Get job by ID');
console.log('  - POST /api/jobs       -> Create job (requires auth)');
console.log('  - PUT  /api/jobs/:id   -> Update job (requires auth)');
console.log('  - DELETE /api/jobs/:id -> Delete job (requires auth)');
console.log('\n✨ The backend is properly configured!');
console.log('📝 Note: If you\'re still getting 404 on Render, you need to:');
console.log('   1. Push this code to GitHub');
console.log('   2. Trigger a manual deploy on Render or wait for auto-deploy');
console.log('   3. Clear Render\'s build cache if necessary');
