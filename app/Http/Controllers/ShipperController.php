<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Shipper;

class ShipperController extends Controller
{
    private $sucess_status = 200;
    
    public function registerShipper(Request $request) {
        $validator      =       Validator::make($request->all(),
            [
                'name'           =>        'required',
                'email'          =>        'required|email',
                'phone'          =>        'required|numeric',
                'password'       =>        'required|alpha_num|min:5',
                'company_name'   =>        'required', 
                'company_number' =>        'required',  
                'vehicle_number' =>        'required|numeric',
                'city'           =>        'required',
                'zip_code'       =>        'required|numeric',

            ]
        );

        if($validator->fails()) {
            return response()->json(["validation_errors" => $validator->errors()]);
        }

        $inputs                 =           $request->all();
        $inputs['password']     =           bcrypt($inputs['password']);
        $shipper                =           Shipper::create($inputs);

        if(!is_null($shipper)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "data" => $shipper]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! Shipper not created. Please try again."]);
        }
    }

}
