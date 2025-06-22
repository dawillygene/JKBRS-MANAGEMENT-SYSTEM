<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleBasedSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $this->createRoles();
        
        // Create offices
        $this->createOffices();
        
        // Create default admin user
        $this->createAdminUser();
        
        // Create sample users for different offices
        $this->createSampleUsers();
    }

    private function createRoles(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'System Administrator',
                'description' => 'Full system access and management',
                'permissions' => Role::getDefaultPermissions()['admin']
            ],
            [
                'name' => 'office_manager',
                'display_name' => 'Office Manager',
                'description' => 'Manages regional office operations',
                'permissions' => Role::getDefaultPermissions()['office_manager']
            ],
            [
                'name' => 'branch_manager',
                'display_name' => 'Branch Manager',
                'description' => 'Manages branch operations',
                'permissions' => Role::getDefaultPermissions()['branch_manager']
            ],
            [
                'name' => 'cashier',
                'display_name' => 'Cashier',
                'description' => 'Handles sales and payments',
                'permissions' => Role::getDefaultPermissions()['cashier']
            ],
            [
                'name' => 'inventory_clerk',
                'display_name' => 'Inventory Clerk',
                'description' => 'Manages inventory and stock',
                'permissions' => Role::getDefaultPermissions()['inventory_clerk']
            ],
            [
                'name' => 'sales_person',
                'display_name' => 'Sales Person',
                'description' => 'Handles sales and customer relations',
                'permissions' => Role::getDefaultPermissions()['sales_person']
            ],
            [
                'name' => 'accountant',
                'display_name' => 'Accountant',
                'description' => 'Manages financial records and payroll',
                'permissions' => Role::getDefaultPermissions()['accountant']
            ],
            [
                'name' => 'employee',
                'display_name' => 'Employee',
                'description' => 'Basic employee access',
                'permissions' => Role::getDefaultPermissions()['employee']
            ]
        ];

        foreach ($roles as $roleData) {
            Role::create($roleData);
        }
    }

    private function createOffices(): void
    {
        // Main Office
        $mainOffice = Office::create([
            'name' => 'JKBRS Main Office',
            'code' => 'MAIN001',
            'type' => 'main',
            'parent_office_id' => null,
            'address' => 'Dar es Salaam, Tanzania',
            'phone' => '+255 22 123 4567',
            'email' => 'main@jkbrs.co.tz',
            'manager_name' => 'John Mkuu',
            'budget_allocation' => 50000000.00, // 50M Tsh
            'is_active' => true,
        ]);

        // Regional Offices
        $regions = [
            [
                'name' => 'JKBRS Arusha Regional Office',
                'code' => 'REG001',
                'address' => 'Arusha, Tanzania',
                'phone' => '+255 27 123 4567',
                'email' => 'arusha@jkbrs.co.tz',
                'manager_name' => 'Mary Mwema',
                'budget_allocation' => 15000000.00, // 15M Tsh
            ],
            [
                'name' => 'JKBRS Mwanza Regional Office',
                'code' => 'REG002',
                'address' => 'Mwanza, Tanzania',
                'phone' => '+255 28 123 4567',
                'email' => 'mwanza@jkbrs.co.tz',
                'manager_name' => 'Peter Mzuri',
                'budget_allocation' => 12000000.00, // 12M Tsh
            ],
            [
                'name' => 'JKBRS Dodoma Regional Office',
                'code' => 'REG003',
                'address' => 'Dodoma, Tanzania',
                'phone' => '+255 26 123 4567',
                'email' => 'dodoma@jkbrs.co.tz',
                'manager_name' => 'Grace Hodari',
                'budget_allocation' => 10000000.00, // 10M Tsh
            ]
        ];

        $regionalOffices = [];
        foreach ($regions as $index => $regionData) {
            $regionData['type'] = 'regional';
            $regionData['parent_office_id'] = $mainOffice->id;
            $regionData['is_active'] = true;
            $regionalOffices[] = Office::create($regionData);
        }

        // Branches for each regional office
        $branches = [
            // Arusha branches
            [
                'name' => 'JKBRS Arusha Branch 1',
                'code' => 'BR001',
                'parent_office_id' => $regionalOffices[0]->id,
                'address' => 'Sokoine Road, Arusha',
                'manager_name' => 'James Kijana',
                'budget_allocation' => 3000000.00, // 3M Tsh
            ],
            [
                'name' => 'JKBRS Arusha Branch 2',
                'code' => 'BR002',
                'parent_office_id' => $regionalOffices[0]->id,
                'address' => 'Market Street, Arusha',
                'manager_name' => 'Sarah Mwanga',
                'budget_allocation' => 2500000.00, // 2.5M Tsh
            ],
            // Mwanza branches
            [
                'name' => 'JKBRS Mwanza Branch 1',
                'code' => 'BR003',
                'parent_office_id' => $regionalOffices[1]->id,
                'address' => 'Kenyatta Road, Mwanza',
                'manager_name' => 'David Mwalimu',
                'budget_allocation' => 2800000.00, // 2.8M Tsh
            ],
            [
                'name' => 'JKBRS Mwanza Branch 2',
                'code' => 'BR004',
                'parent_office_id' => $regionalOffices[1]->id,
                'address' => 'Station Road, Mwanza',
                'manager_name' => 'Ruth Msanii',
                'budget_allocation' => 2200000.00, // 2.2M Tsh
            ],
            // Dodoma branches
            [
                'name' => 'JKBRS Dodoma Branch 1',
                'code' => 'BR005',
                'parent_office_id' => $regionalOffices[2]->id,
                'address' => 'Central Avenue, Dodoma',
                'manager_name' => 'Michael Msimbe',
                'budget_allocation' => 2000000.00, // 2M Tsh
            ]
        ];

        foreach ($branches as $branchData) {
            $branchData['type'] = 'branch';
            $branchData['is_active'] = true;
            Office::create($branchData);
        }
    }

    private function createAdminUser(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $mainOffice = Office::where('type', 'main')->first();

        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@jkbrs.co.tz',
            'password' => Hash::make('password123'),
            'role_id' => $adminRole->id,
            'office_id' => $mainOffice->id,
            'employee_id' => 'EMP001',
            'phone' => '+255 712 345 678',
            'hire_date' => now()->subYears(5),
            'salary' => 2500000.00, // 2.5M Tsh
            'employment_status' => 'active',
            'email_verified_at' => now(),
        ]);
    }

    private function createSampleUsers(): void
    {
        $officeManagerRole = Role::where('name', 'office_manager')->first();
        $branchManagerRole = Role::where('name', 'branch_manager')->first();
        $cashierRole = Role::where('name', 'cashier')->first();
        $inventoryClerkRole = Role::where('name', 'inventory_clerk')->first();

        $regionalOffices = Office::where('type', 'regional')->get();
        $branches = Office::where('type', 'branch')->get();

        // Create office managers for regional offices
        foreach ($regionalOffices as $index => $office) {
            User::create([
                'name' => $office->manager_name,
                'email' => strtolower(str_replace(' ', '.', $office->manager_name)) . '@jkbrs.co.tz',
                'password' => Hash::make('password123'),
                'role_id' => $officeManagerRole->id,
                'office_id' => $office->id,
                'employee_id' => 'EMP' . str_pad($index + 2, 3, '0', STR_PAD_LEFT),
                'phone' => '+255 ' . (712 + $index) . ' 345 678',
                'hire_date' => now()->subYears(3),
                'salary' => 1800000.00, // 1.8M Tsh
                'employment_status' => 'active',
                'email_verified_at' => now(),
            ]);
        }

        // Create branch managers
        foreach ($branches as $index => $branch) {
            User::create([
                'name' => $branch->manager_name,
                'email' => strtolower(str_replace(' ', '.', $branch->manager_name)) . '@jkbrs.co.tz',
                'password' => Hash::make('password123'),
                'role_id' => $branchManagerRole->id,
                'office_id' => $branch->id,
                'employee_id' => 'EMP' . str_pad($index + 10, 3, '0', STR_PAD_LEFT),
                'phone' => '+255 ' . (722 + $index) . ' 345 678',
                'hire_date' => now()->subYears(2),
                'salary' => 1200000.00, // 1.2M Tsh
                'employment_status' => 'active',
                'email_verified_at' => now(),
            ]);

            // Add cashiers and inventory clerks for each branch
            User::create([
                'name' => 'Cashier ' . ($index + 1),
                'email' => 'cashier' . ($index + 1) . '@jkbrs.co.tz',
                'password' => Hash::make('password123'),
                'role_id' => $cashierRole->id,
                'office_id' => $branch->id,
                'employee_id' => 'EMP' . str_pad($index + 20, 3, '0', STR_PAD_LEFT),
                'phone' => '+255 ' . (732 + $index) . ' 345 678',
                'hire_date' => now()->subYear(),
                'salary' => 800000.00, // 800K Tsh
                'employment_status' => 'active',
                'email_verified_at' => now(),
            ]);

            User::create([
                'name' => 'Inventory Clerk ' . ($index + 1),
                'email' => 'inventory' . ($index + 1) . '@jkbrs.co.tz',
                'password' => Hash::make('password123'),
                'role_id' => $inventoryClerkRole->id,
                'office_id' => $branch->id,
                'employee_id' => 'EMP' . str_pad($index + 30, 3, '0', STR_PAD_LEFT),
                'phone' => '+255 ' . (742 + $index) . ' 345 678',
                'hire_date' => now()->subMonths(6),
                'salary' => 750000.00, // 750K Tsh
                'employment_status' => 'active',
                'email_verified_at' => now(),
            ]);
        }
    }
}
