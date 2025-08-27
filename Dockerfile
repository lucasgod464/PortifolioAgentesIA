# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend only
RUN npm run build 2>/dev/null || npx vite build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built frontend
COPY --from=builder /app/dist/public ./dist/public

# Copy standalone server
COPY server/standalone.js ./server/

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start with standalone server
CMD ["node", "server/standalone.js"]