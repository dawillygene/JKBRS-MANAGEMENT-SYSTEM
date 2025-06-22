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
        Schema::table('offices', function (Blueprint $table) {
            // Add new fields for office management
            $table->string('office_code', 10)->nullable()->after('name');
            $table->string('office_type')->default('branch')->after('office_code');
            $table->string('location')->nullable()->after('office_type');
            $table->string('contact_phone', 20)->nullable()->after('location');
            $table->string('contact_email')->nullable()->after('contact_phone');
            $table->foreignId('manager_id')->nullable()->constrained('users')->after('contact_email');
            $table->decimal('budget_allocated', 15, 2)->nullable()->after('manager_id');
            $table->decimal('budget_spent', 15, 2)->default(0)->after('budget_allocated');
            $table->string('budget_period')->default('yearly')->after('budget_spent');
            $table->text('budget_notes')->nullable()->after('budget_period');
            $table->text('description')->nullable()->after('budget_notes');
            $table->string('status')->default('active')->after('description');
            $table->date('opening_date')->nullable()->after('status');
            $table->date('closing_date')->nullable()->after('opening_date');
            
            // Add indexes for performance
            $table->index('office_code');
            $table->index('office_type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offices', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
            $table->dropIndex(['office_code']);
            $table->dropIndex(['office_type']);
            $table->dropIndex(['status']);
            
            $table->dropColumn([
                'office_code',
                'office_type',
                'location',
                'contact_phone',
                'contact_email',
                'manager_id',
                'budget_allocated',
                'budget_spent',
                'budget_period',
                'budget_notes',
                'description',
                'status',
                'opening_date',
                'closing_date',
            ]);
        });
    }
};
