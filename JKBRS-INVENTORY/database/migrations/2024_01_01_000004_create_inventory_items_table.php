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
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->constrained('offices')->onDelete('cascade');
            $table->string('item_code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('unit'); // pieces, kg, liters, etc.
            $table->integer('quantity');
            $table->integer('minimum_stock')->default(0);
            $table->decimal('cost_price', 12, 2); // in Tsh
            $table->decimal('selling_price', 12, 2); // in Tsh
            $table->string('supplier')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('location')->nullable();
            $table->json('attributes')->nullable(); // Additional item properties
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};
