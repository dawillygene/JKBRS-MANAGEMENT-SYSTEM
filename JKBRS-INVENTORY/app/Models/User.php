<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'office_id',
        'employee_id',
        'phone',
        'hire_date',
        'salary',
        'employment_status',
        'permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'hire_date' => 'date',
            'salary' => 'decimal:2',
            'permissions' => 'array',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    public function salesTransactions(): HasMany
    {
        return $this->hasMany(SalesTransaction::class);
    }

    public function payrollRecords(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }

    // Check if user has a specific permission
    public function hasPermission(string $permission): bool
    {
        // Check role permissions first
        if ($this->role && $this->role->hasPermission($permission)) {
            return true;
        }

        // Check user-specific permissions
        return in_array($permission, $this->permissions ?? []);
    }

    // Check if user can manage a specific office
    public function canManageOffice(Office $office): bool
    {
        if ($this->hasPermission('view_all_offices')) {
            return true;
        }

        return $this->office_id === $office->id || 
               ($this->office && $this->office->manages($office));
    }

    // Get formatted salary
    public function getFormattedSalaryAttribute(): string
    {
        return $this->salary ? 'Tsh ' . number_format($this->salary, 2) : 'Not set';
    }

    // Check if user is admin
    public function isAdmin(): bool
    {
        return $this->role && $this->role->name === 'admin';
    }

    // Check if user is office manager
    public function isOfficeManager(): bool
    {
        return $this->role && $this->role->name === 'office_manager';
    }

    // Check if user is branch manager
    public function isBranchManager(): bool
    {
        return $this->role && $this->role->name === 'branch_manager';
    }
}
