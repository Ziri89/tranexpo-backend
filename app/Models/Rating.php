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

        'stars',
        'comment',
        'user_id',
    ];


    public function user() 
    {
         return $this->belongsTo(User::class, 'user_id');
    }

    protected static function booted()
    {
    static::creating(function ($rating) {
        $rating->user_id = Auth::id();
    });
    }
}
