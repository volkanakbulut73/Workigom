
#!/bin/bash

# =====================================
# Render Build Script for Workigom
# =====================================
# This script can be used for manual builds or testing locally
# Render will use the commands from render.yaml directly

set -e  # Exit on error

echo "========================================"
echo "🚀 Workigom Render Build Script"
echo "========================================"

# Determine which service to build
SERVICE=$1

if [ -z "$SERVICE" ]; then
  echo "Usage: ./render-build.sh [backend|frontend|all]"
  exit 1
fi

# =====================================
# Backend Build
# =====================================
build_backend() {
  echo ""
  echo "📦 Building Backend..."
  echo "========================================"
  
  cd backend
  
  echo "Installing dependencies..."
  npm install
  
  echo "Generating Prisma Client..."
  npx prisma generate
  
  echo "Building TypeScript..."
  npm run build
  
  echo "✅ Backend build complete!"
  cd ..
}

# =====================================
# Frontend Build
# =====================================
build_frontend() {
  echo ""
  echo "📦 Building Frontend..."
  echo "========================================"
  
  cd src-frontend
  
  echo "Installing dependencies..."
  npm install
  
  echo "Building with Vite..."
  npm run build
  
  echo "✅ Frontend build complete!"
  cd ..
}

# =====================================
# Run Build
# =====================================
case $SERVICE in
  backend)
    build_backend
    ;;
  frontend)
    build_frontend
    ;;
  all)
    build_backend
    build_frontend
    ;;
  *)
    echo "❌ Invalid service: $SERVICE"
    echo "Usage: ./render-build.sh [backend|frontend|all]"
    exit 1
    ;;
esac

echo ""
echo "========================================"
echo "✅ Build completed successfully!"
echo "========================================"
