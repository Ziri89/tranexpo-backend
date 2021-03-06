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
            $table->text('typeOfGoods');
            $table->string('image')->default('')->nullable();
            $table->string('quantity');
            $table->string('weight');
            $table->string('lenght');
            $table->string('width');
            $table->string('height');
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
