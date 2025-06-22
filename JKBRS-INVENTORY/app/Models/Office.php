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
        'office_code',
        'office_type',
        'parent_office_id',
        'location',
        'contact_phone',
        'contact_email',
        'manager_id',
        'budget_allocated',
        'budget_spent',
        'budget_period',
        'budget_notes',
        'description',
        'status',
        'opening_date',
        'closing_date',
        'settings',
        // Legacy fields for backward compatibility
        'code',
        'type',
        'address',
        'phone',
        'email',
        'manager_name',
        'budget_allocation',
        'is_active',
    ];

    protected $casts = [
        'budget_allocated' => 'decimal:2',
        'budget_spent' => 'decimal:2',
        'opening_date' => 'date',
        'closing_date' => 'date',
        'settings' => 'array',
        'is_active' => 'boolean',
        // Legacy field for backward compatibility
        'budget_allocation' => 'decimal:2',
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

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
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

    // Get all office IDs that this office can access (self and subordinates)
    public function getAccessibleOfficeIds(): array
    {
        return $this->getAllSubordinateOffices()->pluck('id')->toArray();
    }

    // Static method to get all office IDs for a given office
    public static function getAllOfficeIds($officeId): array
    {
        $office = self::find($officeId);
        if (!$office) {
            return [$officeId];
        }
        return $office->getAccessibleOfficeIds();
    }

    // Get child office IDs recursively
    public static function getChildOfficeIds($officeId): array
    {
        $office = self::find($officeId);
        if (!$office) {
            return [];
        }
        
        $childIds = [];
        foreach ($office->childOffices as $child) {
            $childIds[] = $child->id;
            $childIds = array_merge($childIds, self::getChildOfficeIds($child->id));
        }
        
        return $childIds;
    }

    // Get available office types
    public static function getOfficeTypes(): array
    {
        return [
            'headquarters',
            'regional',
            'branch',
            'warehouse',
            'retail',
            'service_center',
        ];
    }
}
