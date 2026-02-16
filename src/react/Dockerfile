# ==========================================
# Dockerfile Padrão - Aponta para DEV ou PROD
# ==========================================
# Use docker-compose para desenvolvimento
# Use Dockerfile.prod para produção

# Para desenvolvimento, usar Dockerfile.dev
FROM node:23-slim AS development

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ==========================================
# Multi-stage para PRODUÇÃO
# ==========================================
FROM node:23-slim AS builder

WORKDIR /app

COPY projeto/package*.json projeto/bun.lockb ./
RUN npm ci --only=production && npm cache clean --force

COPY projeto/ ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

# ========== STAGE 2: Nginx ==========
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]