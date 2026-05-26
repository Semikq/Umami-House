#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push

echo "Starting server on port ${PORT:-3200}..."
exec node dist/server.js
