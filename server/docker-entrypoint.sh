#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push --accept-data-loss

echo "Seeding cities and restaurants..."
npx tsx prisma/seed.ts || echo "Seed skipped or failed"

echo "Starting server on port ${PORT:-3200}..."
exec node dist/server.js
