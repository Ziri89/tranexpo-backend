<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
//use App\Models\User;
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
                'company_number' =>        '',  
                'vehicle_number' =>        'required|numeric',
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
        $shipper                =           Shipper::create($inputs);

        if(!is_null($shipper)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "data" => $shipper]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! Shipper not created. Please try again."]);
        }
    }

   /* public function shipperDetail() {
        $user           =       Auth::guard('shipper')->user();
        if(!is_null($user)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "user" => $user]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no user found"]);
        }
    }
    */
    public function updateShipper(Request $request, $id){

        $shipper = Shipper::find($id);
        $shipper->name = $request->input('name');
        $shipper->email = $request->input('email');
        $shipper->phone = $request->input('phone');
        $shipper->city = $request->input('city');
        $shipper->country = $request->input('country');
        $shipper->company_name = $request->input('company_name');
        $shipper->company_number = $request->input('company_number');
        $shipper->vehicle_number = $request->input('vehicle_number');
        $shipper->zip_code = $request->input('zip_code');
        $shipper->startpay = $request->input('startPay');
        $shipper->endPay = $request->input('endPay');
        $shipper->password = $request->input('password');
 
        $shipper->save();
        return response()->json($shipper);
 
     }

     public function showAll(Request $request)
     {
 
         $data = Shipper::query()->orderByDesc('id')->paginate(6);
         return response($data, 200);
     }
}
