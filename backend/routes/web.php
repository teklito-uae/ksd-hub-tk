<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

// Production DB Migration & Cache Clear Route
Route::get('/setup-db-secret', function () {
    try {
        $output = '';
        
        Artisan::call('migrate:fresh', ['--force' => true]);
        $output .= "Migrations ran successfully.\n" . Artisan::output() . "\n";
        
        Artisan::call('db:seed', ['--force' => true]);
        $output .= "Seeding ran successfully.\n" . Artisan::output() . "\n";

        Artisan::call('optimize:clear');
        $output .= "Cache cleared successfully.\n" . Artisan::output();

        return response('<pre>' . $output . '</pre>');
    } catch (\Exception $e) {
        return response('<pre>Error: ' . $e->getMessage() . '</pre>', 500);
    }
});
