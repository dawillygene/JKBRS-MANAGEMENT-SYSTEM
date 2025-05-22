<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitorsTable extends Migration
{
    public function up()
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->integer('count')->default(0);
            $table->timestamps();
        });

        // Initialize the visitor count if not exists
        DB::table('visitors')->insert([
            'count' => 0,
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('visitors');
    }
}

