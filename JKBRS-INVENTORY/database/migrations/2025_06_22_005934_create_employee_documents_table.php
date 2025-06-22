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
        Schema::create('employee_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('document_type'); // contract, certificate, id_copy, cv, etc.
            $table->string('document_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->integer('file_size');
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('issued_by')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['active', 'expired', 'replaced'])->default('active');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamps();
            
            // Indexes
            $table->index(['employee_id', 'document_type']);
            $table->index(['status', 'expiry_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_documents');
    }
};
