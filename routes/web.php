<?php

use App\Models\Article;
use App\Models\Product;
use App\Models\Visitor;
use App\Models\Location;
use App\Models\FormSubmission;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Route;
use RealRashid\SweetAlert\Facades\Alert;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\SocialMediaLinkController;





Route::get('/dashboard', function () {

    $productCount = Product::count();
    $articleCount = Article::count();
    $messageCount = FormSubmission::count();
    $locationCount = Location::count();
   $visitorCount = Visitor::first('count')->count; 
    return view('dashboard', compact('productCount', 'articleCount', 'messageCount', 'locationCount',
    'visitorCount'
));


    // return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
    
    
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/create', [ArticleController::class, 'index'])->name('articles.create');
    Route::get('/articles/articles-list', [ArticleController::class, 'getArticle'])->name('articles.getArticle');
    Route::delete("/articles/delete-article/{id}",[ArticleController::class,'destroy'])->name('article.delete');
    Route::get("/articles/{encrypted_id}/edit",[ArticleController::class,'edit'])->name('articles.edit');
    Route::put("/articles/{encrypted_id}/update",[ArticleController::class,'update'])->name('articles.update');
    
    Route::resource('locations', LocationController::class);
    
    Route::get('/admin/addproduct', function () {
        return view('admin.addproduct');
    })->name('admin.addproduct');
    
    Route::get("/admin/products-list",[ProductController::class,'adminIndex'])->name('admin.productslist');
    Route::get("/admin/{encrypted_id}/edit-product",[ProductController::class,'edit'])->name('admin.editproduct');
    Route::PUT("/admin/update-product/{id}",[ProductController::class,'update'])->name('products.update');
    Route::delete("/admin/delete-product/{id}",[ProductController::class,'destroy'])->name('products.delete');


    Route::resource('admin/social-media-links', SocialMediaLinkController::class);

    Route::get('/admin/messages', [FormSubmissionController::class, 'index'])->name('messages.index');
    Route::delete('/admin/messages/{id}', [FormSubmissionController::class, 'destroy'])->name('messages.destroy');





});

require __DIR__.'/auth.php';




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

Route::get('/social-media-links', [SocialMediaLinkController::class,"indexView"])->name("SocialMedia.index");



Route::post('/form', [FormSubmissionController::class, 'store'])->name('form.store');

Route::post('/increment-visitor-count', [VisitorController::class, 'incrementVisitorCount']);