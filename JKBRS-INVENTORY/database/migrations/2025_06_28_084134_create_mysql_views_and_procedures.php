<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Creates MySQL views and stored procedures for JKBRS-IMS database
     */
    public function up(): void
    {
        // Create views for better data access
        $this->createViews();
        
        // Create stored procedures for complex operations  
        $this->createStoredProcedures();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop stored procedures
        DB::statement('DROP PROCEDURE IF EXISTS GetLowStockItems');
        DB::statement('DROP PROCEDURE IF EXISTS GetInventoryValuation');
        DB::statement('DROP PROCEDURE IF EXISTS GetSalesReport');
        
        // Drop views
        DB::statement('DROP VIEW IF EXISTS v_current_inventory');
        DB::statement('DROP VIEW IF EXISTS v_low_stock_alerts');
        DB::statement('DROP VIEW IF EXISTS v_sales_summary');
    }

    /**
     * Create database views for JKBRS-IMS
     */
    private function createViews(): void
    {
        // View: Current inventory with product details
        DB::statement("
            CREATE OR REPLACE VIEW v_current_inventory AS
            SELECT 
                ii.id,
                ii.product_id,
                p.name as product_name,
                p.sku,
                c.name as category_name,
                ii.office_id,
                o.name as office_name,
                ii.quantity,
                ii.min_stock_level,
                CASE 
                    WHEN ii.quantity <= ii.min_stock_level THEN 'LOW'
                    ELSE 'OK'
                END as stock_status,
                p.cost_price,
                p.selling_price,
                (ii.quantity * p.cost_price) as total_value
            FROM inventory_items ii
            JOIN products p ON ii.product_id = p.id
            LEFT JOIN categories c ON p.category_id = c.id
            JOIN offices o ON ii.office_id = o.id
            WHERE p.is_active = 1
        ");

        // View: Low stock alerts
        DB::statement("
            CREATE OR REPLACE VIEW v_low_stock_alerts AS
            SELECT 
                ii.id,
                p.name as product_name,
                p.sku,
                o.name as office_name,
                ii.quantity,
                ii.min_stock_level,
                (ii.min_stock_level - ii.quantity) as shortage
            FROM inventory_items ii
            JOIN products p ON ii.product_id = p.id
            JOIN offices o ON ii.office_id = o.id
            WHERE ii.quantity <= ii.min_stock_level
            AND p.is_active = 1
        ");
    }

    /**
     * Create stored procedures for JKBRS-IMS
     */
    private function createStoredProcedures(): void
    {
        // Procedure: Get low stock items
        DB::statement("DROP PROCEDURE IF EXISTS GetLowStockItems");
        
        DB::statement("
            CREATE PROCEDURE GetLowStockItems(IN office_id_param INT)
            BEGIN
                IF office_id_param IS NULL THEN
                    SELECT * FROM v_low_stock_alerts ORDER BY shortage DESC;
                ELSE
                    SELECT * FROM v_low_stock_alerts 
                    WHERE office_name = (SELECT name FROM offices WHERE id = office_id_param)
                    ORDER BY shortage DESC;
                END IF;
            END
        ");
    }
};
