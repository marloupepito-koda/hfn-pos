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
// Route::middleware(['web'])->group(function () {
// }); 


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});