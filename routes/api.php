<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartOrderedProductsController;
use App\Http\Controllers\CartOrdersController;
use App\Http\Controllers\CartProductsController;

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