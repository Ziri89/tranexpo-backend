<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParcelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parcels', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->bigIncrements('id');
            $table->string('countryFrom');
            $table->string('cityFrom');
            $table->text('checkFrom');
            $table->string('countryTo');
            $table->string('cityTo');
            $table->text('checkTo');
            $table->boolean('typeOfGoods');
            $table->string('image')->default('')->nullable();
            $table->integer('quantity');
            $table->integer('weight');
            $table->integer('lenght');
            $table->integer('width');
            $table->integer('height');
            $table->date('shippingDate');
            $table->foreignId('user_id')->constrained('users')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('parcels');
    }
}
