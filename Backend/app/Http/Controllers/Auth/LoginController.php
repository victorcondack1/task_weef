<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Organizer;
use Illuminate\Support\Facades\Log;
class LoginController extends Controller
{

    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    try {
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Acesso não autorizado.'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'token' => $token,
            'user' => [
                'organizer_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,

            ],
            'message' => 'Login realizado com sucesso.'
        ]);
    } catch (JWTException $e) {
        Log::error('Erro ao criar token JWT: ' . $e->getMessage());
        return response()->json(['error' => 'Não foi possível criar o token.'], 500);
    }
}


    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Logout efetuado com sucesso'], 200);
    }
}
