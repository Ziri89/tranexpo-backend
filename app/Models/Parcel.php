<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Parcel extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [

        'countryFrom',
        'cityFrom',
        'checkFrom',
        'countryTo',
        'cityTo',
        'checkTo',
        'image',
        'typeOfGoods',
        'quantity',
        'weight',
        'lenght',
        'width',
        'height',
        'shippingDate',
        'user_id',
    ];
    
    public function user() 
    {
         return $this->belongsTo(User::class, 'user_id');
    }
    
    public function shipper()
    {
        return $this->belongsTo(Shipper::class, 'shipper_id');
    }
    protected static function booted()
    {
    static::creating(function ($parcel) {
        $parcel->user_id = Auth::id();
    });
    }

    /*public function post()
    {
         return $this->hasMany('App\Models\Parcel');
    }
    */
}
