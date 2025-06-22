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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('office_id')->constrained()->onDelete('cascade');
            $table->foreignId('manager_id')->nullable()->constrained('employees')->onDelete('set null');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('position');
            $table->string('department');
            $table->enum('employment_type', ['full_time', 'part_time', 'contract', 'intern']);
            $table->date('hire_date');
            $table->date('probation_end_date')->nullable();
            $table->decimal('basic_salary', 12, 2);
            $table->json('allowances')->nullable(); // Transport, housing, etc.
            $table->string('bank_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('nssf_number')->nullable();
            $table->string('tax_number')->nullable();
            $table->string('national_id')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed']);
            $table->text('address')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('emergency_contact_relationship')->nullable();
            $table->string('profile_photo')->nullable();
            $table->enum('status', ['active', 'inactive', 'terminated', 'resigned'])->default('active');
            $table->date('termination_date')->nullable();
            $table->text('termination_reason')->nullable();
            $table->json('skills')->nullable();
            $table->json('qualifications')->nullable();
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['office_id', 'status']);
            $table->index(['manager_id']);
            $table->index(['employee_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
