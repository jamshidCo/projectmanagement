# Frontend Dockerfile (multi-stage)
FROM node:20-alpine AS deps
WORKDIR /app
# Copy Yarn core config and lockfiles first for better layer caching
COPY .yarn/ .yarn/
COPY .yarnrc.yml package.json yarn.lock* ./
# Enable Corepack and install dependencies strictly according to yarn.lock
RUN corepack enable && yarn install --immutable

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY .yarn/ .yarn/
COPY .yarnrc.yml package.json yarn.lock* ./
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1 \
	NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN yarn build

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner
WORKDIR /app
ENV NODE_ENV=production \
	NEXT_TELEMETRY_DISABLED=1

# Copy standalone output (reduces image size) and public assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["server.js"]
