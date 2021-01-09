<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Parcel;

class ParcelController extends Controller
{
    private $sucess_status = 200;

    public function store(Request $request) {

        $validator = Validator::make($request->all(),
        [
            'countryFrom' => 'required',
            'cityFrom' => 'required',
            'checkFrom' => 'required',
            'countryTo' => 'required',
            'cityTo' => 'required',
            'checkTo' => 'required',
            'cargoImg' => 'required',
            'parcel' => 'required|boolean',
            'envelope' => 'required|boolean',
            'pallet' => 'required|boolean',
            'quantity' => 'required|numeric',
            'weight' => 'required|numeric',
            'lenght' => 'required|numeric',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
            'shippingDate' => 'required|date',
        ]);
        
        if($validator->fails()) {
            return response()->json(["validation_errors" => $validator->errors()]);
        }
         $inputs = $request->all();
         $parcel   = Parcel::create($inputs);
         $token      =       $parcel->createToken('token')->accessToken;
         
         if(!is_null($parcel)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "data" => $parcel]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! Parcel not created. please try again."]);
        }
 
        return back()->with('success','Successfully published a new parcel!');
 
    }
    
    public function view() {
        $parcel           =       Auth::parcel();
        if(!is_null($parcel)) {
            return response()->json(["status" => $this->sucess_status, "success" => true, "parcel" => $parcel]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no parcel found"]);
        }
    }
}
