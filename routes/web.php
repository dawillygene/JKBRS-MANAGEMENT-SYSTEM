<?php

use App\Models\Article;
use App\Models\Product;
use App\Models\Location;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Route;
use RealRashid\SweetAlert\Facades\Alert;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LocationController;



Route::get('/', function () {

    $product = Product::orderBy('created_at', 'asc')->take(6)->get()->map(function ($product) {
        $product->encrypted_id = Crypt::encryptString($product->id);
        return $product;
    });

    $articles = Article::latest()->take(10)->get(); 

    $productnew = Product::orderBy('created_at', 'desc')->take(3)->get()->map(function ($product) {
        $product->encrypted_id = Crypt::encryptString($product->id);
        return $product;
    });

    return view('index',compact('product','productnew','articles'));

})->name('home');




Route::get('/about-us', function () {
    return view('about');
})->name('about');

Route::get('/Contact-Us', function () {
$location = Location::all();
    return view('contact',compact('location'));
})->name('contact');



Route::get('/view', function () {
    return view('productdetail');
})->name('productdetail');



Route::get('view/{id}',[ProductController::class,'show'])->name('productdetail');

Route::get('/product', [ProductController::class, 'index'])->name('product');
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');






Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');




Route::resource('locations', LocationController::class);








Route::get('/admin/addproduct', function () {
    return view('admin.addproduct');
})->name('admin.addproduct');


Route::get("/admin/products-list",[ProductController::class,'adminIndex'])->name('admin.productslist');
Route::get("/admin/{encrypted_id}/edit-product",[ProductController::class,'edit'])->name('admin.editproduct');
Route::PUT("/admin/update-product/{id}",[ProductController::class,'update'])->name('products.update');
Route::delete("/admin/delete-product/{id}",[ProductController::class,'destroy'])->name('products.delete');




