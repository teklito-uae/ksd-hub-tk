<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Business;
use App\Models\Professional;
use App\Models\BlogPost;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        // 1. User Stats
        $userStats = [
            'total' => User::count(),
            'business' => User::where('role', 'business')->count(),
            'pro' => User::where('role', 'pro')->count(),
            'user' => User::where('role', 'user')->count(),
            'new_24h' => User::where('created_at', '>=', Carbon::now()->subDay())->count(),
        ];

        // 2. Listing Stats
        $listingStats = [
            'businesses' => [
                'total' => Business::count(),
                'pending' => Business::where('status', 'pending')->count(),
                'approved' => Business::where('status', 'approved')->count(),
            ],
            'professionals' => [
                'total' => Professional::count(),
                'pending' => Professional::where('status', 'pending')->count(),
                'approved' => Professional::where('status', 'approved')->count(),
            ]
        ];

        // 3. Content Stats
        $contentStats = [
            'blog_posts' => BlogPost::count(),
        ];

        // 4. Activity Logs (Mock for now, can be connected to Spatie Activity Log later)
        $recentActivity = [
            ['id' => 1, 'type' => 'registration', 'message' => 'New user joined: Rahul K.', 'time' => '2 mins ago'],
            ['id' => 2, 'type' => 'listing', 'message' => 'New business submitted: Ocean Cafe', 'time' => '15 mins ago'],
            ['id' => 3, 'type' => 'inquiry', 'message' => 'New lead for: Kasaragod Dental', 'time' => '1h ago'],
        ];

        return response()->json([
            'users' => $userStats,
            'listings' => $listingStats,
            'content' => $contentStats,
            'recent_activity' => $recentActivity,
        ]);
    }

    public function getUsers()
    {
        return response()->json(User::latest()->paginate(20));
    }

    public function toggleListingApproval(Request $request, $type, $id)
    {
        $model = $type === 'business' ? Business::findOrFail($id) : Professional::findOrFail($id);
        $model->status = $model->status === 'approved' ? 'pending' : 'approved';
        $model->save();

        return response()->json([
            'message' => 'Listing status updated successfully',
            'status' => $model->status === 'approved'
        ]);
    }

    public function getInquiries()
    {
        return response()->json(
            \App\Models\Inquiry::with('business')->latest()->paginate(20)
        );
    }

    public function getAnalytics()
    {
        $now = Carbon::now();
        $fiveMinsAgo = $now->copy()->subMinutes(5);
        $today = $now->copy()->startOfDay();
        $yesterday = $now->copy()->subDay()->startOfDay();

        // 1. Live Pulse (Right Now)
        $liveUsers = \DB::table('traffic_logs')
            ->where('created_at', '>=', $fiveMinsAgo)
            ->distinct('session_id')
            ->count();

        // 2. High-Level Metrics
        $uniqueVisitorsToday = \DB::table('traffic_logs')
            ->where('created_at', '>=', $today)
            ->distinct('session_id')
            ->count();

        $pageViewsToday = \DB::table('traffic_logs')
            ->where('created_at', '>=', $today)
            ->count();

        $bounceRate = 25; // Mock for now, would calculate sessions with count=1

        // 3. Time Series Data (Last 24 Hours)
        $chartData = collect(range(0, 23))->map(function($hour) use ($today) {
            $time = $today->copy()->addHours($hour);
            return [
                'time' => $time->format('H:i'),
                'visitors' => \DB::table('traffic_logs')
                    ->whereBetween('created_at', [$time, $time->copy()->addHour()])
                    ->distinct('session_id')
                    ->count(),
                'views' => \DB::table('traffic_logs')
                    ->whereBetween('created_at', [$time, $time->copy()->addHour()])
                    ->count(),
            ];
        });

        // 4. Distribution Breakdown
        $topPages = \DB::table('traffic_logs')
            ->select('path', \DB::raw('count(*) as views'))
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        $sources = \DB::table('traffic_logs')
            ->select('source', \DB::raw('count(*) as count'))
            ->whereNotNull('source')
            ->groupBy('source')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $userBreakdown = \DB::table('traffic_logs')
            ->select('user_type', \DB::raw('count(distinct session_id) as count'))
            ->groupBy('user_type')
            ->get();

        return response()->json([
            'live_pulse' => [
                'current' => $liveUsers,
                'status' => $liveUsers > 0 ? 'active' : 'idle',
            ],
            'metrics' => [
                'visitors' => $uniqueVisitorsToday,
                'pageviews' => $pageViewsToday,
                'bounce_rate' => $bounceRate,
                'avg_duration' => '2m 14s', // Mock
            ],
            'chart' => $chartData,
            'top_pages' => $topPages,
            'sources' => $sources,
            'user_breakdown' => $userBreakdown,
        ]);
    }
}
