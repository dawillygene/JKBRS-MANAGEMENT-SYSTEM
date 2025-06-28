<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PhysicalCountItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'physical_count_id',
        'inventory_item_id',
        'expected_quantity',
        'counted_quantity',
        'variance_quantity',
        'variance_percentage',
        'unit_cost',
        'variance_value',
        'notes',
        'counted_by',
        'counted_at'
    ];

    protected $casts = [
        'expected_quantity' => 'decimal:3',
        'counted_quantity' => 'decimal:3',
        'variance_quantity' => 'decimal:3',
        'variance_percentage' => 'decimal:2',
        'unit_cost' => 'decimal:2',
        'variance_value' => 'decimal:2',
        'counted_at' => 'datetime'
    ];

    public function physicalCount(): BelongsTo
    {
        return $this->belongsTo(PhysicalCount::class);
    }

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }

    public function countedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'counted_by');
    }

    /**
     * Check if there's a discrepancy
     */
    public function hasDiscrepancy(): bool
    {
        return abs((float) $this->variance_quantity) > 0;
    }

    /**
     * Get variance type (positive/negative)
     */
    public function getVarianceTypeAttribute(): string
    {
        if ($this->variance_quantity > 0) {
            return 'overage';
        } elseif ($this->variance_quantity < 0) {
            return 'shortage';
        }
        return 'none';
    }

    /**
     * Calculate variance when quantities are set
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($item) {
            if ($item->expected_quantity !== null && $item->counted_quantity !== null) {
                $item->variance_quantity = $item->counted_quantity - $item->expected_quantity;
                
                if ($item->expected_quantity > 0) {
                    $item->variance_percentage = ($item->variance_quantity / $item->expected_quantity) * 100;
                } else {
                    $item->variance_percentage = 0;
                }

                if ($item->unit_cost) {
                    $item->variance_value = $item->variance_quantity * $item->unit_cost;
                }
            }
        });
    }
}
