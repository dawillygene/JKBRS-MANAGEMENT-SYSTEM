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
        Schema::create('physical_counts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('warehouse_id');
            $table->string('count_number')->unique(); // PC2025001, PC2025002, etc.
            $table->string('name'); // "Q1 2025 Annual Count", "Spot Check - Electronics"
            $table->text('description')->nullable();
            $table->date('scheduled_date');
            $table->date('start_date')->nullable();
            $table->date('completion_date')->nullable();
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled');
            $table->enum('type', ['full', 'partial', 'cycle', 'spot'])->default('full');
            $table->unsignedBigInteger('counted_by'); // Primary counter
            $table->json('counter_team')->nullable(); // Array of user IDs involved in counting
            $table->unsignedBigInteger('verified_by')->nullable(); // Who verified the count
            $table->unsignedBigInteger('approved_by')->nullable(); // Final approver
            $table->integer('total_items_to_count')->default(0);
            $table->integer('items_counted')->default(0);
            $table->integer('discrepancies_found')->default(0);
            $table->decimal('total_value_discrepancy', 15, 2)->default(0);
            $table->json('categories_included')->nullable(); // Category IDs to include
            $table->json('products_included')->nullable(); // Specific product IDs if partial
            $table->text('notes')->nullable();
            $table->json('settings')->nullable(); // Count configuration settings
            $table->timestamps();

            $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
            $table->foreign('counted_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('verified_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('restrict');
            
            $table->index(['warehouse_id', 'status']);
            $table->index(['scheduled_date', 'status']);
            $table->index('count_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physical_counts');
    }
};
