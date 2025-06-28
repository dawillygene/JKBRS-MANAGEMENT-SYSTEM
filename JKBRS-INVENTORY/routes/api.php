<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\InventoryItem;
use App\Models\Product;
use App\Models\Category;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public inventory API endpoints (for mobile apps, etc.)
Route::prefix('v1')->group(function () {
    
    // Inventory dashboard data
    Route::get('/inventory/dashboard', function () {
        return response()->json([
            'total_items' => InventoryItem::count(),
            'total_categories' => Category::count(),
            'total_products' => Product::count(),
            'low_stock_items' => InventoryItem::whereRaw('quantity <= minimum_stock')->count(),
            'total_value' => DB::select('SELECT SUM(total_value) as total FROM inventory_summary')[0]->total ?? 0,
            'recent_activities' => [
                'last_updated' => InventoryItem::latest('updated_at')->first()?->updated_at,
                'stock_movements_today' => 0, // Would come from stock_movements table
            ]
        ]);
    });

    // Low stock alerts
    Route::get('/inventory/low-stock', function () {
        $lowStockItems = DB::select('CALL GenerateLowStockReport(NULL)');
        return response()->json([
            'count' => count($lowStockItems),
            'items' => $lowStockItems
        ]);
    });

    // Inventory summary
    Route::get('/inventory/summary', function () {
        $summary = DB::select('SELECT * FROM inventory_summary ORDER BY updated_at DESC LIMIT 20');
        return response()->json([
            'summary' => $summary
        ]);
    });

    // Search inventory items
    Route::get('/inventory/search', function (Request $request) {
        $query = $request->get('q');
        $items = InventoryItem::with('office')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('item_code', 'like', "%{$query}%")
            ->orWhere('category', 'like', "%{$query}%")
            ->limit(10)
            ->get();
        
        return response()->json([
            'items' => $items
        ]);
    });
});
