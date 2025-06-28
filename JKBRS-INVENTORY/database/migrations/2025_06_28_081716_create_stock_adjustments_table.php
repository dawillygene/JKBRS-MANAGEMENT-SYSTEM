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
        Schema::create('stock_adjustments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_variant_id')->nullable();
            $table->unsignedBigInteger('warehouse_id');
            $table->decimal('old_quantity', 15, 3);
            $table->decimal('new_quantity', 15, 3);
            $table->decimal('adjustment_quantity', 15, 3); // new - old
            $table->enum('reason', [
                'damage', 'expiry', 'theft', 'loss', 'found', 
                'recount', 'system_error', 'transfer_correction', 'other'
            ]);
            $table->text('reason_description')->nullable();
            $table->decimal('unit_cost', 15, 2)->nullable();
            $table->decimal('total_value_impact', 15, 2)->nullable(); // Financial impact
            $table->unsignedBigInteger('adjusted_by'); // User who made adjustment
            $table->unsignedBigInteger('approved_by')->nullable(); // User who approved
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('adjustment_date')->useCurrent();
            $table->timestamp('approved_at')->nullable();
            $table->json('supporting_documents')->nullable(); // File paths for evidence
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('product_variant_id')->references('id')->on('product_variants')->onDelete('cascade');
            $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
            $table->foreign('adjusted_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('restrict');
            
            $table->index(['product_id', 'warehouse_id', 'adjustment_date']);
            $table->index(['status', 'adjustment_date']);
            $table->index('reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_adjustments');
    }
};
