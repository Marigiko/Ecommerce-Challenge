#!/bin/sh

set -e

echo "🚀 Starting NestJS Ecommerce..."

echo "🗄 Running migrations..."
pnpm migration:run

echo "🌱 Running seeds..."
pnpm seed:run || echo "No seeds found"

echo "🔥 Starting application..."
node dist/main.js
