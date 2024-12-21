<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('social_media_links', function (Blueprint $table) {
            $table->id();
            $table->string('platform'); 
            $table->string('url'); 
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('social_media_links');
    }
};
