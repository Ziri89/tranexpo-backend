<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Passenger extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [

        'countryFrom',
        'cityFrom',
        'countryTo',
        'cityTo',
        'departureDate',
        'dateOfReturn',
        'onewayOrReturn',
        'user_id',
    ];
    
    public function user() 
    {
         return $this->belongsTo(User::class, 'user_id');
    }

    protected static function booted()
    {
    static::creating(function ($passenger) {
        $passenger->user_id = Auth::id();
    });
    }

}
