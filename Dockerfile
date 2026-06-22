# =============================================================================
# 0UTL1ER homepage — Next.js (App Router) production image
# Multi-stage: deps → builder → runner. Uses Next standalone output so the
# final image carries only the server bundle + static assets (no dev deps).
# =============================================================================

# ---- deps: install node_modules from a clean lockfile ----------------------
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the app ----------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* は browser bundle に焼き込まれる public な値（secret ではない）。
# 未設定なら strapi.ts はサンプルデータにフォールバックする。
ARG NEXT_PUBLIC_STRAPI_URL=""
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- runner: minimal runtime ------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# public assets (画像など) と standalone server + static を配置
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# STRAPI_TOKEN など server 専用 secret は runtime env で渡す（image には焼かない）。
CMD ["node", "server.js"]
