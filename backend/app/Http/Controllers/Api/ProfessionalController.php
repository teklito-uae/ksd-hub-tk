<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Professional;

class ProfessionalController extends Controller
{
    public function index(Request $request)
    {
        $query = Professional::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('location_city')) {
            $query->where('location_city', $request->location_city);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('profession', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    public function show($slug)
    {
        $pro = Professional::where('slug', $slug)->firstOrFail();
        return response()->json($pro);
    }
}
