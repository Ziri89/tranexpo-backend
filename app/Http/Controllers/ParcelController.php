<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Parcel;
use App\Models\User;
use GuzzleHttp\Middleware;
use Image;
class ParcelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request) {
       
        $data = new Parcel;
        $data->countryFrom = $request->countryFrom;
        $data->cityFrom = $request->cityFrom;
        $data->checkFrom = $request->checkFrom;
        $data->countryTo = $request->countryTo;
        $data->cityTo = $request->cityTo;
        $data->checkTo = $request->checkTo;
        $data->parcel = $request->parcel;
        $data->envelope = $request->envelope;
        $data->pallet = $request->pallet;
        $data->quantity = $request->quantity;
        $data->weight = $request->weight;
        $data->lenght = $request->lenght;
        $data->width = $request->width;
        $data->height = $request->height;
        $data->shippingDate = $request->shippingDate;
        $data->user_id = Auth::guard('web')->user()->id();
        if($request->hasFile("image")){
            $img = $request->image;
            $img_name = $img->getClientOriginalName();
            Image::make($img)->resize(500, 500)->save(public_path("/images/".$img_name));
            $data->image = $img_name;
        //$data->user_id =  Auth::guard('web')->user()->id;
        }
        if($data->save()){
            //$data = Parcel::where('user_id')->orderBy('id','DESC')->paginate(10);
           // dd($data);
            return response()->json([
                "data" => $data,
                "msg"  => "Published Successfully"
            ], 201);
        }else{
            return response()->json([
                "data" => null,
                "msg" => "Something went wrong!"
            ], 400);
        }
    }
   
   /* public function show($id){

        $data = Parcel::find($id);
        if($data->save()){
            return response()->json([
                "data" => $data,
                "msg" => "Parcel ID"
            ], 200);
        }else{
            return response()->json([
                "data" => null,
                "msg" => "Not found"
            ], 404);
        }
    }
    */
   /* public function showAll(Request $request){

       $parcel = Parcel::with('user')->get();
    return response($parcels, 200);
    }
*/
    public function showAll(Request $request){
       
        $data = Parcel::query()->orderByDesc('id')->paginate(5);
        return response($data, 200);
    }

    public function delete($id){

        $data = Parcel::find($id);
        if($data){
            $data->delete();
            return response()->json([
                "data" => null,
                "msg" => "Deleted successfully"
            ], 204);
        }else{
            return response()->json([
                "data" => null,
                "msg" => "Something went wrong"
            ], 400);
        }
    }

  
}

