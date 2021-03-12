<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStartPayToShippers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shippers', function (Blueprint $table) {
            $table->date('startPay')->nullable();
            $table->date('endPay')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shippers', function (Blueprint $table) {
           /* $table->dropColumn()('startPay');
            $table->dropColumn()('endPay');*/
        });
    }
}
