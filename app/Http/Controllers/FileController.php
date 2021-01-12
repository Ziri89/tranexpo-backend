<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Parcel;

class FileController extends Controller
{     
    public function index(){
        return view('index');
      }

      public function upload(Request $request){
            
            $request->validate([
               'file' => 'required|mimes:jpg,jpeg,png,csv,txt,xlx,xls,pdf|max:2048'
            ]);
    
            $Parcel = new Parcel;
    
            if($request->file()) {
                $file_name = time().'_'.$request->file->getClientOriginalName();
                $file_path = $request->file('file')->storeAs('uploads', $file_name, 'public');
    
                $Parcel->name = time().'_'.$request->file->getClientOriginalName();
                $Parcel->path = '/storage/' . $file_path;
                $Parcel->save();
    
                return response()->json(['success'=>'File uploaded successfully.']);
            }
       }
}
