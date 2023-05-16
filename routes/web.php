<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartProductsController;
use Illuminate\Support\Facades\Mail;
use App\Mail\SeatsReservation;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::post('/send_reservation', function (Request $request) {
    $title = 'Welcome to Hollywood Fight Nights';
    $content = 'Thanks for purchasing tickets!';
    $data = $request->data;
    Mail::to($request->data['email'])->send(new SeatsReservation($title, $content,$data));
    // return view('emails.reservation')->with([
    //                 'title' => $title,
    //                 'content' => $content,
    //                  $data
    //             ]);
});

Route::get('/{jsx?}',function(){
    return view('index');
})->where('jsx','[\/\w\.-]*');



Route::post('/create_checkout', [CartProductsController::class, 'create_checkout']);






