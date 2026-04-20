<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProfessionalController extends Controller
{
    public function index(Request $request)
    {
        $params = $request->only(['category_id', 'location_city', 'search']);
        $isSearchRequest = !empty($params['search']);
        $cacheKey = 'api:professionals:list:' . md5(json_encode($params));

        $fetcher = function () use ($params) {
            $query = Professional::select([
                'id', 'category_id', 'name', 'slug', 'profession',
                'bio', 'avatar_path', 'location_city', 'experience',
                'projects_completed', 'is_verified', 'whatsapp',
            ]);

            if (!empty($params['category_id'])) {
                $query->where('category_id', $params['category_id']);
            }
            if (!empty($params['location_city'])) {
                $query->where('location_city', $params['location_city']);
            }
            if (!empty($params['search'])) {
                $s = $params['search'];
                $query->where(function ($q) use ($s) {
                    $q->where('name', 'like', "%{$s}%")
                      ->orWhere('profession', 'like', "%{$s}%");
                });
            }

            return $query->orderBy('name')->get()->toArray();  // plain array
        };

        $result = $isSearchRequest
            ? $fetcher()
            : Cache::remember($cacheKey, now()->addMinutes(5), $fetcher);

        return response()->json($result);
    }

    public function show(string $slug)
    {
        $pro = Cache::remember("api:professional:{$slug}", now()->addMinutes(10), function () use ($slug) {
            return Professional::where('slug', $slug)->firstOrFail()->toArray();
        });

        return response()->json($pro);
    }
}
