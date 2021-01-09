<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Parcel;

class HomeController extends Controller
{
    public function uploadimage(Request $request)
    {
    if ($request->hasFile('image'))
     {
          $file      = $request->file('image');
          $filename  = $file->getClientOriginalName();
          $extension = $file->getClientOriginalExtension();
          $picture   = date('His').'-'.$filename;
          //move image to public/img folder
          $file->move(public_path('img'), $picture);
          return response()->json(["message" => "Image Uploaded Succesfully"]);
     } 
    else
     {
          return response()->json(["message" => "Select image first."]);
     }
    }
}