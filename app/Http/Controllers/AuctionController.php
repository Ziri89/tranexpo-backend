<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Auction;
use App\Models\Shipper;
use App\Models\User;

class AuctionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function store(Request $request)
    {

        $data = new Auction;
        $data->price = $request->price;
        $data->shipper_id = Auth::user()->id;
        $data->user_id = Auth::user()->id;
        if ($data->save()) {
            return response()->json([
                "data" => $data,
                "msg"  => "Published Successfully"
            ], 201);
        } else {
            return response()->json([
                "data" => null,
                "msg" => "Something went wrong!"
            ], 400);
        }
    }


    public function show($id)
    {

        $data = Auction::find($id);
        if ($data->save()) {
            return response()->json([
                "data" => $data,
                "msg" => "Auction ID"
            ], 200);
        } else {
            return response()->json([
                "data" => null,
                "msg" => "Not found"
            ], 404);
        }
    }

    public function showAll(Request $request)
    {

        $data = Auction::query()->orderByDesc('id')->paginate(6);
        return response($data, 200);
    }



}
