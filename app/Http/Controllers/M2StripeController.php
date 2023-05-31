<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M2Stripe;

class M2StripeController extends Controller
{

     public function m2_reader_response(Request $request){
        $token = $request->session()->get('token');
        
       $response=  M2Stripe::where('token',$token)->get();
       
        if(count($response) === 0){
             M2Stripe::insert([
                'token'=>$token,
                'status' =>'pending'
            ]);
             return response()->json([
                'status' =>$response,
            ]);
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
        'amount' => 7777,
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

        return response()->json([
            'status' =>$paymentIntent,
        ]);
   }
    
}
