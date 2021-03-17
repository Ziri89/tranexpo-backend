<?php

namespace App\Http\Controllers;

use App\Model\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required', 
            'email' => 'required|email', 
            'phone' => 'required|numeric',
            'password' => 'required|min:6',
            'company_name' => '',
            'zip_code' => 'required|numeric',
            'city' => 'required',
            'street' => 'required',
            'country' => 'required'
        ]);


        $user = User::create([
            'name' => $request->name, 
            'email' => $request->email, 
            'phone' => $request->phone,
            'company_name' => $request->company_name, 
            'zip_code' => $request->zip_code, 
            'city' => $request->city, 
            'country' => $request->country, 
            'street' => $request->street,
            'password' => bcrypt($request->password)
        ]);

        return response()->json($user);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email', 
        'password' => 'required'
    ]);

    if( Auth::attempt(['email'=>$request->email, 'password'=>$request->password]) ) {
        $user = Auth::user();

        $token = $user->createToken($user->email.'-'.now());

        return response()->json([
            'token' => $token->accessToken
        ]);
    }
}  
}