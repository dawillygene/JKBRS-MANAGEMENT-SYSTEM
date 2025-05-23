<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
   
    Route::get('/office', function () {
        return Inertia::render('Office/office');
    })->name('office');
   
    Route::get('/factory', function () {
        return Inertia::render('factory/factorymain');
    })->name('factorymain');
   
    Route::get('/inventory', function () {
        return Inertia::render('Inventory/inventory');
    })->name('inventory');

    Route::get('/sales', function () {
        return Inertia::render('Sales/sales');
    })->name('sales');

    Route::get('/reports', function () {
        return Inertia::render('Reports/reports');
    })->name('reports');
   
    Route::get('/user-management', function () {
        return Inertia::render('UserManagement/user-management');
    })->name('user-management');

    Route::get('/app-settings', function () {
        return Inertia::render('AppSettings/app-settings');
    })->name('app-settings');

 

    

    


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
