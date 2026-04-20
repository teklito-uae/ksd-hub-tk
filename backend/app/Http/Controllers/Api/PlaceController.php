<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Support\Facades\Cache;

class PlaceController extends Controller
{
    public function index()
    {
        $places = Cache::remember('api:places:active', now()->addHours(24), function () {
            return Place::select(['id', 'name', 'slug'])
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->toArray();  // plain array — safe to serialize in file cache
        });

        return response()->json($places);
    }
}
