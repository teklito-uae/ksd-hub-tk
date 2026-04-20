<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackTraffic
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Don't log API documentation or internal paths
        if ($request->is('api/documentation*') || $request->is('_debugbar*')) {
            return $response;
        }

        try {
            $user = $request->user();
            
            // Safe session ID retrieval
            $sessionId = 'guest_' . md5($request->ip() . $request->userAgent());
            try {
                if ($request->hasSession()) {
                    $sessionId = $request->session()->getId() ?? $sessionId;
                }
            } catch (\Exception $e) {
                // Session not available, keep fallback ID
            }

            \DB::table('traffic_logs')->insert([
                'user_id' => $user?->id,
                'session_id' => $sessionId,
                'path' => $request->path(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'user_type' => $user ? ($user->role ?? 'user') : 'guest',
                'source' => $request->headers->get('referer'),
                'created_at' => now(),
            ]);
        } catch (\Exception $e) {
            // Silently fail if logging fails to not break the app
            \Log::error('Traffic Logging Failed: ' . $e->getMessage());
        }

        return $response;
    }
}
