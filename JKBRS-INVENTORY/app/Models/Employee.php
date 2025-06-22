<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_number',
        'user_id',
        'office_id',
        'manager_id',
        'first_name',
        'last_name',
        'middle_name',
        'position',
        'department',
        'employment_type',
        'hire_date',
        'probation_end_date',
        'basic_salary',
        'allowances',
        'bank_name',
        'bank_account_number',
        'nssf_number',
        'tax_number',
        'national_id',
        'birth_date',
        'gender',
        'marital_status',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relationship',
        'profile_photo',
        'status',
        'termination_date',
        'termination_reason',
        'skills',
        'qualifications',
    ];

    protected $casts = [
        'hire_date' => 'date',
        'probation_end_date' => 'date',
        'birth_date' => 'date',
        'termination_date' => 'date',
        'basic_salary' => 'decimal:2',
        'allowances' => 'json',
        'skills' => 'json',
        'qualifications' => 'json',
    ];

    protected $dates = ['deleted_at'];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    public function subordinates(): HasMany
    {
        return $this->hasMany(Employee::class, 'manager_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(EmployeeDocument::class);
    }

    public function performanceReviews(): HasMany
    {
        return $this->hasMany(EmployeePerformance::class);
    }

    public function training(): HasMany
    {
        return $this->hasMany(EmployeeTraining::class);
    }

    // Scopes for office-based filtering
    public function scopeForOffice($query, $officeId)
    {
        return $query->where('office_id', $officeId);
    }

    public function scopeForOfficeAndSubOffices($query, $officeIds)
    {
        return $query->whereIn('office_id', $officeIds);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Accessors
    public function getFullNameAttribute(): string
    {
        $names = array_filter([
            $this->first_name,
            $this->middle_name,
            $this->last_name
        ]);
        
        return implode(' ', $names) ?: 'Unknown Employee';
    }

    public function getIsOnProbationAttribute(): bool
    {
        return $this->probation_end_date && $this->probation_end_date->isFuture();
    }

    // Helper methods
    public function canBeAccessedBy(User $user): bool
    {
        // Admin can access all employees
        if ($user->role->name === 'admin') {
            return true;
        }

        // Manager can access employees in their office and sub-offices
        if ($user->role->name === 'manager') {
            $userOfficeIds = $user->office->getAccessibleOfficeIds();
            return in_array($this->office_id, $userOfficeIds);
        }

        // HR can access employees in their office
        if ($user->role->name === 'hr') {
            return $this->office_id === $user->office_id;
        }

        // Users can only access their own record
        return $this->user_id === $user->id;
    }

    public function getTotalCompensation(): float
    {
        $allowancesTotal = collect($this->allowances ?? [])->sum();
        return $this->basic_salary + $allowancesTotal;
    }

    public function getYearsOfService(): int
    {
        return $this->hire_date->diffInYears(now());
    }

    // Generate unique employee number
    public static function generateEmployeeNumber($officeId): string
    {
        $office = Office::find($officeId);
        $officeCode = strtoupper(substr($office->name, 0, 3));
        $year = date('Y');
        $lastEmployee = self::where('employee_number', 'like', "$officeCode$year%")
                           ->orderBy('employee_number', 'desc')
                           ->first();
        
        if ($lastEmployee) {
            $lastNumber = (int)substr($lastEmployee->employee_number, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return $officeCode . $year . $newNumber;
    }
}
