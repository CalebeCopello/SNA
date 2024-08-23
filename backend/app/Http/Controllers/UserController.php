<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $userInfo = $request->user();
        return response()->json([
            'username' => $userInfo->username,
            'avatar' => $userInfo->avatar,
            'email' => $userInfo->email,
            'created_at' => $userInfo->created_at
        ], 200);
    }
}
