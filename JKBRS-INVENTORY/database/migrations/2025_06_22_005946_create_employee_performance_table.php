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
        Schema::create('employee_performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->foreignId('reviewer_id')->constrained('users');
            $table->string('review_period'); // Q1 2025, Annual 2024, etc.
            $table->date('review_date');
            $table->enum('review_type', ['probation', 'quarterly', 'mid_year', 'annual', 'project']);
            $table->json('goals')->nullable(); // Goals set for the period
            $table->json('achievements')->nullable(); // Achievements during the period
            $table->integer('overall_rating')->comment('1-10 scale');
            $table->json('ratings')->nullable(); // Detailed ratings by category
            $table->text('strengths')->nullable();
            $table->text('areas_for_improvement')->nullable();
            $table->text('development_plan')->nullable();
            $table->text('employee_comments')->nullable();
            $table->text('reviewer_comments')->nullable();
            $table->enum('status', ['draft', 'completed', 'acknowledged'])->default('draft');
            $table->timestamp('acknowledged_at')->nullable();
            $table->boolean('promotion_recommended')->default(false);
            $table->boolean('salary_increase_recommended')->default(false);
            $table->decimal('recommended_increase_percentage', 5, 2)->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['employee_id', 'review_period']);
            $table->index(['review_date', 'review_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_performance');
    }
};
