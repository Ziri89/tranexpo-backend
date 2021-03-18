<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Passenger;
use App\Models\User;
use GuzzleHttp\Middleware;

class PassengerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function store(Request $request)
    {

        $data = new Passenger;
        $data->countryFrom = $request->countryFrom;
        $data->cityFrom = $request->cityFrom;
        $data->countryTo = $request->countryTo;
        $data->cityTo = $request->cityTo;
        $data->onewayOrReturn = $request->onewayOrReturn;
        $data->departureDate = $request->departureDate;
        $data->dateOfReturn = $request->dateOfReturn;
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

        $data = Passenger::find($id);
        if ($data->save()) {
            return response()->json([
                "data" => $data,
                "msg" => "Parcel ID"
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

        $data = Passenger::query()->orderByDesc('id')->paginate(6);
        return response($data, 200);
    }

    public function delete($id)
    {

        $data = Passenger::find($id);
        if ($data) {
            $data->delete();
            return response()->json([
                "data" => null,
                "msg" => "Deleted successfully"
            ], 204);
        } else {
            return response()->json([
                "data" => null,
                "msg" => "Something went wrong"
            ], 400);
        }
    }

}
