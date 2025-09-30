FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20-alpine

WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup


COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./

USER appuser

EXPOSE 3000

CMD ["node", "dist/main"]