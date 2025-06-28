<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'sku',
        'barcode',
        'category_id',
        'cost_price',
        'selling_price',
        'min_price',
        'unit_of_measure',
        'images',
        'weight',
        'dimensions',
        'specifications',
        'is_active',
        'track_quantity',
        'has_variants',
        'tags',
        'metadata'
    ];

    protected $casts = [
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'min_price' => 'decimal:2',
        'weight' => 'decimal:3',
        'is_active' => 'boolean',
        'track_quantity' => 'boolean',
        'has_variants' => 'boolean',
        'images' => 'array',
        'dimensions' => 'array',
        'tags' => 'array',
        'metadata' => 'array'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($product) {
            if (empty($product->sku)) {
                $product->sku = static::generateSKU($product->name);
            }
        });
    }

    /**
     * Get the category that owns the product
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get product variants
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Get inventory items for this product
     */
    public function inventoryItems(): HasMany
    {
        return $this->hasMany(InventoryItem::class);
    }

    /**
     * Get stock movements for this product
     */
    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Scope for active products
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for products with variants
     */
    public function scopeWithVariants($query)
    {
        return $query->where('has_variants', true);
    }

    /**
     * Get total stock across all offices
     */
    public function getTotalStockAttribute(): int
    {
        return $this->inventoryItems()->sum('quantity');
    }

    /**
     * Get profit margin
     */
    public function getProfitMarginAttribute(): float
    {
        if ($this->cost_price > 0) {
            return (($this->selling_price - $this->cost_price) / $this->cost_price) * 100;
        }
        return 0;
    }

    /**
     * Generate unique SKU
     */
    public static function generateSKU(string $name): string
    {
        $prefix = 'PRD';
        $base = strtoupper(substr(Str::slug($name, ''), 0, 6));
        $number = str_pad(static::count() + 1, 4, '0', STR_PAD_LEFT);
        
        return $prefix . $base . $number;
    }

    /**
     * Get product display name with variant
     */
    public function getDisplayNameAttribute(): string
    {
        $name = $this->name;
        if ($this->has_variants && $this->variants->isNotEmpty()) {
            $variants = $this->variants->pluck('variant_value')->join(', ');
            $name .= " ({$variants})";
        }
        return $name;
    }

    /**
     * Check if product has sufficient stock in office
     */
    public function hasSufficientStock(int $officeId, int $quantity): bool
    {
        $inventoryItem = $this->inventoryItems()
            ->where('office_id', $officeId)
            ->first();
            
        if (!$inventoryItem) {
            return false;
        }
        
        return ($inventoryItem->quantity - $inventoryItem->reserved_quantity) >= $quantity;
    }

    /**
     * Get stock level in specific office
     */
    public function getStockInOffice(int $officeId): int
    {
        $inventoryItem = $this->inventoryItems()
            ->where('office_id', $officeId)
            ->first();
            
        return $inventoryItem ? $inventoryItem->quantity : 0;
    }
}
