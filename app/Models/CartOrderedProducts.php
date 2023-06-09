<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CartTicketCodes;
use App\Models\CartOrders;
use App\Models\CartProducts;
use App\Models\M2Stripe;

class CartOrderedProducts extends Model
{
    use HasFactory;
    protected $table = 'cart_ordered_products';
    public $timestamps = false;
    protected $fillable = [
        'client_id',
        'cart_product_id',
        'token',
        'cart_order_id',
        'quantity',
        'price',
        'price_group',
        'price_offset',
        'code',
        'discount_offset',
        'cart_product_options',
        'cart_coupon_id',
        'date_submitted',
        'team_members',
        'units',
        'donation',
        'printed_fee',
        'printed_fee_type',
        'first_name',
        'last_name',
        'expires',
        'table_number'
    ];


    public function cartOrders(): BelongsTo
    {
        return $this->belongsTo(CartOrders::class, 'cart_order_id');
    }

    public function cartTicketCodes(): BelongsTo
    {
        return $this->belongsTo(CartTicketCodes::class, 'cart_ordered_product_id');
    }

    public function cartProducts(): BelongsTo
    {
        return $this->belongsTo(CartProducts::class, 'cart_product_id');
    }
    public function m2(): BelongsTo
    {
        return $this->belongsTo(M2Stripe::class, 'token');
    }

    
     public function searchTickets($search){
          $results = CartOrderedProducts::where('code', '=', $search)->with(['cartProducts','cartTicketCodes'])->get();
          return $results;
     }



}