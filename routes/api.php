<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\ShipperController;
use Mockery\Generator\StringManipulation\Pass\Pass;

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



Route::post('registerShipper', [ShipperController::class, "registerShipper"]);

/*Route::middleware('auth:api')->group(function() {
});
*/
Route::post('register', [UserController::class, "registerUser"]);
Route::post('login', [UserController::class, "loginUser"]);
    


//Route::get("shipper", [ShipperController::class, "shipperDetail"]);
/*
Route::middleware('auth:api')->group(function() {
Route::get("user", [UserController::class, "userDetail"]);
});
*/

Route::get('user/{id}', [UserController::class, "show"])->name('user');
Route::put('updateuser/{id}', [UserController::class, "updateUser"]);
Route::delete('deleteuser/{id}', [UserController::class, "deleteUser"]);
Route::put('updateshipper/{id}', [ShipperController::class, "updateShipper"]);

//Route::post('logout', [UserController::class, "logout"]);
$router->group(['middleware' => 'auth:api'], function () use ($router) {
    Route::get('logout', [UserController::class, 'logout']);
});

Route::post('publish', [ParcelController::class, "store"]);

Route::get('parcelShow', [ParcelController::class, "showAll"]);

Route::get('parcelShowById/{id}', [ParcelController::class, "show"])->name('parcelShowById');

Route::delete('delete/{id}', [ParcelController::class, "deleteParcel"])->name('delete');

Route::post('passengerPublish', [PassengerController::class, "store"]);
