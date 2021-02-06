<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Parcel extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'countryFrom',
        'cityFrom',
        'checkFrom',
        'countryTo',
        'cityTo',
        'checkTo',
        'image',
        'parcel',
        'envelope',
        'pallet',
        'quantity',
        'weight',
        'lenght',
        'width',
        'height',
        'shippingDate',
    ];
    
    public function user() 
    {
         return $this->belongsTo(User::class, 'user_id');
    }

    /*public function post()
    {
         return $this->hasMany('App\Models\Parcel');
    }
    */
}
