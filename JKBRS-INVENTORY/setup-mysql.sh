#!/bin/bash

# JKBRS Inventory Management System - MySQL Database Setup Script
# This script sets up the MySQL database with optimal configuration

echo "🚀 JKBRS IMS - MySQL Database Setup"
echo "=================================="

# Database configuration
DB_NAME="JKBRS-IMS"
DB_USER="venlit"
DB_PASSWORD="venlit" # Change this to a secure password
ROOT_PASSWORD=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if MySQL is running
if ! systemctl is-active --quiet mysql; then
    print_error "MySQL is not running. Please start MySQL service first."
    print_status "Run: sudo systemctl start mysql"
    exit 1
fi

print_status "MySQL service is running ✓"

# Prompt for root password if not set
if [ -z "$ROOT_PASSWORD" ]; then
    echo -n "Enter MySQL root password: "
    read -s ROOT_PASSWORD
    echo
fi

# Create database
print_status "Creating database '$DB_NAME'..."
mysql -u root -p"$ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -eq 0 ]; then
    print_status "Database '$DB_NAME' created successfully ✓"
else
    print_error "Failed to create database. Please check your root password."
    exit 1
fi

# Create application user
print_status "Creating application user '$DB_USER'..."
mysql -u root -p"$ROOT_PASSWORD" <<EOF
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON $DB_NAME.* TO '$DB_USER'@'localhost';
GRANT CREATE, ALTER, INDEX, DROP ON $DB_NAME.* TO '$DB_USER'@'localhost';
GRANT EXECUTE ON $DB_NAME.* TO '$DB_USER'@'localhost';
GRANT TRIGGER ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    print_status "User '$DB_USER' created successfully ✓"
else
    print_error "Failed to create application user."
    exit 1
fi

# Configure MySQL for optimal performance
print_status "Configuring MySQL for optimal performance..."
mysql -u root -p"$ROOT_PASSWORD" <<EOF
SET GLOBAL innodb_buffer_pool_size = 134217728; -- 128MB
SET GLOBAL query_cache_size = 16777216; -- 16MB
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL log_queries_not_using_indexes = 'ON';
EOF

print_status "MySQL performance configuration applied ✓"

# Create .env database configuration
print_status "Updating .env database configuration..."
cat > .env.database << EOF
# Database Configuration for JKBRS IMS
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=$DB_NAME
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASSWORD
EOF

print_status ".env.database file created ✓"

# Test database connection
print_status "Testing database connection..."
mysql -u "$DB_USER" -p"$DB_PASSWORD" -h 127.0.0.1 -e "SELECT 'Connection successful!' as status;" "$DB_NAME"

if [ $? -eq 0 ]; then
    print_status "Database connection test successful ✓"
else
    print_error "Database connection test failed!"
    exit 1
fi

echo
echo "🎉 MySQL Database Setup Complete!"
echo "=================================="
echo "Database Name: $DB_NAME"
echo "Database User: $DB_USER"
echo "Database Host: 127.0.0.1:3306"
echo
echo "📝 Next Steps:"
echo "1. Update your .env file with the database credentials:"
echo "   cp .env.database .env.backup && cat .env.database >> .env"
echo "2. Run Laravel migrations:"
echo "   php artisan migrate"
echo "3. Seed the database:"
echo "   php artisan db:seed"
echo
print_warning "Please save the database password securely: $DB_PASSWORD"
echo
