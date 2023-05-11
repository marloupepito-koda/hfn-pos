<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartProducts extends Model
{
    use HasFactory;
     protected $table = 'cart_products';
     protected $fillable = [
        'cart_product_id',
        'client_id',
        'event_id',
        'venue_area_id',
        'venue_section_id',
        'venue_row',
        'venue_seat',
        'token',
        'cart_ticket_type_id',
        'cart_product_type_id',
        'cart_category_id',
        'cart_product_man_id',
        'cart_product_attribute_id',
        'product_name',
        'product_number',
        'price_sale',
        'price_list',
        'price_onsite',
        'price_fee',
        'price_fee_2',
        'price_group',
        'price_group_min',
        'price_early',
        'price_early_ends',
        'price_early_ended',
        'ship_product',
        'weight',
        'desc_intro',
        'desc_full',
        'desc_additional',
        'image_full',
        'image_thumb',
        'sort_order',
        'date_end',
        'status',
        'quantity',
        'num_items',
        'can_purchase',
        'date_last_modefied',
        'date_created',
        'color_rgb',
        'start_time',
        'end_time',
        'abbreviation',
        'inventory',
        'inventory_2',
        'ticket_header_image',
        'ticket_header_color',
        'ticket_event_name',
        'ticket_date',
        'ticket_date_text',
        'ticket_location',
        'ticket_text',
        'ticket_side_image_1',
        'ticket_side_image_2',
    ];
}
