<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post("register",[AuthController::class,"register"]);
Route::post("login",[AuthController::class,"login"]);
Route::delete("logout",[AuthController::class,"logout"])->middleware('auth:sanctum');

Route::prefix('user')->middleware('auth:sanctum')->group(function() {
    Route::get('profile', [UserController::class, 'profile']);
});