<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::get('parcel', function () {
    return response(['Parcel 1', 'Parcel 2', 'Parcel 3'],200);
});
 
Route::get('parcel/{parcel}', function ($parcelId) {
    return response()->json(['parcelId' => "{$parcelId}"], 200);
});
  
 
Route::post('parcel', function() {
    return  response()->json([
            'message' => 'Create success'
        ], 201);
});
 
Route::put('parcel/{parcel}', function() {
    return  response()->json([
            'message' => 'Update success'
        ], 200);
});
 
Route::delete('parcel/{parcel}',function() {
    return  response()->json(null, 204);
});