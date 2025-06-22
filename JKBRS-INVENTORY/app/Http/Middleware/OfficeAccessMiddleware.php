<?php

namespace App\Http\Middleware;

use App\Models\Office;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OfficeAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'You must be logged in to access this page.');
        }

        // Check if user is trying to access office-specific data
        $officeId = $request->route('office') ?? $request->input('office_id');
        
        if ($officeId) {
            $office = Office::find($officeId);
            
            if (!$office) {
                abort(404, 'Office not found.');
            }

            if (!$user->canManageOffice($office)) {
                abort(403, 'You do not have access to this office.');
            }
        }

        return $next($request);
    }
}
