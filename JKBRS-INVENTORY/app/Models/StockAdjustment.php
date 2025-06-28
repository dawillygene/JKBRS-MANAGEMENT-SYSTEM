<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockAdjustment extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_item_id',
        'adjustment_type',
        'quantity_before',
        'quantity_after',
        'adjustment_quantity',
        'unit_cost',
        'financial_impact',
        'reason',
        'reference_number',
        'notes',
        'adjusted_by',
        'adjustment_date',
        'approved_by',
        'approved_at'
    ];

    protected $casts = [
        'quantity_before' => 'decimal:3',
        'quantity_after' => 'decimal:3',
        'adjustment_quantity' => 'decimal:3',
        'unit_cost' => 'decimal:2',
        'financial_impact' => 'decimal:2',
        'adjustment_date' => 'datetime',
        'approved_at' => 'datetime'
    ];

    const ADJUSTMENT_TYPES = [
        'increase' => 'Stock Increase',
        'decrease' => 'Stock Decrease',
        'correction' => 'Inventory Correction',
        'damage' => 'Damaged Goods',
        'loss' => 'Stock Loss',
        'found' => 'Stock Found',
        'return' => 'Customer Return',
        'transfer' => 'Transfer Adjustment'
    ];

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }

    public function adjustedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'adjusted_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get the adjustment type label
     */
    public function getAdjustmentTypeLabelAttribute(): string
    {
        return self::ADJUSTMENT_TYPES[$this->adjustment_type] ?? $this->adjustment_type;
    }

    /**
     * Scope for pending approvals
     */
    public function scopePendingApproval($query)
    {
        return $query->whereNull('approved_by');
    }

    /**
     * Scope for approved adjustments
     */
    public function scopeApproved($query)
    {
        return $query->whereNotNull('approved_by');
    }

    /**
     * Check if adjustment needs approval
     */
    public function needsApproval(): bool
    {
        // Define business rules for when adjustments need approval
        return abs((float) $this->financial_impact) > 100000; // Adjustments over 100,000 TSH need approval
    }
}
