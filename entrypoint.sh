#!/bin/sh

set -e

echo "🚀 Starting NestJS Ecommerce..."

echo "⏳ Waiting for database..."

until nc -z $DATABASE_HOST $DATABASE_PORT; do
    sleep 1
done

echo "✅ Database ready"

echo "🗄 Running migrations..."
pnpm migration:run

echo "🌱 Running seeds..."
pnpm seed:run || echo "No seeds found"

echo "🔥 Starting application..."
node dist/main.js