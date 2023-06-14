<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use App\Models\CartProducts;
use App\Models\CartOrderedProducts;
use App\Models\CartOrders;
use App\Models\CartTicketCodes;
use App\Models\M2Stripe;

class CartProductsController extends Controller
{

     public $client_id = 157;
     public $cart_category_id = 510;
     public $event_id = 302;
     public $order_type = "HFN POS";
     public $cart_customer_id = 0;
     
     public function remove_checkout(Request $request){
                session(['create_checkout' => $request->data]);
                       CartProducts::where([['event_id', '=', $this->event_id],['cart_product_id', '=', $request->cart_product_id]])
                         ->update([
                              'quantity' => 1
                         ]);
                    return response()->json([
                    'status' => 'success',
               ]);
     }
       
       
     public function get_seats($status = '', $cat_id = null)
     {


          if ($status == '') {
               $sqlm = ["active", "inactive"];
          } else {
               $sqlm = [$status];
          }

          $results = CartProducts::select('cart_products.*', 'cart_categories.category_name', 'venue_areas.name as venue_area', 'venue_sections.name as venue_section', 'cart_products.venue_row as venue_row', 'cart_products.venue_seat as venue_seat')
               ->leftJoin('venue_areas', 'venue_areas.venue_area_id', '=', 'cart_products.venue_area_id')
               ->leftJoin('venue_sections', 'venue_sections.venue_section_id', '=', 'cart_products.venue_section_id')
               ->leftJoin('cart_categories', 'cart_categories.cart_category_id', '=', 'cart_products.cart_category_id')
               ->where('cart_products.client_id', $this->client_id)
               ->where('cart_products.cart_category_id', $this->cart_category_id)
               ->whereIn('cart_products.status', $sqlm)
               ->orderBy('cart_categories.sort_order', 'asc')
               ->orderBy('cart_products.sort_order', 'asc')
               ->get();

          return response()->json([
               'status' => $results,
          ]);

          
     }

     public function create_checkout(Request $request)
     {
        

         if ($request->session()->get('token') === null) {
                    function generateRandomString()
                    {
                         $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                         $randomString = '';
                         for ($i = 0; $i < 32; $i++) {
                              $randomString .= $characters[rand(0, strlen($characters) - 1)];
                         }
                         return $randomString;
                    }
                    $request->session()->put('token', generateRandomString());
                    $token = $request->session()->get('token');  
                    $request->session()->put('tkn', $token);
                    if($token !== null){
                        CartOrders::insert([
                         'client_id' => $this->client_id,
                         'invoice_number' => -1,
                         'cart_customer_id' => $this->cart_customer_id,
                         'shipping_first_name' => 'null',
                         'shipping_last_name' => 'null',
                         'shipping_company' => 'null',
                         'shipping_phone1' => 'null',
                         'shipping_phone2' => 'null',
                         'shipping_phone3' => 'null',
                         'shipping_phone4' => 'null',
                         'shipping_address1' => 'null',
                         'shipping_address2' => 'null',
                         'shipping_city' => 'null',
                         'shipping_state' => 'null',
                         'shipping_zip' => '',
                         'shipping_country' => 'null',
                         'shipping_email' => 'null',
                         'billing_company' => 'null',
                         'billing_first_name' => 'null',
                         'billing_last_name' => 'null',
                         'billing_phone1' => 'null',
                         'billing_phone2' => 'null',
                         'billing_phone3' => 'null',
                         'billing_phone4' => 'null',
                         'billing_address1' => 'null',
                         'billing_address2' => 'null',
                         'billing_city' => 'null',
                         'billing_state' => 'null',
                         'billing_zip' => 'null',
                         'billing_country' => 'null',
                         'billing_email' => 'null',
                         'cc_name' => 'null',
                         'cc_num' => 'null',
                         'cc_last_four' => 'null',
                         'cc_exp_m' => 'null',
                         'cc_exp_y' => 'null',
                         'cc_type' => 'null',
                         'email' => 'null',
                         'total_tax' => 0.00,
                         'total_shipping' => 0.00,
                         'total_sub' =>0,
                         'total_discount' => 0,
                         'total_donation' => 0,
                         'total_grand' => 0,
                         'total_adjustments' => 0.00,
                         'total_fee' => 0,
                         'total_insurance' => 0.00,
                         'ticket_fee' => 7.50,
                         'ticket_fee_type' => 0,
                         'transaction_fee' => 0.00,
                         'authnet_transaction_id' => '',
                         'cart_coupon_id' => 0,
                         'order_status' => 'incomplete',
                         'shipping_tracking_number' => '',
                         'shipping_type_id' => 'null',
                         'shipping_type' => 'null',
                         'ssl_invoice_number' => '',
                         'token' =>$token,
                         'ssl_approval_code' => 'null',
                         // 'parent_cart_category_id' => 'null',
                         'date_shipped' => '2023-05-08 23:31:31',
                         'date_placed' => '2023-05-08 23:31:31',
                         'date_processed' => '2023-05-08 23:31:31',
                         'date_cancelled' => '2023-05-08 23:31:31',
                         'date_reported' => '2023-05-08 23:31:31',
                         'date_created' => '2023-05-08 23:31:32',
                         'date_updated' => '2023-05-08 23:31:31',
                         'has_reported' => 'n',
                         'ticket_number_general' => 'null',
                         'ticket_number_vip' => 'null',
                         'date_order_export' => '2023-05-08 23:31:31',
                         'returning_order' => 'no',
                         'refer_id' => 0,
                         'refer_text' => '',
                         'boxer_to_see' => '',
                         'sponsor_company' => '',
                         'sponsor_list_name' => '',
                         'sponsor_logo' => '',
                         'cart_ticket_ad_id' => 0,
                         'merchant_id' => 0,
                         'order_type' => 0,
                         'payment_type' => 'Credit Card',
                         'image' => 'Credit Card',
                         'cart_email_id' => 0,
                         'school_id' => 0,
                         'grade_level' => 0,
                         'order_redeemed' => 0,
                         'order_redeemed_date' => '2023-05-08 23:31:31',
                         'project_name' => '',
                         'shirt_size' => '',
                         'opt_in_event' =>0,
                         'opt_in_global' =>0,
                         'volunteer_id' => 0,
                         'volunteer_event_id' => 0,
                         'event_id' => 0,
                         'has_printable_tickets' => 0,
                         'payment_description' =>0,
                         'tender' =>0,
                         'tender_change' =>0,
                         'check_info' =>0,
                         'website' =>0,
                         'notes' =>0,
                         'user_browser' => 'Chrome (112.0.0.0)',
                         'user_ip_address' => '119.93.234.79',
                         'user_operating_system' => 'Windows 10',
                         'customer_id' => 0
                     ]);
                    }
                   
         }


          for ($i = 0; $i < count($request->data); $i++) {

             $code = mt_rand(1000000000, 9999999999);
             $token = $request->session()->get('tkn'); 
             session(['code' => $code]);
             $exist = CartOrderedProducts::where([['token','=',$token],['cart_product_id','=',$request->data[$i]['cart_product_id']]])->get();
             $exist2 = CartOrderedProducts::where([['token','=',$token],['cart_product_id','=',7257]])->get();
               if(count($exist) === 0){
                    if ($request->data[$i]['product_name'] !== 'General Admission No Seat') {

                         $cartOrders = CartOrders::where('token','=',$token)->first();
                              CartProducts::where('cart_product_id', $request->data[$i]['cart_product_id'])
                              ->update([
                                   'quantity' => 0
                              ]);

                         $success1 =  CartOrderedProducts::insert([
                              'client_id' => $this->client_id,
                              'cart_product_id' => $request->data[$i]['cart_product_id'],
                              'token' => $token, 
                              'cart_order_id' => $cartOrders->cart_order_id,
                              'quantity' => $request->data[$i]['quantity'], 
                              'price' => $request->data[$i]['price_list'], 
                              'price_group' => 0,
                              'price_offset' => 0.00,
                              'code' => $code, 
                              'discount_offset' => 0.00,
                              'cart_product_options' => 0, 
                              'cart_coupon_id' => 0,
                              'date_submitted' => date("Y-m-d H:i:s"),
                              'team_members' => null,
                              'units' => 0,
                              'donation' => 0.00,
                              'printed_fee' => 0,
                              'printed_fee_type' => 0,
                              'first_name' => '',
                              'last_name' => '',
                              'expires' => date("Y-m-d H:i:s"),
                              'table_number' => 0,
                              ]);
                              
                              
                              if($success1){
                                   $cop = CartOrderedProducts::where('token',$token)->first();

                                   CartTicketCodes::insert([
                                        'cart_ordered_product_id' => $cop->cart_ordered_product_id + $i,
                                        'product_id' => $request->data[$i]['cart_product_id'],
                                        'code' => $code,
                                        'token' => $token,
                                        'date_redeemed' => date("Y-m-d H:i:s")
                                   ]);
                              }

                    }else{
                         if(count($exist2) === 0){
                              $cartOrders = CartOrders::where('token','=',$token)->first();
                              $success1 =  CartOrderedProducts::insert([
                              'client_id' => $this->client_id,
                              'cart_product_id' =>7257,
                              'token' => $token, 
                              'cart_order_id' => $cartOrders->cart_order_id,
                              'quantity' => $request->data[$i]['quantity'], 
                              'price' => $request->data[$i]['price_list'], 
                              'price_group' => 0,
                              'price_offset' => 0.00,
                              'code' => $code, 
                              'discount_offset' => 0.00,
                              'cart_product_options' => 0, 
                              'cart_coupon_id' => 0,
                              'date_submitted' => date("Y-m-d H:i:s"),
                              'team_members' => null,
                              'units' => 0,
                              'donation' => 0.00,
                              'printed_fee' => 0,
                              'printed_fee_type' => 0,
                              'first_name' => '',
                              'last_name' => '',
                              'expires' => date("Y-m-d H:i:s"),
                              'table_number' => 0,
                              ]);
                              
                              if($success1){
                                   $cop = CartOrderedProducts::where('token',$token)->first();
                                   CartTicketCodes::insert([
                                        'cart_ordered_product_id' => $cop->cart_ordered_product_id + $i,
                                        'product_id' =>7257,
                                        'code' => $code,
                                        'token' => $token,
                                        'date_redeemed' => date("Y-m-d H:i:s")
                                   ]);
                              }
                         }
                    }

                 $request->session()->put('create_checkout', $request->data);
               }
          }
          // $request->session()->forget('create_checkout');
          // $request->session()->forget('token');
          return response()->json([
               'status' =>$request->session()->get('token'),
          ]);

     }


     public function session(Request $request)
     {
          
          return response()->json([
               'status' => $request->session()->get('session'),
               'checkout' => $request->session()->get('create_checkout'),
          ]);
     }

     public function end_session(Request $request)
     {
          M2Stripe::where('token',$request->session()->get('token'))->delete();
          CartOrderedProducts::where('token',$request->session()->get('token'))->delete();
          CartTicketCodes::where('token',$request->session()->get('token'))->delete();
          CartOrders::where('token',$request->session()->get('token'))->delete();

          $request->session()->forget('token');
          $request->session()->forget('create_checkout');
          return response()->json([
               'status' => 'success',
          ]);

     }



}