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
    public function signup(Request $request)
    {
        $validate = Validator::make(
            $request->all(),
            [
                'username' => ['required', 'regex:/^[a-zA-Z0-9\-_]+$/','unique:users,username'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => ['required', Password::min(4)]
            ]
        );

        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()->all()], 422);
        }
        try {
            $user = $request->username;
            User::create([
                'username' => $user,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Account for ' . $user . ' created'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => ['required'],
            'password' => ['required', Password::min(4)]
        ]);
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }
        try {
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email or password is invalid!'
                ], 401);
            }
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('AuthToken');
            return response()->json([
                'status' => 'success',
                'message' => 'Logged in successfully',
                'token' => $token->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {

        $request->user()->tokens()->currentAcessToken()->delete();
        return response()->json(['status' => 'success', 'message' => 'Logged out successfully'], 500);
    }
}
