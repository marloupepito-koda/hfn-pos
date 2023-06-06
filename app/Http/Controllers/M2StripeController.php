<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M2Stripe;
use App\Models\CartOrderedProducts;

class M2StripeController extends Controller
{

     public function get_m2_ordered_product($token){
            $result = CartOrderedProducts::where('token',$token)->with('cartProducts')->get();
            if($result){
                return response()->json([
                    'status' =>$result,
                ]);
            }
            
    }
    public function get_m2_reader_response(){
            $result  =M2Stripe::where('status','pending')->get();
            if($result){
                return response()->json([
                    'status' =>$result,
                ]);
            }
            
    }
     public function m2_reader_response(Request $request){
        $token = $request->session()->get('token');
        
        if($token !== null){
           $request->session()->put('tkn', $token);
           $response=  M2Stripe::where('token',$token)->get();
          if(count($response) === 0){
                 M2Stripe::insert([
                    'notes'=>$request->data['notes'],
                    'name'=>$request->data['fullname'],
                    'email'=>$request->data['email'],
                    'grandtotal'=>$request->data['grandTotal'],
                    'subtotal'=>$request->data['subTotal'],
                    'ticket_fee'=>$request->data['ticketFee'],
                    'token'=>$token,
                    'status' =>'pending'
                ]);
                $request->session()->forget('token');
                return response()->json([
                    'status' =>$request->data,
                ]);
            }else{
                 $request->session()->forget('token');
                return response()->json([
                    'status' =>'error',
                    'token' => $token 
                ]);
            }

             $request->session()->forget('token');
        }else{
             return response()->json([
                'status' =>'error',
                'token' => $request->session()->get('tkn')
            ]);
              $request->session()->forget('token');
        }
    
          

             
     }


    public function connection_token()
    {

        $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));
        try {
           
        $connectionToken = $stripe->terminal->connectionTokens->create(
           [
               'location'=>'tml_FHEgWQGCZvduqr',
            ]
        );
      
        return response()->json([
            'status' =>$connectionToken,
        ]);
        } catch (Throwable $e) {
        return response()->json([
            'status' =>$e->getMessage(),
        ]);
        }
        
    }
   public function create_payment_intent(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));
        $payment = $stripe->paymentIntents->create([
        'amount' => number_format((float)$request->price, 2, '', ''),
        'currency' => 'usd',
        'payment_method_types' => ['card_present'],
        'capture_method' => 'manual',
        ],);

        return response()->json([
            'status' =>$payment,
        ]);
    }

    
   public function confirm_payment_intent(Request $request){
      $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));

         $paymentIntent = $stripe->paymentIntents->retrieve($request->paymentIntentId);
         $paymentIntent->capture();

         if($paymentIntent->status === 'succeeded'){
             M2Stripe::where('token',$request->token)->update([
             'status'=>'success'
             ]);
         }else{
             M2Stripe::where('token',$request->token)->update([
                'status'=>'failed'
            ]);
         }
        

        return response()->json([
            'status' =>$paymentIntent,
        ]);
   }
    
}
