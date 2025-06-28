<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\Office;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryItemController extends Controller
{
    /**
     * Display a listing of inventory items.
     */
    public function index(Request $request)
    {
        $query = InventoryItem::with(['office'])
            ->orderBy('created_at', 'desc');

        // Filter by office
        if ($request->filled('office_id')) {
            $query->where('office_id', $request->office_id);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Search by name or item code
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('item_code', 'like', "%{$search}%");
            });
        }

        // Filter by low stock
        if ($request->boolean('low_stock')) {
            $query->whereRaw('quantity <= minimum_stock');
        }

        // Filter by active status
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $inventoryItems = $query->paginate(15);

        return Inertia::render('Inventory/Index', [
            'inventoryItems' => $inventoryItems,
            'offices' => Office::select('id', 'name')->get(),
            'categories' => InventoryItem::distinct()->pluck('category'),
            'filters' => $request->only(['office_id', 'category', 'search', 'low_stock', 'is_active'])
        ]);
    }

    /**
     * Show the form for creating a new inventory item.
     */
    public function create()
    {
        return Inertia::render('Inventory/Create', [
            'offices' => Office::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    /**
     * Store a newly created inventory item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'office_id' => 'required|exists:offices,id',
            'item_code' => 'required|string|max:255|unique:inventory_items',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'expiry_date' => 'nullable|date|after:today',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $inventoryItem = InventoryItem::create($validated);

        return redirect()->route('inventory.index')
            ->with('success', 'Inventory item created successfully.');
    }

    /**
     * Display the specified inventory item.
     */
    public function show(InventoryItem $inventoryItem)
    {
        $inventoryItem->load(['office', 'transactionItems.salesTransaction']);

        return Inertia::render('Inventory/Show', [
            'inventoryItem' => $inventoryItem
        ]);
    }

    /**
     * Show the form for editing the specified inventory item.
     */
    public function edit(InventoryItem $inventoryItem)
    {
        return Inertia::render('Inventory/Edit', [
            'inventoryItem' => $inventoryItem,
            'offices' => Office::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    /**
     * Update the specified inventory item.
     */
    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $validated = $request->validate([
            'office_id' => 'required|exists:offices,id',
            'item_code' => 'required|string|max:255|unique:inventory_items,item_code,' . $inventoryItem->id,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'expiry_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $inventoryItem->update($validated);

        return redirect()->route('inventory.index')
            ->with('success', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified inventory item from storage.
     */
    public function destroy(InventoryItem $inventoryItem)
    {
        // Check if item has transactions
        if ($inventoryItem->transactionItems()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete inventory item with existing transactions.');
        }

        $inventoryItem->delete();

        return redirect()->route('inventory.index')
            ->with('success', 'Inventory item deleted successfully.');
    }

    /**
     * Get low stock items
     */
    public function lowStock()
    {
        $lowStockItems = InventoryItem::with('office')
            ->whereRaw('quantity <= minimum_stock')
            ->where('is_active', true)
            ->orderBy('quantity', 'asc')
            ->get();

        return Inertia::render('Inventory/LowStock', [
            'lowStockItems' => $lowStockItems
        ]);
    }

    /**
     * Adjust inventory quantity
     */
    public function adjustQuantity(Request $request, InventoryItem $inventoryItem)
    {
        $validated = $request->validate([
            'adjustment_type' => 'required|in:increase,decrease,set',
            'quantity' => 'required|integer|min:0',
            'reason' => 'required|string|max:255'
        ]);

        $oldQuantity = $inventoryItem->quantity;
        
        switch ($validated['adjustment_type']) {
            case 'increase':
                $newQuantity = $oldQuantity + $validated['quantity'];
                break;
            case 'decrease':
                $newQuantity = max(0, $oldQuantity - $validated['quantity']);
                break;
            case 'set':
                $newQuantity = $validated['quantity'];
                break;
        }

        $inventoryItem->update(['quantity' => $newQuantity]);

        // Log the adjustment (you can create a stock_adjustments table for this)
        // StockAdjustment::create([...]);

        return redirect()->back()
            ->with('success', "Inventory adjusted from {$oldQuantity} to {$newQuantity}");
    }
}
