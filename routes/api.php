<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartOrderedProductsController;
use App\Http\Controllers\CartOrdersController;
use App\Http\Controllers\CartProductsController;
use App\Http\Controllers\M2StripeController;
use App\Http\Controllers\PusherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::post('/pusher-payment', function () {
//      event(new App\Events\PusherPayment('Hello from Laravel and Pusher!'));
//     return 'Event sent';
// });


Route::post('/pusher-payment', [PusherController::class, 'pusherPayments']);

Route::get('/connection_token', [M2StripeController::class, 'connection_token']);
Route::post('/create_payment_intent', [M2StripeController::class, 'create_payment_intent']);
Route::post('/confirm_payment_intent', [M2StripeController::class, 'confirm_payment_intent']);
Route::post('/m2_reader_response', [M2StripeController::class, 'm2_reader_response']);
Route::get('/get_m2_reader_response', [M2StripeController::class, 'get_m2_reader_response']);
Route::get('/get_m2_ordered_product/{token}', [M2StripeController::class, 'get_m2_ordered_product']);
Route::post('/check_payment', [M2StripeController::class, 'check_payment']);

Route::get('/get_seats', [CartProductsController::class, 'get_seats']);
Route::post('/create_checkout', [CartProductsController::class, 'create_checkout']);
Route::get('/session', [CartProductsController::class, 'session']);
Route::post('/end_session', [CartProductsController::class, 'end_session']);
Route::post('/remove_checkout', [CartProductsController::class, 'remove_checkout']);


Route::post('/send_place_orders', [CartOrderedProductsController::class, 'send_place_orders']);
Route::get('/search_ticket_code/{search}', [CartOrderedProductsController::class, 'search_ticket_code']);
Route::get('/get_order_complete', [CartOrderedProductsController::class, 'get_order_complete']);
Route::post('/redeem_ticket', [CartOrderedProductsController::class, 'redeem_ticket']);
Route::post('/accept_redeem', [CartOrderedProductsController::class, 'accept_redeem']);
Route::get('/get_specific_code/{code}', [CartOrderedProductsController::class, 'get_specific_code']);
Route::get('/release_ticket/{id}/{productid}', [CartOrderedProductsController::class, 'release_ticket']);
Route::get('/get_ordered_products/{code}', [CartOrderedProductsController::class, 'get_ordered_products']);


Route::post('/update_seats', [CartOrdersController::class, 'update_seats']);
Route::get('/get_cart_orders_token/{token}', [CartOrdersController::class, 'get_cart_orders_token']);



// Route::middleware(['web'])->group(function () {
// }); 


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});