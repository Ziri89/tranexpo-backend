<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\ShipperController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\RatingController;

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

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('registerShipper', [ShipperController::class, "registerShipper"]);
Route::post('registerAdmin', [AdminController::class, "registerAdmin"]);

Route::middleware('api')->group(function() {
    Route::post('register', [UserController::class, "registerUser"]);
    Route::post('login', [UserController::class, "loginUser"]);
});


Route::get('/verified-only', function(Request $request){

    dd('your are verified', $request->user()->name);
})->middleware('auth:api','verified');

Route::get('/email/resend', 'Api\VerificationController@resend')->name('verification.resend');

Route::get('/email/verify/{id}/{hash}', 'Api\VerificationController@verify')->name('verification.verify');


Route::get('user/{id}', [UserController::class, "show"])->name('user');
Route::get('userAll/', [UserController::class, "showAll"])->name('userAll');
Route::put('updateuser/{id}', [UserController::class, "updateUser"]);
Route::delete('deleteuser/{id}', [UserController::class, "deleteUser"]);
Route::get('shipper/{id}', [ShipperController::class, "show"])->name('shipper');
Route::put('updateshipper/{id}', [ShipperController::class, "updateShipper"]);
Route::get('shipperAll/', [ShipperController::class, "showAll"])->name('shipperAll');
Route::delete('deleteshipper/{id}', [ShipperController::class, "deleteShipper"]);

$router->group(['middleware' => 'api'], function () use ($router) {
    Route::get('logout', [UserController::class, 'logout']);
});

Route::post('publish', [ParcelController::class, "store"]);

Route::get('parcelShow', [ParcelController::class, "showAll"]);

Route::get('parcelShowById/{id}', [ParcelController::class, "show"])->name('parcelShowById');

Route::delete('deleteParcel/{id}', [ParcelController::class, "deleteParcel"])->name('deleteParcel');

Route::post('passengerPublish', [PassengerController::class, "store"]);

Route::get('passengerShow', [PassengerController::class, "showAll"]);

Route::get('passengerShowById/{id}', [PassengerController::class, "show"])->name('passengerShowById');

Route::delete('deletePassenger/{id}', [PassengerController::class, "deletePassenger"])->name('deletePassenger');

Route::post('price', [AuctionController::class, 'store']);

Route::get('priceShow', [AuctionController::class, "showAll"]);

Route::get('priceShowById/{id}', [AuctionController::class, "show"])->name('priceShowById');

Route::post('rate', [RatingController::class, 'store']);

Route::get('rateShow', [RatingController::class, 'showAll']);

Route::get('rateShowById/{id}', [RatingController::class, 'show'])->name('rateShowById');
