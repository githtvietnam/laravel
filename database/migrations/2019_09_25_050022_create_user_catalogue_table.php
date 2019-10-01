<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCatalogueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_catalogues', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', '100');
            $table->longText('permission');
            $table->tinyInteger('publish');
            $table->integer('userid_created');
            $table->integer('userid_updated');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_catalogue');
    }
}
