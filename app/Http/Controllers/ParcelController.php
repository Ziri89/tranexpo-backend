<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Parcel;

class ParcelController extends Controller
{
    public function create()
 
    {
        return view('create');
    }
 
    public function store(Request $request)
 
    {
        $input = $request->all();
 
        $request->validate([
            'countryFrom' => 'required',
            'cityFrom' => 'required',
            'checkFrom' => 'required',
            'countryTo' => 'required',
            'cityTo' => 'required',
            'checkTo' => 'required',
            'cargoImg' => 'required',
            'parcel' => 'required',
            'envelope' => 'required',
            'pallet' => 'required',
            'quantity' => 'required|numeric',
            'weight' => 'required|numeric',
            'lenght' => 'required|numeric',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
            'shippingDate' => 'required|date',
        ]);
 
        
 
        return back()->with('success','Successfully published a new parcel!');
 
    }
 
}
