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
        Schema::create('payroll', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('office_id')->constrained('offices')->onDelete('cascade');
            $table->string('period_month'); // 2024-01
            $table->decimal('basic_salary', 12, 2); // in Tsh
            $table->decimal('allowances', 12, 2)->default(0); // in Tsh
            $table->decimal('overtime_pay', 12, 2)->default(0); // in Tsh
            $table->decimal('deductions', 12, 2)->default(0); // in Tsh
            $table->decimal('tax_deduction', 12, 2)->default(0); // in Tsh
            $table->decimal('net_salary', 12, 2); // in Tsh
            $table->enum('status', ['pending', 'approved', 'paid']);
            $table->date('pay_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['user_id', 'period_month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll');
    }
};
