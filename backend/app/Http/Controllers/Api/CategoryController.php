<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Cache::remember('api:categories:tree', now()->addHours(6), function () {
            return Category::select(['id', 'name', 'slug', 'icon', 'parent_id'])
                ->with(['children:id,name,slug,icon,parent_id'])
                ->whereNull('parent_id')
                ->orderBy('name')
                ->get()
                ->toArray();  // plain array — safe to serialize/deserialize in file cache
        });

        return response()->json($categories);
    }
}
