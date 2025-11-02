# 🎯 WORKIGOM BACKEND DOCKERFILE - If you see this in Railway logs, the correct Dockerfile is being used! 🎯

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Cache bust to force rebuild - update this value to invalidate cache
ARG CACHE_BUST=202510242120

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma schema and generate client
COPY --from=builder /app/prisma ./prisma
RUN npm run prisma:generate

# Copy built files
COPY --from=builder /app/dist ./dist

# Create uploads directories
RUN mkdir -p uploads/resumes uploads/avatars

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port (Railway will set PORT dynamically via environment variable)
# The application listens on process.env.PORT || 3001
EXPOSE 3001

# Health check - Uses environment PORT variable or defaults to 3001
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "const port=process.env.PORT||3001;require('http').get(\`http://localhost:\${port}/api/health\`,(r)=>{process.exit(r.statusCode===200?0:1)})"

# Start the application
CMD ["/app/start.sh"]
