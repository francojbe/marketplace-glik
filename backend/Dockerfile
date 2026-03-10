FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for some node modules
RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/medusa-config.ts ./
COPY --from=builder /app/src/scripts ./src/scripts

EXPOSE 9000

# Start Medusa
CMD ["yarn", "start"]
