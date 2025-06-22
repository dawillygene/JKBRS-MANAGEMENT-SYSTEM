<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'type',
        'parent_office_id',
        'address',
        'phone',
        'email',
        'manager_name',
        'budget_allocation',
        'settings',
        'is_active',
    ];

    protected $casts = [
        'budget_allocation' => 'decimal:2',
        'settings' => 'array',
        'is_active' => 'boolean',
    ];

    public function parentOffice(): BelongsTo
    {
        return $this->belongsTo(Office::class, 'parent_office_id');
    }

    public function childOffices(): HasMany
    {
        return $this->hasMany(Office::class, 'parent_office_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function inventoryItems(): HasMany
    {
        return $this->hasMany(InventoryItem::class);
    }

    public function salesTransactions(): HasMany
    {
        return $this->hasMany(SalesTransaction::class);
    }

    public function payrollRecords(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }

    // Get all subordinate offices (recursive)
    public function getAllSubordinateOffices()
    {
        $subordinates = collect([$this]);
        
        foreach ($this->childOffices as $child) {
            $subordinates = $subordinates->merge($child->getAllSubordinateOffices());
        }
        
        return $subordinates;
    }

    // Check if this office manages another office
    public function manages(Office $office): bool
    {
        return $this->getAllSubordinateOffices()->contains($office);
    }

    // Format budget with Tsh currency
    public function getFormattedBudgetAttribute(): string
    {
        return 'Tsh ' . number_format($this->budget_allocation, 2);
    }
}
