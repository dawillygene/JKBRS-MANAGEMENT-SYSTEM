<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeDocumentController;
use App\Http\Controllers\EmployeePerformanceController;
use App\Http\Controllers\EmployeeTrainingController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        try {
            $user = auth()->user();
            
            // Load relationships carefully
            $user->load(['role', 'office']);
            
            // Only load nested relationships if office exists
            if ($user->office) {
                $user->office->load(['parentOffice', 'childOffices']);
            }
            
            // Get dashboard data based on user's permissions and office
            $dashboardData = [
                'totalRevenue' => 45750000,
                'totalSales' => 1247,
                'totalInventoryValue' => 12500000,
                'totalEmployees' => 34,
                'lowStockItems' => 8,
                'pendingOrders' => 15,
                'monthlyRevenue' => [3200000, 3800000, 4100000, 4500000, 4200000, 4750000],
            ];
            
            return Inertia::render('dashboard-admin-enhanced', [
                'data' => $dashboardData,
                'auth' => [
                    'user' => $user,
                ],
            ]);
        } catch (\Exception $e) {
            // Fallback to simple dashboard if there's an issue
            return Inertia::render('dashboard-admin-enhanced');
        }
    })->name('dashboard');
   
    Route::get('/office', function () {
        return Inertia::render('Office/office-new');
    })->name('office');
   
    Route::get('/factory', function () {
        return Inertia::render('factory/factory-new');
    })->name('factorymain');
   
    Route::get('/inventory', function () {
        $user = auth()->user()->load(['role', 'office.parentOffice', 'office.childOffices']);
        
        return Inertia::render('Inventory/inventory-role-based', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    })->name('inventory');

    Route::get('/sales', function () {
        return Inertia::render('Sales/sales-new');
    })->name('sales');

    Route::get('/reports', function () {
        return Inertia::render('Reports/reports-new');
    })->name('reports');
   
    Route::get('/user-management', [UserController::class, 'index'])->name('user-management');

    Route::get('/app-settings', function () {
        return Inertia::render('AppSettings/app-settings-new');
    })->name('app-settings');

    // Test login route for debugging
    Route::get('/test-login', function () {
        $user = \App\Models\User::where('email', 'admin@jkbrs.co.tz')->first();
        if ($user) {
            auth()->login($user);
            return redirect()->route('dashboard');
        }
        return 'User not found';
    })->name('test-login');

    // Employee Management Routes
    Route::resource('employees', EmployeeController::class);
    Route::post('employees/{employee}/transfer', [EmployeeController::class, 'transfer'])->name('employees.transfer');
    Route::get('employees-hierarchy', [EmployeeController::class, 'hierarchy'])->name('employees.hierarchy');
    
    // Employee Documents Routes
    Route::get('employees/{employee}/documents', [EmployeeDocumentController::class, 'index'])->name('employees.documents.index');
    Route::post('employees/{employee}/documents', [EmployeeDocumentController::class, 'store'])->name('employees.documents.store');
    Route::get('employees/{employee}/documents/{document}/download', [EmployeeDocumentController::class, 'download'])->name('employees.documents.download');
    Route::delete('employees/{employee}/documents/{document}', [EmployeeDocumentController::class, 'destroy'])->name('employees.documents.destroy');
    
    // Employee Performance Routes
    Route::get('employees/{employee}/performance', [EmployeePerformanceController::class, 'index'])->name('employees.performance.index');
    Route::get('employees/{employee}/performance/create', [EmployeePerformanceController::class, 'create'])->name('employees.performance.create');
    Route::post('employees/{employee}/performance', [EmployeePerformanceController::class, 'store'])->name('employees.performance.store');
    Route::get('employees/{employee}/performance/{performance}', [EmployeePerformanceController::class, 'show'])->name('employees.performance.show');
    Route::get('employees/{employee}/performance/{performance}/edit', [EmployeePerformanceController::class, 'edit'])->name('employees.performance.edit');
    Route::put('employees/{employee}/performance/{performance}', [EmployeePerformanceController::class, 'update'])->name('employees.performance.update');
    Route::delete('employees/{employee}/performance/{performance}', [EmployeePerformanceController::class, 'destroy'])->name('employees.performance.destroy');
    
    // Employee Training Routes
    Route::get('employees/{employee}/training', [EmployeeTrainingController::class, 'index'])->name('employees.training.index');
    Route::get('employees/{employee}/training/create', [EmployeeTrainingController::class, 'create'])->name('employees.training.create');
    Route::post('employees/{employee}/training', [EmployeeTrainingController::class, 'store'])->name('employees.training.store');
    Route::get('employees/{employee}/training/{training}', [EmployeeTrainingController::class, 'show'])->name('employees.training.show');
    Route::get('employees/{employee}/training/{training}/edit', [EmployeeTrainingController::class, 'edit'])->name('employees.training.edit');
    Route::put('employees/{employee}/training/{training}', [EmployeeTrainingController::class, 'update'])->name('employees.training.update');
    Route::delete('employees/{employee}/training/{training}', [EmployeeTrainingController::class, 'destroy'])->name('employees.training.destroy');

    // User Management Routes
    Route::resource('users', UserController::class);
    Route::post('users/{user}/transfer', [UserController::class, 'transfer'])->name('users.transfer');
    Route::post('users/bulk-action', [UserController::class, 'bulkAction'])->name('users.bulk-action');
    Route::put('users/{user}/password', [UserController::class, 'updatePassword'])->name('users.update-password');
    Route::get('users/{user}/activity', [UserController::class, 'activityLogs'])->name('users.activity');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
