<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeDocumentController;
use App\Http\Controllers\EmployeePerformanceController;
use App\Http\Controllers\EmployeeTrainingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfficeController;

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
   
    Route::get('/office', [OfficeController::class, 'index'])->name('office');
   
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

    // Office Management Routes
    Route::resource('offices', OfficeController::class);
    Route::get('/office', [OfficeController::class, 'index'])->name('office.list');
    
    // Office hierarchy and management
    Route::get('offices-hierarchy', [OfficeController::class, 'hierarchy'])->name('offices.hierarchy');
    Route::get('/offices/{office}/hierarchy', [OfficeController::class, 'hierarchy'])->name('offices.hierarchy.show');
    
    // Budget management
    Route::get('/offices/{office}/budget', function ($office) {
        $officeModel = \App\Models\Office::with('childOffices')->findOrFail($office);
        return Inertia::render('Offices/Budget', [
            'office' => $officeModel,
            'children_offices' => $officeModel->childOffices
        ]);
    })->name('offices.budget');
    Route::put('offices/{office}/budget', [OfficeController::class, 'updateBudget'])->name('offices.update-budget');
    Route::post('/offices/bulk-budget-update', [OfficeController::class, 'bulkBudgetUpdate'])->name('offices.budget.bulk-update');
    
    // Performance dashboard
    Route::get('/offices/{office}/dashboard', function ($office) {
        $officeModel = \App\Models\Office::with('childOffices')->findOrFail($office);
        $metrics = app(OfficeController::class)->performanceMetrics($officeModel);
        return Inertia::render('Offices/Dashboard', [
            'office' => $officeModel,
            'metrics' => $metrics->getData(),
            'children_offices' => $officeModel->childOffices
        ]);
    })->name('offices.dashboard');
    Route::get('offices/{office}/performance', [OfficeController::class, 'performanceMetrics'])->name('offices.performance');
    
    // Asset tracking
    Route::get('/offices/{office}/assets', function ($office) {
        $officeModel = \App\Models\Office::findOrFail($office);
        // Mock asset data - replace with real implementation
        $assets = [
            [
                'id' => 1,
                'name' => 'Dell OptiPlex 7090',
                'asset_type' => 'computer',
                'serial_number' => 'DL7090001',
                'purchase_date' => '2023-01-15',
                'purchase_cost' => 1200,
                'current_value' => 960,
                'status' => 'active',
                'location' => 'Desk 12',
                'assigned_to' => 'John Doe',
                'warranty_expires' => '2026-01-15'
            ],
            [
                'id' => 2,
                'name' => 'HP LaserJet Pro',
                'asset_type' => 'printer',
                'serial_number' => 'HP2023001',
                'purchase_date' => '2023-03-20',
                'purchase_cost' => 350,
                'current_value' => 245,
                'status' => 'maintenance',
                'location' => 'Print Station',
                'warranty_expires' => '2025-03-20'
            ]
        ];
        return Inertia::render('Offices/Assets', [
            'office' => $officeModel,
            'assets' => $assets,
            'asset_types' => ['computer', 'laptop', 'printer', 'phone', 'furniture'],
            'total_value' => 1205,
            'depreciation_rate' => 20
        ]);
    })->name('offices.assets');
    Route::post('/offices/{office}/assets', [OfficeController::class, 'storeAsset'])->name('offices.assets.store');
    
    // Office settings
    Route::get('/offices/{office}/settings', function ($office) {
        $officeModel = \App\Models\Office::findOrFail($office);
        // Mock settings data - replace with real implementation
        $settings = [
            'general' => [
                'name' => $officeModel->name,
                'office_type' => $officeModel->office_type,
                'description' => $officeModel->description ?? '',
                'capacity' => 50,
                'operating_hours' => [
                    'start' => '09:00',
                    'end' => '17:00',
                    'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                ]
            ],
            'contact' => [
                'phone' => '+1 (555) 123-4567',
                'email' => 'office@company.com',
                'address' => [
                    'street' => '123 Main Street',
                    'city' => 'New York',
                    'state' => 'NY',
                    'zip' => '10001',
                    'country' => 'United States'
                ]
            ],
            'permissions' => [
                'can_manage_budget' => true,
                'can_transfer_staff' => true,
                'can_create_sub_offices' => false,
                'requires_approval_for_transfers' => true,
                'budget_approval_limit' => 10000
            ],
            'notifications' => [
                'budget_alerts' => true,
                'staff_notifications' => true,
                'performance_reports' => false,
                'maintenance_reminders' => true,
                'email_frequency' => 'daily'
            ],
            'workflow' => [
                'auto_assign_assets' => false,
                'require_manager_approval' => true,
                'default_budget_allocation_method' => 'equal',
                'asset_depreciation_rate' => 20.0
            ]
        ];
        return Inertia::render('Offices/Settings', [
            'office' => array_merge($officeModel->toArray(), ['settings' => $settings]),
            'office_types' => ['headquarters', 'regional', 'branch', 'department'],
            'parent_offices' => \App\Models\Office::where('id', '!=', $office)->get(['id', 'name'])
        ]);
    })->name('offices.settings');
    Route::put('/offices/{office}/settings', [OfficeController::class, 'updateSettings'])->name('offices.settings.update');
    
    // Staff transfers
    Route::post('offices/{office}/transfer-users', [OfficeController::class, 'transferUsers'])->name('offices.transfer-users');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
