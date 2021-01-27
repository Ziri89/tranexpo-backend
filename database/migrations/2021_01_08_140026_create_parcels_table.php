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
            $table->id();
            $table->string('countryFrom');
            $table->string('cityFrom');
            $table->string('checkFrom',10);
            $table->string('countryTo');
            $table->string('cityTo');
            $table->string('checkTo',10);
            $table->boolean('parcel');
            $table->boolean('envelope');
            $table->boolean('pallet');
            $table->string('cargoImg');
            $table->integer('quantity');
            $table->integer('weight');
            $table->integer('lenght');
            $table->integer('width');
            $table->integer('height');
            $table->date('shippingDate');
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
