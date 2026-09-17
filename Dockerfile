# ===== ESTÁGIO 1: COMPILAÇÃO DOS ASSETS DE PRODUÇÃO (NODE) =====
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run prod


# ===== ESTÁGIO 2: BASE COMUM DO PHP =====
FROM php:8.3-fpm AS base

RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libpng-dev libonig-dev libxml2-dev \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql calendar \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .


# ===== ESTÁGIO 3: DESENVOLVIMENTO LOCAL =====
FROM base AS development

COPY docker/php/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]


# ===== ESTÁGIO 4: PRODUÇÃO FINAL =====
FROM base AS production

COPY --from=frontend-builder /app/public /var/www/public

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

COPY docker/php/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]