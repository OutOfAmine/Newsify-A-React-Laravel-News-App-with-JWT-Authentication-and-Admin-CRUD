<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{

    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->integer('category');
            $table->date('date_debut');
            $table->date('date_expiration');
        });
    }

    public function down()
    {
        Schema::dropIfExists('news');
    }
}
