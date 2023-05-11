<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CartTicketCodes;
use App\Models\CartOrders;

class CartOrderedProducts extends Model
{
    use HasFactory;
    protected $table = 'cart_ordered_products';
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

    public function cartTicketCodes(): HasOne
    {
        return $this->hasOne(CartTicketCodes::class, 'cart_ticket_code_id');
    }

    
     public function searchTickets($search){
          $results = CartOrderedProducts::where('code', '=', $search)->get();
          return $results;
     }


    public function checkOutSeats($data,$token)
    {

        // for ($i=0; $i < count($data->cart); $i++) { 
        //     $price_offset = 0;
        //      if ($data->cart[$i]['price_early'] && !$data->cart[$i]['price_early_ended']) {
        //             $price_offset = max(0, ($data->cart[$i]['price_list'] - $data->cart[$i]['price_early']));
        //         }
        //         if($data->cart[$i]['cart_product_id'] !== 'no seats'){
        //              $this->CartOrderedProducts::create([
        //                 'client_id' => $this->client_id,
        //                 'cart_product_id' => $data->cart[$i]['cart_product_id'],
        //                 'token' => $token, 
        //                 'cart_order_id' => 81415,
        //                 'quantity' => $data->cart[$i]['quantity'], 
        //                 'price' => $data->cart[$i]['price_list'], 
        //                 'price_group' => 0,
        //                 'price_offset' => $price_offset,
        //                 'code' => null, 
        //                 'discount_offset' => 0.00,
        //                 'cart_product_options' => 0, 
        //                 'cart_coupon_id' => 0,
        //                 'date_submitted' => '2023-05-08 23:31:32',
        //                 'team_members' => null,
        //                 'units' => 0,
        //                 'donation' => 0.00,
        //                 'printed_fee' => 0,
        //                 'printed_fee_type' => 0,
        //                 'first_name' => $data->fullname,
        //                 'last_name' => 'waaaa',
        //                 'expires' => '2023-05-08 23:42:35',
        //                 'table_number' => 0,
        //             ]);
        //         }
        // }
       

        // CartTicketCodes::create([
        //     'cart_ordered_product_id' => null,//cart_ordered_product_id
        //     'product_id' => null, //product_id
        //     'code' => null, //code
        //     'token' => null, //token
        //     'status' => null,
        //     'date_redeemed' => null, 
        // ]);


                    //  CartOrders::create([
                    //      'client_id' => $this->client_id,
                    //      'invoice_number' => -1,
                    //      'cart_customer_id' => $this->cart_customer_id,
                    //      'shipping_first_name' => null,
                    //      'shipping_last_name' => null,
                    //      'shipping_company' => null,
                    //      'shipping_phone1' => null,
                    //      'shipping_phone2' => null,
                    //      'shipping_phone3' => null,
                    //      'shipping_phone4' => null,
                    //      'shipping_address1' => null,
                    //      'shipping_address2' => null,
                    //      'shipping_city' => null,
                    //      'shipping_state' => null,
                    //      'shipping_zip' => '',
                    //      'shipping_country' => null,
                    //      'shipping_email' => null,
                    //      'billing_company' => null,
                    //      'billing_first_name' => null,
                    //      'billing_last_name' => null,
                    //      'billing_phone1' => null,
                    //      'billing_phone2' => null,
                    //      'billing_phone3' => null,
                    //      'billing_phone4' => null,
                    //      'billing_address1' => null,
                    //      'billing_address2' => null,
                    //      'billing_city' => null,
                    //      'billing_state' => null,
                    //      'billing_zip' => null,
                    //      'billing_country' => null,
                    //      'billing_email' => null,
                    //      'cc_name' => null,
                    //      'cc_num' => null,
                    //      'cc_last_four' => null,
                    //      'cc_exp_m' => null,
                    //      'cc_exp_y' => null,
                    //      'cc_type' => null,
                    //      'email' => $request->email,
                    //      'total_tax' => 0.00,
                    //      'total_shipping' => 0.00,
                    //      'total_sub' =>$request->subTotal,
                    //      'total_discount' => $request->discount,
                    //      'total_donation' => 0,
                    //      'total_grand' => $request->grandTotal,
                    //      'total_adjustments' => 0.00,
                    //      'total_fee' => $request->ticketFee,
                    //      'total_insurance' => 0.00,
                    //      'ticket_fee' => 7.50,
                    //      'ticket_fee_type' => 0,
                    //      'transaction_fee' => 0.00,
                    //      'authnet_transaction_id' => '',
                    //      'cart_coupon_id' => 0,
                    //      'order_status' => 'incomplete',
                    //      'shipping_tracking_number' => '',
                    //      'shipping_type_id' => null,
                    //      'shipping_type' => null,
                    //      'ssl_invoice_number' => 'ssrxa0b6ibuvlk15hdsk6i2252bu05g',
                    //      'token' => null,
                    //      'ssl_approval_code' => null,
                    //      'parent_cart_category_id' => null,
                    //      'date_shipped' => '0000-00-00 00:00:00',
                    //      'date_placed' => null,
                    //      'date_processed' => null,
                    //      'date_cancelled' => null,
                    //      'date_reported' => '2023-05-08 23:31:31',
                    //      'date_created' => '2023-05-08 23:31:32',
                    //      'date_updated' => 'n',
                    //      'has_reported' => null,
                    //      'ticket_number_general' => null,
                    //      'ticket_number_vip' => null,
                    //      'date_order_export' => null,
                    //      'returning_order' => 'no',
                    //      'refer_id' => 0,
                    //      'refer_text' => '',
                    //      'boxer_to_see' => '',
                    //      'sponsor_company' => '',
                    //      'sponsor_list_name' => '',
                    //      'sponsor_logo' => '',
                    //      'cart_ticket_ad_id' => '',
                    //      'merchant_id' => '',
                    //      'order_type' => 0,
                    //      'payment_type' => $order_type,
                    //      'image' => 'Credit Card',
                    //      'cart_email_id' => '',
                    //      'school_id' => 0,
                    //      'grade_level' => '',
                    //      'order_redeemed' => '',
                    //      'order_redeemed_date' => '',
                    //      'project_name' => '',
                    //      'shirt_size' => '',
                    //      'opt_in_event' => '',
                    //      'opt_in_global' => '',
                    //      'volunteer_id' => 0,
                    //      'volunteer_event_id' => 0,
                    //      'event_id' => $this->event_id,
                    //      'has_printable_tickets' => 0,
                    //      'payment_description' => '',
                    //      'tender' => '',
                    //      'tender_change' => '',
                    //      'check_info' => '',
                    //      'website' => '',
                    //      'notes' => $request->notes,
                    //      'user_browser' => 'Chrome (112.0.0.0)',
                    //      'user_ip_address' => '119.93.234.79',
                    //      'user_operating_system' => 'Windows 10',
                    //      'customer_id' => ''
                    // ]);


    }



}