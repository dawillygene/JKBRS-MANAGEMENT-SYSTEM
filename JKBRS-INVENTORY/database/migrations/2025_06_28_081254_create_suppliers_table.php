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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company_name')->nullable();
            $table->string('contact_person');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('phone_alt')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('region')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->default('Tanzania');
            $table->string('tax_number')->nullable(); // TIN in Tanzania
            $table->string('business_license')->nullable();
            $table->enum('payment_terms', ['cash', 'net_15', 'net_30', 'net_60', 'net_90'])->default('net_30');
            $table->decimal('credit_limit', 15, 2)->default(0);
            $table->decimal('current_balance', 15, 2)->default(0);
            $table->enum('status', ['active', 'inactive', 'blacklisted'])->default('active');
            $table->decimal('rating', 3, 2)->nullable(); // 0.00 to 5.00
            $table->text('notes')->nullable();
            $table->json('documents')->nullable(); // Store document file paths
            $table->json('bank_details')->nullable();
            $table->timestamps();

            $table->index(['status', 'name']);
            $table->index('tax_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
