<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller {

    private $sucess_status = 200;
    
    public function registerUser(Request $request) {
        $validator      =       Validator::make($request->all(),
            [
                'name'           =>        'required',
                'email'          =>        'required|email',
                'phone'          =>        'required|numeric',
                'password'       =>        'required|alpha_num|min:5',
                'company_name'   =>        '',
                'city'           =>        'required',
                'country'           =>     'required',
                'zip_code'       =>        'required|numeric',

            ]
        );

        if($validator->fails()) {
            return response()->json(["validation_errors" => $validator->errors()]);
        }

        $inputs                 =           $request->all();
        $inputs['password']     =           bcrypt($inputs['password']);
        $user                   =           User::create($inputs);

        if(!is_null($user)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "data" => $user]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! user not created. please try again."]);
        }
    }


    // User Login
    public function loginUser(Request $request) {

        // validation
        $validator      =       Validator::make($request->all(),
            [
                'email'         =>     'required|email',
                'password'      =>     'required|alpha_num|min:5'
            ]
        );

        if($validator->fails()) {
            return response()->json(["validation_errors" => $validator->errors()]);
        }

    /*  if (Auth::guard('web')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $details = Auth::guard('web')->user();
            $user = $details['original'];
            return $user;
        } else {
            return 'auth fail';
        }
    */
        if(Auth::guard('web')->attempt(['email' => $request->email, 'password' => $request->password])){
        $user      =      Auth::guard('web')->user();
        $token     =      $user->createToken('token')->accessToken;

            return response()->json(["status" => $this->sucess_status, "success" => true, "login" => true, "token" => $token, "data" => $user]);
        }

        if(Auth::guard('shipper')->attempt(['email' => $request->email, 'password' => $request->password])){
            $user    =     Auth::guard('shipper')->user();
            $token   =     $user->createToken('token')->accessToken;

            return response()->json(["status" => $this->sucess_status, "success" => true, "login" => true, "token" => $token, "data" => $user]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! invalid email or password"]);
        }
    }


    // User Detail
  /* public function userDetail($id) {
    $user = User::find($id);
        if(!is_null($user)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "user" => $user]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no user found"]);
        }
    }
    */

    public function show($id){

        $user = User::find($id);
        if(!is_null($user)){
            return response()->json([
                "user" => $user,
                "msg" => "User ID"
            ], 200);
        }else{
            return response()->json([
                "user" => null,
                "msg" => "Not found"
            ], 404);
        }
    
    }
    
    public function logout(Request $request){

    $accessToken = Auth::user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json(null, 204);
    }
    

}