
a2enmod rewrite

x
cp /var/www/html/apache-config.conf /etc/apache2/sites-available/000-default.conf


cd /var/www/html


composer install --no-interaction


chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage


php artisan migrate --force


apache2-foreground

