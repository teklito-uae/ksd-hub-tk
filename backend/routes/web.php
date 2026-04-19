<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

// Fallback Database Setup Route (in case /api/ prefix is blocked or nested)
Route::get('/setup-db-secret', function () {
    try {
        Artisan::call('migrate:fresh', ['--force' => true]);
        Artisan::call('db:seed', ['--force' => true]);
        Artisan::call('optimize:clear');
        return "Success: Database migrated and seeded!";
    } catch (\Exception $e) {
        return "Error during setup: " . $e->getMessage();
    }
});

// Production DB Connectivity Check
Route::get('/check-db', function () {
    try {
        DB::connection()->getPdo();
        return "Connected successfully to: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "Connection failed: " . $e->getMessage();
    }
});
