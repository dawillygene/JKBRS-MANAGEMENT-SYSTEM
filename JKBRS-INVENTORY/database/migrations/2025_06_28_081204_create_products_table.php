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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('sku')->unique();
            $table->string('barcode')->nullable()->unique();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->decimal('cost_price', 15, 2)->default(0);
            $table->decimal('selling_price', 15, 2)->default(0);
            $table->decimal('min_price', 15, 2)->nullable(); // Minimum selling price
            $table->string('unit_of_measure')->default('pieces'); // kg, liters, pieces, etc.
            $table->json('images')->nullable(); // Array of image URLs
            $table->decimal('weight', 8, 3)->nullable();
            $table->json('dimensions')->nullable(); // length, width, height
            $table->text('specifications')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('track_quantity')->default(true);
            $table->boolean('has_variants')->default(false);
            $table->json('tags')->nullable(); // For search and categorization
            $table->json('metadata')->nullable(); // Additional product data
            $table->timestamps();

            // Foreign keys
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            
            // Performance indexes
            $table->index(['category_id', 'is_active'], 'idx_products_category_active');
            $table->index('sku', 'idx_products_sku');
            $table->index('barcode', 'idx_products_barcode');
            $table->index(['is_active', 'track_quantity'], 'idx_products_active_track');
            $table->fullText('name', 'idx_products_name_fulltext');
        });
        
        // Set table engine and charset for MySQL optimization
        DB::statement('ALTER TABLE products ENGINE = InnoDB');
        DB::statement('ALTER TABLE products CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
