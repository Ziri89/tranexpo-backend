<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Rating;
use App\Models\Shipper;
use App\Models\User;

class RatingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function store(Request $request)
    {

        $data = new Rating;
        $data->stars = $request->stars;
        $data->comment = $request->comment;
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

        $data = Rating::find($id);
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

        $data = Rating::query()->orderByDesc('id')->paginate(6);
        return response($data, 200);
    }



}
