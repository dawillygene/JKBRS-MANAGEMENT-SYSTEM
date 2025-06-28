<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This migration adds MySQL-specific optimizations to existing tables for JKBRS-IMS database
     */
    public function up(): void
    {
        // Add optimized indexes to users table
        Schema::table('users', function (Blueprint $table) {
            if (!$this->indexExists('users', 'idx_users_email_active')) {
                $table->index(['email', 'email_verified_at'], 'idx_users_email_active');
            }
            if (!$this->indexExists('users', 'idx_users_role_office')) {
                $table->index(['role_id', 'office_id'], 'idx_users_role_office');
            }
            if (!$this->indexExists('users', 'idx_users_employee_id')) {
                $table->index('employee_id', 'idx_users_employee_id');
            }
        });

        // Add optimized indexes to offices table
        Schema::table('offices', function (Blueprint $table) {
            if (!$this->indexExists('offices', 'idx_offices_hierarchy')) {
                $table->index(['parent_office_id', 'office_type'], 'idx_offices_hierarchy');
            }
            if (!$this->indexExists('offices', 'idx_offices_type_status')) {
                $table->index(['type', 'status'], 'idx_offices_type_status');
            }
            if (!$this->indexExists('offices', 'idx_offices_manager')) {
                $table->index('manager_id', 'idx_offices_manager');
            }
        });

        // Add optimized indexes to roles table
        Schema::table('roles', function (Blueprint $table) {
            if (!$this->indexExists('roles', 'idx_roles_name')) {
                $table->index('name', 'idx_roles_name');
            }
        });

        // Add optimized indexes to inventory_items table (if it doesn't have product_variant_id yet)
        if (Schema::hasTable('inventory_items')) {
            Schema::table('inventory_items', function (Blueprint $table) {
                // Check if column exists before adding
                if (!Schema::hasColumn('inventory_items', 'product_variant_id')) {
                    $table->unsignedBigInteger('product_variant_id')->nullable()->after('product_id');
                    $table->foreign('product_variant_id')->references('id')->on('product_variants')->onDelete('cascade');
                }
                
                if (!Schema::hasColumn('inventory_items', 'reserved_quantity')) {
                    $table->decimal('reserved_quantity', 15, 3)->default(0)->after('quantity');
                }
                
                if (!Schema::hasColumn('inventory_items', 'min_stock_level')) {
                    $table->decimal('min_stock_level', 15, 3)->default(0)->after('reserved_quantity');
                }
                
                if (!Schema::hasColumn('inventory_items', 'reorder_point')) {
                    $table->decimal('reorder_point', 15, 3)->default(0)->after('min_stock_level');
                }

                // Add performance indexes
                if (!$this->indexExists('inventory_items', 'idx_inventory_low_stock')) {
                    $table->index(['quantity', 'min_stock_level'], 'idx_inventory_low_stock');
                }
                if (!$this->indexExists('inventory_items', 'idx_inventory_product_office')) {
                    $table->index(['product_id', 'office_id'], 'idx_inventory_product_office');
                }
            });
        }

        // Add optimized indexes to sales_transactions table
        if (Schema::hasTable('sales_transactions')) {
            Schema::table('sales_transactions', function (Blueprint $table) {
                if (!$this->indexExists('sales_transactions', 'idx_sales_date_office')) {
                    $table->index(['transaction_date', 'office_id'], 'idx_sales_date_office');
                }
                if (!$this->indexExists('sales_transactions', 'idx_sales_user_date')) {
                    $table->index(['user_id', 'transaction_date'], 'idx_sales_user_date');
                }
            });
        }

        // Add optimized indexes to transaction_items table
        if (Schema::hasTable('transaction_items')) {
            Schema::table('transaction_items', function (Blueprint $table) {
                if (!$this->indexExists('transaction_items', 'idx_transaction_items_product')) {
                    $table->index(['transaction_id', 'inventory_item_id'], 'idx_transaction_items_product');
                }
            });
        }

        // Add optimized indexes to employees table
        if (Schema::hasTable('employees')) {
            Schema::table('employees', function (Blueprint $table) {
                if (!$this->indexExists('employees', 'idx_employees_office_status')) {
                    $table->index(['office_id', 'status'], 'idx_employees_office_status');
                }
                if (!$this->indexExists('employees', 'idx_employees_manager')) {
                    $table->index('manager_id', 'idx_employees_manager');
                }
                if (!$this->indexExists('employees', 'idx_employees_hire_date')) {
                    $table->index('hire_date', 'idx_employees_hire_date');
                }
            });
        }

        // Set MySQL engine and charset for all tables
        $this->optimizeMySQLTables();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove custom indexes (keep foreign key indexes)
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('idx_users_email_active');
            $table->dropIndex('idx_users_role_office');
            $table->dropIndex('idx_users_employee_id');
        });

        Schema::table('offices', function (Blueprint $table) {
            $table->dropIndex('idx_offices_hierarchy');
            $table->dropIndex('idx_offices_location');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->dropIndex('idx_roles_name');
        });

        if (Schema::hasTable('inventory_items')) {
            Schema::table('inventory_items', function (Blueprint $table) {
                if ($this->indexExists('inventory_items', 'idx_inventory_low_stock')) {
                    $table->dropIndex('idx_inventory_low_stock');
                }
                if ($this->indexExists('inventory_items', 'idx_inventory_product_office')) {
                    $table->dropIndex('idx_inventory_product_office');
                }
            });
        }
    }

    /**
     * Check if an index exists on a table
     */
    private function indexExists(string $table, string $index): bool
    {
        $indexes = DB::select("SHOW INDEX FROM `{$table}` WHERE Key_name = ?", [$index]);
        return count($indexes) > 0;
    }

    /**
     * Optimize MySQL tables for JKBRS-IMS database
     */
    private function optimizeMySQLTables(): void
    {
        try {
            // Get all tables in the current database
            $tables = DB::select('SHOW TABLES');
            $databaseName = config('database.connections.mysql.database');
            
            foreach ($tables as $table) {
                $tableName = $table->{"Tables_in_{$databaseName}"};
                
                // Convert to InnoDB and set proper charset
                DB::statement("ALTER TABLE `{$tableName}` ENGINE=InnoDB");
                DB::statement("ALTER TABLE `{$tableName}` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            }
        } catch (\Exception $e) {
            // Log error but don't fail migration
            Log::warning("MySQL optimization failed: " . $e->getMessage());
        }
    }
};
