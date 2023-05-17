<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CartOrderedProducts;

class CartTicketCodes extends Model
{
    use HasFactory;
    protected $table = 'cart_ticket_codes';
    protected $primaryKey = 'cart_ordered_product_id';
    public $timestamps = false;
    
    protected $fillable = [
        'cart_ordered_product_id',
        'product_id',
        'code',
        'token',
        'status',
        'date_redeemed'
    ];


    public function cartOrderedProducts(): BelongsTo
    {
        return $this->belongsTo(CartOrderedProducts::class ,'cart_ordered_product_id');
    }
    
}
