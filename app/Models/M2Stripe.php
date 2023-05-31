<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M2Stripe extends Model
{
    use HasFactory;
     protected $table = 'm2_reader';
      public $timestamps = false;
      protected $fillable = [
         'id',
        'token',
        'status',
    ];
}
