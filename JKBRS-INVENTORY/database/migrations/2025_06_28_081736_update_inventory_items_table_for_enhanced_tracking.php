<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('inventory_items', function (Blueprint $table) {
            // Add product_id first (linking to products table)
            if (!Schema::hasColumn('inventory_items', 'product_id')) {
                $table->unsignedBigInteger('product_id')->nullable()->after('id');
            }
            
            // Add product variant support if not exists
            if (!Schema::hasColumn('inventory_items', 'product_variant_id')) {
                $table->unsignedBigInteger('product_variant_id')->nullable()->after('product_id');
            }
            
            // Enhanced quantity tracking - add only if not exists
            if (!Schema::hasColumn('inventory_items', 'reserved_quantity')) {
                $table->decimal('reserved_quantity', 15, 3)->default(0)->after('quantity');
            }
            if (!Schema::hasColumn('inventory_items', 'available_quantity')) {
                $table->decimal('available_quantity', 15, 3)->default(0)->after('reserved_quantity');
            }
            if (!Schema::hasColumn('inventory_items', 'damaged_quantity')) {
                $table->decimal('damaged_quantity', 15, 3)->default(0)->after('available_quantity');
            }
            
            // Stock level management
            if (!Schema::hasColumn('inventory_items', 'min_stock_level')) {
                $table->decimal('min_stock_level', 15, 3)->default(0)->after('damaged_quantity');
            }
            if (!Schema::hasColumn('inventory_items', 'max_stock_level')) {
                $table->decimal('max_stock_level', 15, 3)->nullable()->after('min_stock_level');
            }
            if (!Schema::hasColumn('inventory_items', 'reorder_point')) {
                $table->decimal('reorder_point', 15, 3)->default(0)->after('max_stock_level');
            }
            if (!Schema::hasColumn('inventory_items', 'reorder_quantity')) {
                $table->decimal('reorder_quantity', 15, 3)->default(0)->after('reorder_point');
            }
            
            // Cost tracking
            if (!Schema::hasColumn('inventory_items', 'average_cost')) {
                $table->decimal('average_cost', 15, 2)->default(0)->after('reorder_quantity');
            }
            if (!Schema::hasColumn('inventory_items', 'last_cost')) {
                $table->decimal('last_cost', 15, 2)->default(0)->after('average_cost');
            }
            if (!Schema::hasColumn('inventory_items', 'total_value')) {
                $table->decimal('total_value', 15, 2)->default(0)->after('last_cost');
            }
            
            // Add missing columns for full tracking
            if (!Schema::hasColumn('inventory_items', 'batch_number')) {
                $table->string('batch_number')->nullable();
            }
            if (!Schema::hasColumn('inventory_items', 'serial_numbers')) {
                $table->text('serial_numbers')->nullable();
            }
            if (!Schema::hasColumn('inventory_items', 'metadata')) {
                $table->json('metadata')->nullable();
            }
        });

        // Add foreign keys and indexes in a separate statement
        Schema::table('inventory_items', function (Blueprint $table) {
            // Add foreign key for variant if column exists
            if (Schema::hasColumn('inventory_items', 'product_variant_id')) {
                try {
                    $table->foreign('product_variant_id')->references('id')->on('product_variants')->onDelete('cascade');
                } catch (\Exception $e) {
                    // Foreign key might already exist
                }
            }
        });
    }

    public function down(): void
    {
        Schema::table('inventory_items', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
            $table->dropIndex(['product_variant_id']);
            $table->dropIndex(['min_stock_level', 'available_quantity']);
            $table->dropIndex(['expiry_date', 'track_expiry']);
            $table->dropIndex(['last_movement_date']);
            
            $table->dropColumn([
                'product_variant_id', 'reserved_quantity', 'available_quantity', 'damaged_quantity',
                'min_stock_level', 'max_stock_level', 'reorder_point', 'reorder_quantity',
                'average_cost', 'last_cost', 'total_value', 'last_movement_date', 'last_count_date',
                'last_sale_date', 'last_purchase_date', 'bin_locations', 'track_expiry',
                'expiry_date', 'batch_number', 'serial_numbers', 'metadata'
            ]);
        });
    }
    
    /**
     * Check if an index exists on a table
     */
    private function indexExists(string $table, string $index): bool
    {
        try {
            $indexes = DB::select("SHOW INDEX FROM `{$table}` WHERE Key_name = ?", [$index]);
            return count($indexes) > 0;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Check if a foreign key exists on a table
     */
    private function foreignKeyExists(string $table, string $foreignKey): bool
    {
        try {
            $foreignKeys = DB::select("
                SELECT CONSTRAINT_NAME 
                FROM information_schema.KEY_COLUMN_USAGE 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = ? 
                AND CONSTRAINT_NAME = ?
            ", [$table, $foreignKey]);
            return count($foreignKeys) > 0;
        } catch (\Exception $e) {
            return false;
        }
    }
};
