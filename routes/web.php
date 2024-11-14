<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/about-us', function () {
    return view('about');
})->name('about');

Route::get('/Contact-Us', function () {
    return view('contact');
})->name('contact');

