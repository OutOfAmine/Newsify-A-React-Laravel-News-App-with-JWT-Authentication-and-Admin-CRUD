<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthMiddleware
{
  
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // L'utilisateur est authentifié, alors poursuivre la demande
            return $next($request);
        }

        // Sinon afficher que l'accès non autorisé
        return response()->json(['message' => 'Accès non autorisé. Vous devez être connecté.']);
    }
}
