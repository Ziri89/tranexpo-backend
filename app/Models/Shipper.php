<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Shipper extends Authenticatable 
{
    use HasFactory, Notifiable, HasApiTokens;
        
    protected $fillable = [
        'name',
        'email',
        'phone',
        'city',
        'country',
        'company_name',
        'company_number',
        'vehicle_number',
        'zip_code',
        'startPay',
        'endPay',
        'password',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];
    
}
