<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'permissions',
    ];

    protected $casts = [
        'permissions' => 'array',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->permissions ?? []);
    }

    // Default role permissions
    public static function getDefaultPermissions(): array
    {
        return [
            'admin' => [
                'manage_users', 'manage_offices', 'manage_inventory', 
                'manage_sales', 'manage_payroll', 'view_reports', 
                'manage_system_settings', 'view_all_offices'
            ],
            'office_manager' => [
                'manage_office_users', 'manage_office_inventory', 
                'manage_office_sales', 'manage_office_payroll', 
                'view_office_reports', 'manage_office_settings'
            ],
            'branch_manager' => [
                'manage_branch_users', 'manage_branch_inventory', 
                'manage_branch_sales', 'view_branch_reports'
            ],
            'cashier' => [
                'create_sales', 'view_inventory', 'process_payments'
            ],
            'inventory_clerk' => [
                'manage_inventory', 'view_reports', 'update_stock'
            ],
            'sales_person' => [
                'create_sales', 'view_customers', 'view_inventory'
            ],
            'accountant' => [
                'manage_payroll', 'view_financial_reports', 'manage_transactions'
            ],
            'employee' => [
                'view_own_profile', 'view_own_payroll'
            ]
        ];
    }
}
