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
            'created_at' => $userInfo->created_at,
            'theme' => $userInfo->theme
        ], 200);
    }
    public function changeTheme(Request $request)
    {
        $id = $request->user()->id;
        $theme = $request->input('theme');
        try {
            User::find($id)->update(['theme' => $theme]);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'no', 'exception' => $exception->getMessage()], 500);
        }
            return response()->json(['message' => 'ok'], 200);
    }
}
