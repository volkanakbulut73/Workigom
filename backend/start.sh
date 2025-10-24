#!/bin/sh
echo "🚀 Starting Workigom Backend..."
echo "📦 Running Prisma migrations..."
npx prisma migrate deploy || echo "⚠️  Migration failed or no migrations to run"
echo "✅ Starting server..."
exec node dist/server.js
