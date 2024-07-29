<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request) {
        $user = $request->username;
        $validateUser = Validator::make($request->all(),
        [
            'username' => ['required', 'unique:users,username'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', Password::min(4)]
        ]);

        if ($validateUser->fails()) {
            return response()->json(['errors'=> $validateUser->errors()], 422);
        }

        try {
            User::create([
                'username'=> $request->username,
                'email'=> $request->email,
                'password'=> Hash::make($request->password)
            ]);
            return response()->json(['success' => $user.' created'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }
}
