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
        Schema::create('employee_training', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('training_title');
            $table->string('training_type'); // internal, external, online, certification
            $table->string('provider')->nullable(); // Training provider/institution
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('duration_hours')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->string('location')->nullable();
            $table->string('instructor')->nullable();
            $table->enum('status', ['planned', 'in_progress', 'completed', 'cancelled'])->default('planned');
            $table->json('skills_gained')->nullable();
            $table->string('certificate_number')->nullable();
            $table->date('certificate_expiry')->nullable();
            $table->string('certificate_file')->nullable();
            $table->integer('assessment_score')->nullable();
            $table->text('feedback')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('added_by')->constrained('users');
            $table->timestamps();
            
            // Indexes
            $table->index(['employee_id', 'status']);
            $table->index(['start_date', 'end_date']);
            $table->index(['certificate_expiry']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_training');
    }
};
