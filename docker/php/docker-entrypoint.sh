#!/bin/sh
set -e

if [ "$APP_ENV" = "development" ]; then
    echo "Running in DEVELOPMENT mode..."
    
    composer install --no-interaction --prefer-dist

    php artisan config:clear || true
    php artisan route:clear || true
    php artisan view:clear || true

else
    echo "Running in PRODUCTION mode..."

    php artisan config:cache || true
    php artisan route:cache || true
    php artisan view:cache || true

    echo "Running database migrations..."
    php artisan migrate --force
fi

chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

echo "Starting PHP-FPM..."
exec php-fpm