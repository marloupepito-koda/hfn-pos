<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartOrderedProducts;

class CartOrderedProductsController extends Controller
{
      public $client_id = 157;

     
      public function search_ticket_code($search){
          $cartOrderProducts = new CartOrderedProducts;

         
          $results = $cartOrderProducts->searchTickets($search);
           return response()->json([
               'status' =>$results,
          ]);

          
     }


     public function send_place_orders(Request $request)
     {
          $cartOrderProducts = new CartOrderedProducts;
         $token =session('token');

          // $aa = $cartOrderProducts->checkOutSeats($request,$randomToken);

          $data = session('create_checkout');
             for ($i=0; $i < count($data); $i++) { 
                         

                        CartOrderedProducts::where([['cart_product_id','=',$data[$i]['cart_product_id']],['token','=',session('token')]])
                        ->update([
                              'quantity' => $data[$i]['quantity'], 
                              'price' => $data[$i]['price_list'], 
                              'price_group' => 0,
                              'price_offset' => 0.00,
                              'discount_offset' => 0.00,
                              'cart_product_options' => 0, 
                              'cart_coupon_id' => 0,
                              'date_submitted' => date("Y-m-d H:i:s"),
                              'team_members' => null,
                              'units' => 0,
                              'donation' => 0.00,
                              'printed_fee' => 0,
                              'printed_fee_type' => 0,
                              'first_name' => $request->fullname,
                              'last_name' => '',
                              'expires' => date("Y-m-d H:i:s"),
                              'table_number' => 0,
                      ]);



            }

          session()->forget('session');
          session()->forget('token');
          session()->forget('create_checkout');
         
          return response()->json([
               'status' =>'success',
          ]);
     }

}