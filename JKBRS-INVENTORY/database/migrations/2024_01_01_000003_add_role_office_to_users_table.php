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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null');
            $table->foreignId('office_id')->nullable()->constrained('offices')->onDelete('set null');
            $table->string('employee_id')->nullable()->unique();
            $table->string('phone')->nullable();
            $table->date('hire_date')->nullable();
            $table->decimal('salary', 12, 2)->nullable();
            $table->enum('employment_status', ['active', 'inactive', 'terminated'])->default('active');
            $table->json('permissions')->nullable(); // Additional user-specific permissions
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['office_id']);
            $table->dropColumn([
                'role_id', 'office_id', 'employee_id', 'phone', 
                'hire_date', 'salary', 'employment_status', 'permissions'
            ]);
        });
    }
};
