FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy all files needed for build
COPY package.json yarn.lock tsconfig.json medusa-config.ts ./

# Install ALL dependencies (including devDeps like typescript)
RUN yarn install --frozen-lockfile

# Copy source
COPY src/ ./src/

# Build Medusa
RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts and dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/medusa-config.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/src ./src

EXPOSE 9000

# Start Medusa via npx to ensure the bin is found
CMD ["npx", "medusa", "start"]
