<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->string('variant_name'); // Size, Color, Material, etc.
            $table->string('variant_value'); // Large, Red, Cotton, etc.
            $table->string('sku')->unique();
            $table->string('barcode')->nullable();
            $table->decimal('price_adjustment', 15, 2)->default(0); // +/- from base price
            $table->decimal('cost_adjustment', 15, 2)->default(0); // +/- from base cost
            $table->decimal('weight', 8, 3)->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('attributes')->nullable(); // Additional variant attributes
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->unique(['product_id', 'variant_name', 'variant_value']);
            $table->index(['product_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
