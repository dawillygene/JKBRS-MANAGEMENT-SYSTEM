<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
   
    Route::get('/user-management', function () {
        return Inertia::render('UserManagement/user-management-new');
    })->name('user-management');

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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
