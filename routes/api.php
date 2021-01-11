<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\HomeController;
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


Route::middleware('auth:api')->group(function() {
Route::get("user", [UserController::class, "userDetail"]);
});

Route::post('publish', [ParcelController::class, "store"]);

Route::middleware('auth:api')->group(function() {
Route::get("parcel", [ParcelController::class, "view"]);
    });

Route::post('upload', [HomeController::class, 'uploadimage'])->name('upload');