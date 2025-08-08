# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy Prisma schema first
COPY prisma ./prisma

# Generate Prisma client for Alpine Linux
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Make startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application with migrations
CMD ["/bin/sh", "./start.sh"] 