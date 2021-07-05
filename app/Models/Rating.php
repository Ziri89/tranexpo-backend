<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Rating extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [

        'stars',
        'comment',
        'shipper_id',
    ];


    public function shipper() 
    {
         return $this->belongsTo(Shipper::class, 'shipper_id');
    }

    protected static function booted()
    {
    static::creating(function ($rating) {
        $rating->user_id = Auth::id();
    });
    }
}
