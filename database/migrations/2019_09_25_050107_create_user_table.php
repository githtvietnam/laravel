<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('catalogueid');
            $table->string('password', 50);
            $table->string('fullname', 50);
            $table->string('email', 100)->unique();
            $table->string('phone', 20)->unique();
            $table->string('cityid', 10);
            $table->string('districtid', 10);
            $table->string('wardid', 10);
            $table->string('address', 255);
            $table->tinyInteger('gender');
            $table->tinyInteger('married');
            $table->dateTime('birthday');
            $table->string('varchar', 255);
            $table->integer('remote_addr');
            $table->string('user_agent');
            $table->dateTime('last_login');
            $table->integer('publish');
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
        Schema::dropIfExists('user');
    }
}
