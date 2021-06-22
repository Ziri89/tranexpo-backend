<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Auction extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [

        'price',
        'shipper_id',
        'parcel_id',
    ];


    public function shipper() 
    {
         return $this->belongsTo(Shipperr::class, 'shipper_id');
        
    }

    public function parcel()
    {
        return $this->belongsTo(Parcel::class, 'parcel_id');
    }

    protected static function booted()
    {
    static::creating(function ($auction) {
        $auction->shipper_id = Auth::id();
    });
    }
}
