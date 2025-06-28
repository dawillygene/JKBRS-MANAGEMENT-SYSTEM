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
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('office_id');
            $table->string('name');
            $table->string('code')->unique(); // WHD001, WHM002, etc.
            $table->text('description')->nullable();
            $table->text('location');
            $table->string('city');
            $table->string('region')->nullable();
            $table->unsignedBigInteger('manager_id')->nullable(); // User who manages this warehouse
            $table->decimal('capacity', 15, 2)->nullable(); // In cubic meters or square meters
            $table->string('capacity_unit')->default('sqm'); // sqm, cbm, etc.
            $table->enum('type', ['main', 'storage', 'transit', 'retail'])->default('storage');
            $table->boolean('is_active')->default(true);
            $table->json('operating_hours')->nullable(); // Store business hours
            $table->string('contact_phone')->nullable();
            $table->decimal('temperature_min', 5, 2)->nullable(); // For climate control
            $table->decimal('temperature_max', 5, 2)->nullable();
            $table->boolean('climate_controlled')->default(false);
            $table->boolean('security_system')->default(false);
            $table->json('features')->nullable(); // Additional warehouse features
            $table->timestamps();

            $table->foreign('office_id')->references('id')->on('offices')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['office_id', 'is_active']);
            $table->index('code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouses');
    }
};
