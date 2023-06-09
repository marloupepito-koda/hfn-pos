<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M2Stripe;
use App\Models\CartOrderedProducts;

class M2StripeController extends Controller
{

    
    public function check_payment(Request $request){
        $upgrade = CartOrderedProducts::where('code',$request->code)->first();
        $request->session()->put('discount', $request->discount);
         $token = $request->type === 'upgrade'?$upgrade->token:$request->session()->get('token');
        
         if($request->type === 'upgrade'){
                $exist1 =  M2Stripe::where('token','=',$token)->get();
                $exist2 =  M2Stripe::where([['status','=','pending'],['token','=',$token]])->get();
                $exist3 =  M2Stripe::where([['status','=','success'],['token','=',$token]])->get();
                if(count($exist1) === 0){
                    return response()->json([
                        'status' =>'not exist',
                    ]);
                }else if(count($exist2) === 1){
                    return response()->json([
                        'status' =>'loading',
                    ]);
                }
                
         }else{
                $exist1 =  M2Stripe::where('token','=',$token)->get();
                $exist2 =  M2Stripe::where([['status','=','pending'],['token','=',$token]])->get();
                $exist3 =  M2Stripe::where([['status','=','success'],['token','=',$token]])->get();
                if(count($exist1) === 0){
                    return response()->json([
                        'status' =>'not exist',
                    ]);
                }else if(count($exist2) === 1){
                    return response()->json([
                        'status' =>'loading',
                    ]);
                }else if(count($exist3) === 1){
                    
                    return response()->json([
                        'status' =>'done',
                    ]);
                } 
         }
         
    }
     public function get_m2_ordered_product($token){
            $result = CartOrderedProducts::where('token',$token)->with('cartProducts')->get();
            if($result){
                return response()->json([
                    'status' =>$result,
                ]);
            }
            
    }
    public function get_m2_reader_response(){
            $result  = M2Stripe::where('status','pending')->get();
            if($result){
                return response()->json([
                    'status' =>$result,
                ]);
            }
            
    }
     public function m2_reader_response(Request $request){
        $token = $request->session()->get('token');
        session(['tokens' => $token]);
        if($request->type === 'upgrade'){
            $upgrade = CartOrderedProducts::where('code',$request->code)->first();
             $token = $upgrade->token;
            $request->session()->put('tkn', $token);
           $response=  M2Stripe::where('token',$token)->get();
           M2Stripe::insert([
                    'notes'=>$request->data['notes'].'- This additional payment is for upgrading tickets',
                    'name'=>'Upgrade Ticket to the '.' '.$request->newSeat['venue_area'].' Section '.$request->newSeat['venue_section'].' Row '.$request->newSeat['venue_row'].' Seat '.$request->newSeat['venue_row'],
                    'email'=>$request->data['email'],
                    'grandtotal'=>$request->data['grandTotal'],
                    'subtotal'=>$request->data['subTotal'],
                    'ticket_fee'=>$request->data['ticketFee'],
                    'token'=>$token,
                    'status' =>'pending'
                ]);
                return response()->json([
                    'status' =>$request->data,
                ]);
        }else{
            if($token !== null){
           $request->session()->put('tkn', $token);
           $response=  M2Stripe::where('token',$token)->get();
          if(count($response) === 0){
                 M2Stripe::insert([
                    'notes'=>$request->data['notes'].'-',
                    'name'=>$request->data['fullname'],
                    'email'=>$request->data['email'],
                    'grandtotal'=>$request->data['grandTotal'],
                    'subtotal'=>$request->data['subTotal'],
                    'ticket_fee'=>$request->data['ticketFee'],
                    'token'=>$token,
                    'status' =>'pending'
                ]);
                return response()->json([
                    'status' =>$request->data,
                ]);
            }else{
                return response()->json([
                    'status' =>'error',
                    'token' => $token 
                ]);
            }

        }else{
             return response()->json([
                'status' =>'error',
                'token' => $request->session()->get('tkn')
            ]);
        }
        }
             
     }


    public function connection_token()
    {
        if(env('APP_ENV') == 'local'){
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));
        }else{
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_LIVE'));
        }
        
        try {
           
        $connectionToken = $stripe->terminal->connectionTokens->create(
           [
               'location'=>env('STRIPE_M2_TML'),
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
         if(env('APP_ENV') === 'local'){
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));
               $amountValue = ($request->price * 100).'00';
        }else{
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_LIVE'));
            $amountValue = $request->price;
        }
     
        $payment = $stripe->paymentIntents->create([
        'amount' => $amountValue,
        'currency' => 'usd',
        'payment_method_types' => ['card_present'],
        'capture_method' => 'manual',
        ],);

        return response()->json([
            'status' =>$payment,
        ]);
    }

    
   public function confirm_payment_intent(Request $request){
       if(env('APP_ENV') === 'local'){
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_TEST'));
        }else{
            $stripe = new \Stripe\StripeClient(env('STRIPE_SK_LIVE'));
        }
        

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
