<?php

namespace App\Http\Controllers;

use App\Models\StockAdjustment;
use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockAdjustmentController extends Controller
{
    /**
     * Display a listing of stock adjustments.
     */
    public function index(Request $request)
    {
        $query = StockAdjustment::with(['inventoryItem', 'adjustedBy'])
            ->orderBy('created_at', 'desc');

        // Filter by adjustment type
        if ($request->filled('adjustment_type')) {
            $query->where('adjustment_type', $request->adjustment_type);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Search by reason or item
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('reason', 'like', "%{$search}%")
                  ->orWhereHas('inventoryItem', function ($itemQuery) use ($search) {
                      $itemQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $adjustments = $query->paginate(15);

        return Inertia::render('StockAdjustments/Index', [
            'adjustments' => $adjustments,
            'filters' => $request->only(['adjustment_type', 'date_from', 'date_to', 'search'])
        ]);
    }

    /**
     * Show the form for creating a new stock adjustment.
     */
    public function create()
    {
        return Inertia::render('StockAdjustments/Create', [
            'inventoryItems' => InventoryItem::with('office')
                ->where('is_active', true)
                ->select('id', 'name', 'item_code', 'quantity', 'office_id')
                ->get()
        ]);
    }

    /**
     * Store a newly created stock adjustment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'adjustment_type' => 'required|in:increase,decrease,correction,damage,loss,found',
            'quantity_before' => 'required|numeric',
            'quantity_after' => 'required|numeric|min:0',
            'adjustment_quantity' => 'required|numeric',
            'unit_cost' => 'nullable|numeric|min:0',
            'reason' => 'required|string|max:500',
            'reference_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string'
        ]);

        $validated['adjusted_by'] = auth()->id();
        $validated['adjustment_date'] = now();

        // Calculate financial impact
        $inventoryItem = InventoryItem::find($validated['inventory_item_id']);
        $validated['financial_impact'] = $validated['adjustment_quantity'] * 
            ($validated['unit_cost'] ?? $inventoryItem->cost_price);

        $adjustment = StockAdjustment::create($validated);

        // Update inventory item quantity
        $inventoryItem->update(['quantity' => $validated['quantity_after']]);

        return redirect()->route('stock-adjustments.index')
            ->with('success', 'Stock adjustment created successfully.');
    }

    /**
     * Display the specified stock adjustment.
     */
    public function show(StockAdjustment $stockAdjustment)
    {
        $stockAdjustment->load(['inventoryItem.office', 'adjustedBy']);

        return Inertia::render('StockAdjustments/Show', [
            'adjustment' => $stockAdjustment
        ]);
    }

    /**
     * Show the form for editing the specified stock adjustment.
     */
    public function edit(StockAdjustment $stockAdjustment)
    {
        return Inertia::render('StockAdjustments/Edit', [
            'adjustment' => $stockAdjustment->load('inventoryItem'),
            'inventoryItems' => InventoryItem::with('office')
                ->where('is_active', true)
                ->select('id', 'name', 'item_code', 'quantity', 'office_id')
                ->get()
        ]);
    }

    /**
     * Update the specified stock adjustment.
     */
    public function update(Request $request, StockAdjustment $stockAdjustment)
    {
        $validated = $request->validate([
            'adjustment_type' => 'required|in:increase,decrease,correction,damage,loss,found',
            'reason' => 'required|string|max:500',
            'reference_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string'
        ]);

        $stockAdjustment->update($validated);

        return redirect()->route('stock-adjustments.index')
            ->with('success', 'Stock adjustment updated successfully.');
    }

    /**
     * Remove the specified stock adjustment from storage.
     */
    public function destroy(StockAdjustment $stockAdjustment)
    {
        // Reverse the adjustment by updating inventory quantity
        $inventoryItem = $stockAdjustment->inventoryItem;
        $reversedQuantity = $stockAdjustment->quantity_before;
        
        $inventoryItem->update(['quantity' => $reversedQuantity]);
        $stockAdjustment->delete();

        return redirect()->route('stock-adjustments.index')
            ->with('success', 'Stock adjustment deleted and quantity reversed successfully.');
    }

    /**
     * Get adjustment summary/statistics
     */
    public function summary(Request $request)
    {
        $dateFrom = $request->get('date_from', now()->startOfMonth());
        $dateTo = $request->get('date_to', now()->endOfMonth());

        $summary = StockAdjustment::whereBetween('created_at', [$dateFrom, $dateTo])
            ->selectRaw('
                adjustment_type,
                COUNT(*) as count,
                SUM(ABS(adjustment_quantity)) as total_quantity,
                SUM(ABS(financial_impact)) as total_financial_impact
            ')
            ->groupBy('adjustment_type')
            ->get();

        $totalAdjustments = StockAdjustment::whereBetween('created_at', [$dateFrom, $dateTo])->count();
        $totalFinancialImpact = StockAdjustment::whereBetween('created_at', [$dateFrom, $dateTo])
            ->sum('financial_impact');

        return Inertia::render('StockAdjustments/Summary', [
            'summary' => $summary,
            'totalAdjustments' => $totalAdjustments,
            'totalFinancialImpact' => $totalFinancialImpact,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo
        ]);
    }
}
