FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec1f2736887072d9d#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Development image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during development.
# ENV NEXT_TELEMETRY_DISABLED 1

# Generate prisma client if prisma folder exists
RUN if [ -d "prisma" ]; then npx prisma generate; fi

EXPOSE 8003

# Next.js will automatically use port 8003 as overridden in docker-compose or via CLI
CMD ["npm", "run", "dev", "--", "-p", "8003"]
