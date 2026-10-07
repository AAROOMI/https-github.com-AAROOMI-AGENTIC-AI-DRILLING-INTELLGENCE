# ==============================================================================
# Dockerfile: Agentic AI Drilling Intelligence & Well Design Platform
# Enterprise Multi-Stage Build with Offline Air-Gapped Compatibility
# ==============================================================================

FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* bun.lock* ./
RUN npm install

# Copy application source
COPY . .

# Build production assets
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV AIR_GAPPED=false

# Copy built artifacts and static server dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY server.ts ./server.ts

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application server
CMD ["node", "--loader", "tsx", "server.ts"]
