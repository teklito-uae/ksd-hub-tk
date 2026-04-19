<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\ProfessionalController;
use App\Http\Controllers\Api\PlaceController;

Route::prefix('v1')->group(function () {

    // ── Auth ──────────────────────────────────────────────────────────────────
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login',    [AuthController::class, 'login']);

    // ── Public read-only endpoints (cached in controllers) ────────────────────
    Route::get('/categories',          [CategoryController::class,    'index']);
    Route::get('/places',              [PlaceController::class,        'index']);
    Route::get('/businesses',          [BusinessController::class,     'index']);
    Route::get('/businesses/{slug}',   [BusinessController::class,     'show']);
    Route::get('/professionals',       [ProfessionalController::class, 'index']);
    Route::get('/professionals/{slug}',[ProfessionalController::class, 'show']);

    // ── Public write endpoints ────────────────────────────────────────────────
    Route::post('/inquiries', function (Request $request) {
        $data = $request->validate([
            'business_id'    => 'required|exists:businesses,id',
            'customer_name'  => 'required|string|max:100',
            'customer_phone' => 'required|string|max:20',
            'notes'          => 'nullable|string|max:500',
        ]);

        $inquiry = \App\Models\Inquiry::create(array_merge($data, ['status' => 'new']));
        return response()->json($inquiry, 201);
    });

    // ── Protected endpoints ───────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user',         [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
    });

    // ── Database Management (Secret) ──────────────────────────────────────────
    Route::get('/migrate-seed-secret', function () {
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true]);
            $o = "Migrations: " . \Illuminate\Support\Facades\Artisan::output();
            \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
            $o .= "\nSeeding: " . \Illuminate\Support\Facades\Artisan::output();
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            return response()->json(['message' => 'Success', 'output' => $o]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });
});
