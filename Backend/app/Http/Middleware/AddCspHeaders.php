<?php

namespace App\Http\Middleware;

use Closure;

class AddCspHeaders
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->header('Content-Security-Policy', "default-src 'self'; script-src 'self' https://http2.mlstatic.com 'nonce-n0Q7mJpOJiAkD5PPZFynOg' 'report-sample'");

        return $response;
    }
}