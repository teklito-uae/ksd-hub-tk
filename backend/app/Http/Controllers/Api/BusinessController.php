<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $params = $request->only([
            'category_id', 'category_slug', 'location_city',
            'search', 'verified', 'sort',
        ]);

        $isSearchRequest = !empty($params['search']);
        $cacheKey = 'api:businesses:list:' . md5(json_encode($params));

        $fetcher = function () use ($params) {
            $query = Business::select([
                    'id', 'category_id', 'name', 'slug',
                    'address', 'location_city', 'phone', 'whatsapp',
                    'logo_path', 'status', 'is_featured', 'is_verified',
                    'verification_status', 'price_range',
                    'latitude', 'longitude',
                ])
                ->with(['category:id,name,slug,icon'])
                ->where('status', 'approved');

            if (!empty($params['category_id'])) {
                $query->where('category_id', $params['category_id']);
            }

            if (!empty($params['category_slug'])) {
                $cat = Cache::remember(
                    'api:category:slug:' . $params['category_slug'],
                    now()->addHours(6),
                    fn () => Category::select(['id'])->where('slug', $params['category_slug'])->value('id')
                );
                if ($cat) {
                    $childIds = Cache::remember(
                        'api:category:children:' . $cat,
                        now()->addHours(6),
                        fn () => Category::where('parent_id', $cat)->pluck('id')->all()
                    );
                    $query->whereIn('category_id', array_merge([$cat], $childIds));
                }
            }

            if (!empty($params['location_city'])) {
                $query->where('location_city', $params['location_city']);
            }

            if (!empty($params['search'])) {
                $s = $params['search'];
                $query->where(function ($q) use ($s) {
                    $q->where('name', 'like', "%{$s}%")
                      ->orWhere('address', 'like', "%{$s}%");
                });
            }

            if (($params['verified'] ?? '') === 'true') {
                $query->where('is_verified', true);
            }

            $query->orderByDesc('is_featured')->orderBy('name');

            // Store as plain array — prevents Eloquent Collection serialisation issues in file cache
            return $query->get()->toArray();
        };

        $result = $isSearchRequest
            ? $fetcher()
            : Cache::remember($cacheKey, now()->addMinutes(5), $fetcher);

        return response()->json($result);
    }

    public function show(string $slug)
    {
        $business = Cache::remember("api:business:{$slug}", now()->addMinutes(10), function () use ($slug) {
            return Business::select([
                    'id', 'user_id', 'category_id', 'name', 'slug', 'description',
                    'address', 'location_city', 'phone', 'whatsapp', 'email',
                    'logo_path', 'status', 'is_featured', 'is_verified',
                    'verification_status', 'price_range', 'latitude', 'longitude',
                    'created_at',
                ])
                ->with([
                    'category:id,name,slug',
                    'images:id,business_id,path,sort_order',
                ])
                ->where('slug', $slug)
                ->firstOrFail()
                ->toArray();  // plain array — safe to serialize/deserialize
        });

        return response()->json($business);
    }
}
