<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard-new');
    })->name('dashboard');
   
    Route::get('/office', function () {
        return Inertia::render('Office/office-new');
    })->name('office');
   
    Route::get('/factory', function () {
        return Inertia::render('factory/factory-new');
    })->name('factorymain');
   
    Route::get('/inventory', function () {
        return Inertia::render('Inventory/inventory-new');
    })->name('inventory');

    Route::get('/sales', function () {
        return Inertia::render('Sales/sales-new');
    })->name('sales');

    Route::get('/reports', function () {
        return Inertia::render('Reports/reports-new');
    })->name('reports');
   
    Route::get('/user-management', function () {
        return Inertia::render('UserManagement/user-management-new');
    })->name('user-management');

    Route::get('/app-settings', function () {
        return Inertia::render('AppSettings/app-settings-new');
    })->name('app-settings');

 

    

    


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
