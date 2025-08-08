#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
npx prisma db push --accept-data-loss

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Start the application
echo "Starting application..."
exec "$@" 