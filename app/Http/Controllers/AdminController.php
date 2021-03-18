<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Admin;

class AdminController extends Controller
{
    private $sucess_status = 200;
    
    public function registerAdmin(Request $request) {
        $validator      =       Validator::make($request->all(),
            [
                'email'          =>        'required|email',
                'password'       =>        'required|alpha_num|min:5',

            ]
        );

        if($validator->fails()) {
            return response()->json(["validation_errors" => $validator->errors()]);
        }

        $inputs                 =           $request->all();
        $inputs['password']     =           bcrypt($inputs['password']);
        $admin                =             Admin::create($inputs);

        if(!is_null($admin)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "data" => $admin]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! Shipper not created. Please try again."]);
        }
    }
}
