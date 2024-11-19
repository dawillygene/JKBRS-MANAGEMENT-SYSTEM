<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/about-us', function () {
    return view('about');
})->name('about');

Route::get('/Contact-Us', function () {
    return view('contact');
})->name('contact');

// Route::get('/product', function () {
//     return view('products');
// })->name('product');


Route::get('/admin/addproduct', function () {
    return view('admin.addproduct');
})->name('admin.product');



Route::get('/product', [ProductController::class, 'index'])->name('product');
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
