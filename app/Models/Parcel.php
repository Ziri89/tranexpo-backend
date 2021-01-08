<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcel extends Model
{
    use HasFactory;

    protected $fillable = [
        'countryFrom',
        'cityFrom',
        'checkFrom',
        'countryTo',
        'cityTo',
        'checkTo',
        'cargoImg',
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
}
