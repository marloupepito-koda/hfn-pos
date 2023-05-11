<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartProductsController;
use Illuminate\Support\Facades\Mail;
use App\Mail\SeatsReservation;
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

Route::get('/send_reservation', function () {
    $title = 'Welcome to My Website';
    $content = 'Thanks for signing up!';
  // Mail::to('recipient@example.com')->send(new SeatsReservation($title, $content));
    return view('emails.reservation');
});

Route::get('/{jsx?}',function(){
    return view('index');
})->where('jsx','[\/\w\.-]*');



Route::patch('/create_checkout', [CartProductsController::class, 'create_checkout']);






