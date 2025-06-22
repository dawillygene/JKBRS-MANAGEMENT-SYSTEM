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
        Schema::create('sales_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->constrained('offices')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Sales person
            $table->string('transaction_number')->unique();
            $table->enum('type', ['sale', 'purchase', 'transfer', 'adjustment']);
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->decimal('subtotal', 15, 2); // in Tsh
            $table->decimal('tax_amount', 15, 2)->default(0); // in Tsh
            $table->decimal('discount_amount', 15, 2)->default(0); // in Tsh
            $table->decimal('total_amount', 15, 2); // in Tsh
            $table->enum('payment_method', ['cash', 'mobile_money', 'bank_transfer', 'credit']);
            $table->enum('status', ['pending', 'completed', 'cancelled', 'refunded']);
            $table->text('notes')->nullable();
            $table->timestamp('transaction_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_transactions');
    }
};
