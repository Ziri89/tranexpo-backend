<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\ShipperController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, "registerUser"]);
Route::post('login', [UserController::class, "loginUser"]);

Route::post('registerShipper', [ShipperController::class, "registerShipper"]);
/*
Route::middleware('auth:api')->group(function() {
Route::get("shipper", [ShipperController::class, "shipperDetail"]);
});

Route::middleware('auth:api')->group(function() {
Route::get("user", [UserController::class, "userDetail"]);
});
*/
Route::post('publish', [ParcelController::class, "store"]);

Route::get('/parcelShow/{parcelShow}', [ParcelController::class, "show"])->name('parcelShow');;


/*Route::middleware('auth:api')->group(function() {
Route::get("parcelShow", [ParcelController::class, "show"]);
    });
*/
