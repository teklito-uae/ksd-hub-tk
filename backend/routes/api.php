<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\ProfessionalController;

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Public Directory Routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/businesses', [BusinessController::class, 'index']);
    Route::get('/businesses/{slug}', [BusinessController::class, 'show']);
    Route::get('/professionals', [ProfessionalController::class, 'index']);
    Route::get('/professionals/{slug}', [ProfessionalController::class, 'show']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        
        // Future Dashboard Routes
        // Route::get('/dashboard/stats', ...);
    });
});
