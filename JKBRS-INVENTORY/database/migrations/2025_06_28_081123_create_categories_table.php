<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('metadata')->nullable(); // For additional attributes
            $table->timestamps();

            // Foreign keys
            $table->foreign('parent_id')->references('id')->on('categories')->onDelete('cascade');
            
            // Performance indexes
            $table->index(['parent_id', 'is_active'], 'idx_categories_parent_active');
            $table->index('slug', 'idx_categories_slug');
            $table->fullText('name', 'idx_categories_name_fulltext');
        });
        
        // Set table engine and charset for MySQL optimization
        DB::statement('ALTER TABLE categories ENGINE = InnoDB');
        DB::statement('ALTER TABLE categories CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
