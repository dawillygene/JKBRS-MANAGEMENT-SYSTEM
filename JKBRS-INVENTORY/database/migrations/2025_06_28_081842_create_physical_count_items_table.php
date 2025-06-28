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
        Schema::create('physical_count_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('physical_count_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_variant_id')->nullable();
            $table->decimal('system_quantity', 15, 3); // Quantity according to system
            $table->decimal('counted_quantity', 15, 3)->nullable(); // Actual counted quantity
            $table->decimal('variance', 15, 3)->nullable(); // counted - system
            $table->decimal('unit_cost', 15, 2);
            $table->decimal('variance_value', 15, 2)->nullable(); // variance * unit_cost
            $table->enum('status', ['pending', 'counted', 'verified', 'adjusted'])->default('pending');
            $table->text('notes')->nullable(); // Notes about this specific item count
            $table->unsignedBigInteger('counted_by')->nullable(); // Who counted this item
            $table->timestamp('counted_at')->nullable();
            $table->unsignedBigInteger('verified_by')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->json('recount_history')->nullable(); // Track if item was recounted
            $table->timestamps();

            $table->foreign('physical_count_id')->references('id')->on('physical_counts')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('product_variant_id')->references('id')->on('product_variants')->onDelete('cascade');
            $table->foreign('counted_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('verified_by')->references('id')->on('users')->onDelete('set null');
            
            $table->unique(['physical_count_id', 'product_id', 'product_variant_id'], 'uq_count_product_variant');
            $table->index(['physical_count_id', 'status'], 'idx_count_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physical_count_items');
    }
};
