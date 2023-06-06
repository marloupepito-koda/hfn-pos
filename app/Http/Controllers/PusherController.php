<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PusherPayment;

class PusherController extends Controller
{
   public function pusherPayments(Request $request)
    {
        $message = $request->input('message');

        event(new PusherPayment($message));

        return response()->json(['success' => true]);
    }
}
