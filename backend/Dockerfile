# 🎯 WORKIGOM BACKEND DOCKERFILE - If you see this in Railway logs, the correct Dockerfile is being used! 🎯

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Cache bust to force rebuild - update this value to invalidate cache
ARG CACHE_BUST=202510232303

# Copy package files
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY backend/ .

# Generate Prisma client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy Prisma schema and generate client
COPY --from=builder /app/prisma ./prisma
RUN npm run prisma:generate

# Copy built files
COPY --from=builder /app/dist ./dist

# Create uploads directories
RUN mkdir -p uploads/resumes uploads/avatars

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Create startup script
RUN echo '#!/bin/sh\n\
echo "🚀 Starting Workigom Backend..."\n\
echo "📦 Running Prisma migrations..."\n\
npx prisma migrate deploy || echo "⚠️  Migration failed or no migrations to run"\n\
echo "✅ Starting server..."\n\
exec node dist/server.js' > /app/start.sh && chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"]
