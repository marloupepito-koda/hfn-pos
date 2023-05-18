<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartOrderedProducts;
use App\Models\CartTicketCodes;
use App\Models\CartProducts;
use App\Models\CartOrders;
class CartOrderedProductsController extends Controller
{
      public $client_id = 157;

       public function get_ordered_products($code){
            $order= CartOrderedProducts::where('code',$code)->with('cartProducts')->get();
            return response()->json([
               'checkout' =>$order,
            ]); 
       }
        public function release_ticket($productid,$code){
          
          CartProducts::find($productid)->update([
               'quantity' => 1
          ]);
          CartTicketCodes::where('code','=',$code)->update([
               'status' => 2
          ]);

           return response()->json([
               'status' =>$productid,
          ]); 
        }
        public function redeem_ticket(Request $request){
           $ordered =CartOrderedProducts::where('cart_ordered_product_id',$request->data)->with('cartTicketCodes')->first();
           
            return response()->json([
               'status' =>$ordered,
          ]);
        }

        public function accept_redeem(Request $request){

              CartTicketCodes::where('cart_ordered_product_id',$request->cart_ordered_product_id)->update([
               'status' =>$request->status
               ]);

           return response()->json([
               'status' =>$request->cart_ordered_product_id,
          ]);
        }

        
      public function get_order_complete(Request $request){
          $ordered =CartOrderedProducts::where('token',$request->session()->get('token'))->with(['cartProducts','cartTicketCodes'])->get();
            return response()->json([
               'status' =>$ordered,
          ]);
      }
     
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
          $token = $request->session()->get('token');

            $request->session()->put('order_complete', $request->data);
          $data = $request->session()->get('create_checkout');

               CartOrders::where('token',$token)->update([
                    'shipping_first_name' =>$request->data['fullname'],
                    'shipping_email'=>$request->data['email'],
                    'notes'=>$request->data['notes'],
                    'total_grand'=>$request->data['grandTotal'],
                    'ticket_fee'=>$request->data['ticketFee'],
                    'total_sub'=>$request->data['subTotal'],
                    'tender'=>$request->data['tenders'],
                    'check_info'=>$request->data['check_info'],
                    'total_discount'=>$request->discount
               ]);
             for ($i=0; $i < count($data); $i++) { 
                    if($data[$i]['cart_product_id'] === 'no seats'){
                         CartOrderedProducts::where('token','=',$token)
                        ->update([
                              'price_group' => 0,
                              'price_offset' => 0.00,
                              'discount_offset' => floatval($request->discount),
                              'cart_product_options' => 0, 
                              'cart_coupon_id' => 0,
                              'date_submitted' => date("Y-m-d H:i:s"),
                              'team_members' => null,
                              'units' => 0,
                              'donation' => 0.00,
                              'printed_fee' => 0,
                              'printed_fee_type' => 0,
                              'first_name' => $request->data['fullname'],
                              'last_name' => '',
                              'expires' => date("Y-m-d H:i:s"),
                              'table_number' => 0,
                      ]);
                    }else{
                        CartOrderedProducts::where([['cart_product_id','=',$data[$i]['cart_product_id']],['token','=',$token]])
                        ->update([
                              'quantity' => $data[$i]['quantity'], 
                              'price' => $data[$i]['price_list'], 
                              'price_group' => 0,
                              'price_offset' => 0.00,
                              'discount_offset' =>  floatval($request->discount),
                              'cart_product_options' => 0, 
                              'cart_coupon_id' => 0,
                              'date_submitted' => date("Y-m-d H:i:s"),
                              'team_members' => null,
                              'units' => 0,
                              'donation' => 0.00,
                              'printed_fee' => 0,
                              'printed_fee_type' => 0,
                              'first_name' => $request->data['fullname'],
                              'last_name' => '',
                              'expires' => date("Y-m-d H:i:s"),
                              'table_number' => 0,
                      ]);
                    }
                       



            }

         $request->session()->forget('session');
         $request->session()->forget('create_checkout');
          return response()->json([
               'status' =>'success',
          ]);
     }

}