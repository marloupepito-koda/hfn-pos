<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartProducts;
use App\Models\CartOrders;
use App\Models\CartOrderedProducts;
use App\Models\CartTicketCodes;
class CartOrdersController extends Controller
{
     
      public function update_seats(Request $request){
        $data= CartTicketCodes::where('code',$request->code)->first();

        CartOrderedProducts::where('code',$request->code)->update([
            'cart_product_id'=>$request->newSeat['cart_product_id']
        ]);
        
        CartTicketCodes::where('code',$request->code)->update([
            'product_id'=>$request->newSeat['cart_product_id']
        ]);

        CartOrders::where('token',$data->token)->update([
            'total_grand' => $data->total_grand + $request->additional
        ]);

        CartProducts::where('cart_product_id',$data->product_id)->update([
            'quantity' =>1
        ]);

        CartProducts::where('cart_product_id',$request->newSeat['cart_product_id'])->update([
            'quantity' =>0
        ]);


        return response()->json([
               'status' =>'success',
          ]); 
      }
}