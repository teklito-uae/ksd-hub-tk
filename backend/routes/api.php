<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\ProfessionalController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\AdminController;

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
    Route::get('/blog',                [BlogController::class,         'index']);
    Route::get('/blog/{slug}',         [BlogController::class,         'show']);

    // ── Public write endpoints ────────────────────────────────────────────────
    Route::post('/inquiries', function (Request $request) {
        $data = $request->validate([
            'business_id'     => 'nullable|exists:businesses,id',
            'professional_id' => 'nullable|exists:professionals,id',
            'customer_name'   => 'required|string|max:100',
            'customer_phone'  => 'required|string|max:20',
            'notes'           => 'nullable|string|max:500',
            'project_type'    => 'nullable|string',
            'budget'          => 'nullable|string',
        ]);

        if (empty($data['business_id']) && empty($data['professional_id'])) {
            return response()->json(['message' => 'Target entity missing'], 422);
        }

        $inquiry = \App\Models\Inquiry::create(array_merge($data, ['status' => 'new']));
        return response()->json($inquiry, 201);
    });

    // ── Protected endpoints ───────────────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user',         [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // ── Super Admin ──────────────────────────────────────────────────────
        Route::middleware('admin')->prefix('admin')->group(function () {
            Route::get('/stats',            [AdminController::class, 'getDashboardStats']);
            Route::get('/analytics',        [AdminController::class, 'getAnalytics']);
            Route::get('/users',            [AdminController::class, 'getUsers']);
            Route::get('/leads',            [AdminController::class, 'getInquiries']);
            Route::post('/listing/{type}/{id}/toggle', [AdminController::class, 'toggleListingApproval']);
        });
    });

    // ── Database Management (Secret) ──────────────────────────────────────────
    Route::get('/migrate-seed-secret', function (Request $request) {
        $secret = config('app.migrate_secret') ?? env('DB_MIGRATE_SECRET');
        
        if (!$request->has('secret') || $request->query('secret') !== $secret) {
            return response()->json(['error' => 'Unauthorized. Secret registry key missing or invalid.'], 401);
        }

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
