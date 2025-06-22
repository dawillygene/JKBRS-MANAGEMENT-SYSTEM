<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'office_id',
        'item_code',
        'name',
        'description',
        'category',
        'unit',
        'quantity',
        'minimum_stock',
        'cost_price',
        'selling_price',
        'supplier',
        'expiry_date',
        'location',
        'attributes',
        'is_active',
    ];

    protected $casts = [
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'expiry_date' => 'date',
        'attributes' => 'array',
        'is_active' => 'boolean',
    ];

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    // Check if item is low stock
    public function isLowStock(): bool
    {
        return $this->quantity <= $this->minimum_stock;
    }

    // Check if item is expired
    public function isExpired(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    // Format prices with Tsh currency
    public function getFormattedCostPriceAttribute(): string
    {
        return 'Tsh ' . number_format($this->cost_price, 2);
    }

    public function getFormattedSellingPriceAttribute(): string
    {
        return 'Tsh ' . number_format($this->selling_price, 2);
    }

    // Calculate total value in stock
    public function getTotalValueAttribute(): float
    {
        return $this->quantity * $this->cost_price;
    }

    public function getFormattedTotalValueAttribute(): string
    {
        return 'Tsh ' . number_format($this->total_value, 2);
    }
}
