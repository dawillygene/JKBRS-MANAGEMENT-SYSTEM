<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create offices
        $mainOffice = Office::firstOrCreate(
            ['code' => 'MAIN'],
            [
                'name' => 'Main Office',
                'type' => 'main',
                'parent_office_id' => null,
                'address' => '123 Main Street, Business District',
                'phone' => '+1-555-0100',
                'email' => 'main@jkbrs.com',
                'manager_name' => 'John Smith',
                'budget_allocation' => 500000.00,
                'is_active' => true
            ]
        );

        $branchOffice = Office::firstOrCreate(
            ['code' => 'BRANCH1'],
            [
                'name' => 'Branch Office 1',
                'type' => 'branch',
                'parent_office_id' => $mainOffice->id,
                'address' => '456 Branch Avenue, Commerce Center',
                'phone' => '+1-555-0200',
                'email' => 'branch1@jkbrs.com',
                'manager_name' => 'Emily Davis',
                'budget_allocation' => 200000.00,
                'is_active' => true
            ]
        );

        // Sample employee data
        $employeesData = [
            [
                'employee_number' => 'EMP-001',
                'office_id' => $mainOffice->id,
                'first_name' => 'John',
                'last_name' => 'Smith',
                'middle_name' => 'William',
                'position' => 'General Manager',
                'department' => 'Management',
                'employment_type' => 'full_time',
                'hire_date' => '2020-01-15',
                'basic_salary' => 75000.00,
                'gender' => 'male',
                'marital_status' => 'married',
                'status' => 'active',
                'birth_date' => '1985-03-20',
                'address' => '789 Executive Drive, Suburbia',
                'emergency_contact_name' => 'Jane Smith',
                'emergency_contact_phone' => '+1-555-1002',
                'emergency_contact_relationship' => 'Spouse',
                'national_id' => 'ID001234567',
                'bank_name' => 'First National Bank',
                'bank_account_number' => '1234567890',
            ],
            [
                'employee_number' => 'EMP-002',
                'office_id' => $mainOffice->id,
                'manager_id' => null, // Will be set after first employee is created
                'first_name' => 'Sarah',
                'last_name' => 'Johnson',
                'position' => 'HR Manager',
                'department' => 'Human Resources',
                'employment_type' => 'full_time',
                'hire_date' => '2020-03-01',
                'basic_salary' => 55000.00,
                'gender' => 'female',
                'marital_status' => 'single',
                'status' => 'active',
                'birth_date' => '1988-07-12',
                'address' => '321 Professional Plaza, Downtown',
                'emergency_contact_name' => 'Robert Johnson',
                'emergency_contact_phone' => '+1-555-2002',
                'emergency_contact_relationship' => 'Father',
                'national_id' => 'ID002234567',
                'bank_name' => 'City Bank',
                'bank_account_number' => '2234567891',
            ],
            [
                'employee_number' => 'EMP-003',
                'office_id' => $mainOffice->id,
                'first_name' => 'Michael',
                'last_name' => 'Brown',
                'position' => 'Inventory Supervisor',
                'department' => 'Operations',
                'employment_type' => 'full_time',
                'hire_date' => '2021-05-15',
                'basic_salary' => 45000.00,
                'gender' => 'male',
                'marital_status' => 'married',
                'status' => 'active',
                'birth_date' => '1990-11-08',
                'address' => '654 Worker Lane, Industrial Area',
                'emergency_contact_name' => 'Lisa Brown',
                'emergency_contact_phone' => '+1-555-3002',
                'emergency_contact_relationship' => 'Spouse',
                'national_id' => 'ID003234567',
                'bank_name' => 'Workers Bank',
                'bank_account_number' => '3234567892',
            ],
            [
                'employee_number' => 'EMP-004',
                'office_id' => $branchOffice->id,
                'first_name' => 'Emily',
                'last_name' => 'Davis',
                'position' => 'Branch Manager',
                'department' => 'Management',
                'employment_type' => 'full_time',
                'hire_date' => '2021-08-10',
                'basic_salary' => 65000.00,
                'gender' => 'female',
                'marital_status' => 'divorced',
                'status' => 'active',
                'birth_date' => '1983-04-25',
                'address' => '987 Branch Street, Satellite City',
                'emergency_contact_name' => 'Mark Davis',
                'emergency_contact_phone' => '+1-555-4002',
                'emergency_contact_relationship' => 'Brother',
                'national_id' => 'ID004234567',
                'bank_name' => 'Branch Bank',
                'bank_account_number' => '4234567893',
            ],
            [
                'employee_number' => 'EMP-005',
                'office_id' => $branchOffice->id,
                'first_name' => 'David',
                'last_name' => 'Wilson',
                'position' => 'Warehouse Associate',
                'department' => 'Operations',
                'employment_type' => 'full_time',
                'hire_date' => '2022-01-20',
                'basic_salary' => 35000.00,
                'gender' => 'male',
                'marital_status' => 'single',
                'status' => 'active',
                'birth_date' => '1995-09-14',
                'address' => '159 Warehouse Road, Industrial Park',
                'emergency_contact_name' => 'Mary Wilson',
                'emergency_contact_phone' => '+1-555-5002',
                'emergency_contact_relationship' => 'Mother',
                'national_id' => 'ID005234567',
                'bank_name' => 'Industrial Bank',
                'bank_account_number' => '5234567894',
            ],
            [
                'employee_number' => 'EMP-006',
                'office_id' => $mainOffice->id,
                'first_name' => 'Jennifer',
                'last_name' => 'Garcia',
                'position' => 'Accountant',
                'department' => 'Finance',
                'employment_type' => 'full_time',
                'hire_date' => '2022-06-01',
                'basic_salary' => 50000.00,
                'gender' => 'female',
                'marital_status' => 'married',
                'status' => 'active',
                'birth_date' => '1987-12-03',
                'address' => '753 Finance Circle, Business District',
                'emergency_contact_name' => 'Carlos Garcia',
                'emergency_contact_phone' => '+1-555-6002',
                'emergency_contact_relationship' => 'Spouse',
                'national_id' => 'ID006234567',
                'bank_name' => 'Finance Bank',
                'bank_account_number' => '6234567895',
            ],
            [
                'employee_number' => 'EMP-007',
                'office_id' => $mainOffice->id,
                'first_name' => 'Robert',
                'last_name' => 'Martinez',
                'position' => 'IT Specialist',
                'department' => 'Information Technology',
                'employment_type' => 'contract',
                'hire_date' => '2023-03-15',
                'basic_salary' => 60000.00,
                'gender' => 'male',
                'marital_status' => 'single',
                'status' => 'active',
                'birth_date' => '1992-06-18',
                'address' => '246 Tech Avenue, Innovation District',
                'emergency_contact_name' => 'Sofia Martinez',
                'emergency_contact_phone' => '+1-555-7002',
                'emergency_contact_relationship' => 'Sister',
                'national_id' => 'ID007234567',
                'bank_name' => 'Tech Bank',
                'bank_account_number' => '7234567896',
            ],
            [
                'employee_number' => 'EMP-008',
                'office_id' => $branchOffice->id,
                'first_name' => 'Ashley',
                'last_name' => 'Thompson',
                'position' => 'Customer Service Representative',
                'department' => 'Customer Service',
                'employment_type' => 'part_time',
                'hire_date' => '2023-09-01',
                'basic_salary' => 25000.00,
                'gender' => 'female',
                'marital_status' => 'single',
                'status' => 'active',
                'birth_date' => '1998-02-28',
                'address' => '135 Service Street, Retail Plaza',
                'emergency_contact_name' => 'Linda Thompson',
                'emergency_contact_phone' => '+1-555-8002',
                'emergency_contact_relationship' => 'Mother',
                'national_id' => 'ID008234567',
                'bank_name' => 'Service Bank',
                'bank_account_number' => '8234567897',
            ],
            [
                'employee_number' => 'EMP-009',
                'office_id' => $mainOffice->id,
                'first_name' => 'James',
                'last_name' => 'Lee',
                'position' => 'Marketing Coordinator',
                'department' => 'Marketing',
                'employment_type' => 'full_time',
                'hire_date' => '2023-11-20',
                'basic_salary' => 42000.00,
                'gender' => 'male',
                'marital_status' => 'married',
                'status' => 'inactive',
                'birth_date' => '1989-10-05',
                'address' => '864 Creative Drive, Arts Quarter',
                'emergency_contact_name' => 'Susan Lee',
                'emergency_contact_phone' => '+1-555-9002',
                'emergency_contact_relationship' => 'Spouse',
                'national_id' => 'ID009234567',
                'bank_name' => 'Creative Bank',
                'bank_account_number' => '9234567898',
            ],
            [
                'employee_number' => 'EMP-010',
                'office_id' => $mainOffice->id,
                'first_name' => 'Maria',
                'last_name' => 'Rodriguez',
                'position' => 'Intern',
                'department' => 'Human Resources',
                'employment_type' => 'intern',
                'hire_date' => '2024-01-08',
                'basic_salary' => 20000.00,
                'gender' => 'female',
                'marital_status' => 'single',
                'status' => 'active',
                'birth_date' => '2001-05-12',
                'address' => '97 Student Housing, University Area',
                'emergency_contact_name' => 'Antonio Rodriguez',
                'emergency_contact_phone' => '+1-555-1002',
                'emergency_contact_relationship' => 'Father',
                'national_id' => 'ID010234567',
                'bank_name' => 'Student Bank',
                'bank_account_number' => '1034567899',
            ],
        ];

        // Create corresponding users first, then employees
        $employees = [];
        
        // Get the employee role
        $employeeRole = \App\Models\Role::where('name', 'employee')->first();
        $managerRole = \App\Models\Role::where('name', 'manager')->first();
        
        foreach ($employeesData as $empData) {
            // Create a user for each employee
            $email = strtolower($empData['first_name'] . '.' . $empData['last_name'] . '@jkbrs.com');
            
            // Determine role based on position
            $roleId = $employeeRole?->id;
            if (str_contains(strtolower($empData['position']), 'manager')) {
                $roleId = $managerRole?->id ?? $employeeRole?->id;
            }
            
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $empData['first_name'] . ' ' . $empData['last_name'],
                    'email' => $email,
                    'password' => Hash::make('password123'),
                    'role_id' => $roleId,
                    'office_id' => $empData['office_id'],
                    'employee_id' => $empData['employee_number'],
                    'employment_status' => $empData['status'],
                    'hire_date' => $empData['hire_date'],
                    'salary' => $empData['basic_salary'],
                    'email_verified_at' => now(),
                ]
            );

            // Add user_id to employee data
            $empData['user_id'] = $user->id;
            
            $employee = Employee::create($empData);
            $employees[] = $employee;
        }

        // Set manager relationships
        if (count($employees) >= 3) {
            // Set General Manager as manager for HR Manager
            $employees[1]->update(['manager_id' => $employees[0]->id]);
            
            // Set HR Manager as manager for Inventory Supervisor
            $employees[2]->update(['manager_id' => $employees[1]->id]);
            
            // Set General Manager as manager for Branch Manager
            $employees[3]->update(['manager_id' => $employees[0]->id]);
            
            // Set Branch Manager as manager for Warehouse Associate
            $employees[4]->update(['manager_id' => $employees[3]->id]);
            
            // Set General Manager as manager for other employees
            if (count($employees) > 5) {
                $employees[5]->update(['manager_id' => $employees[0]->id]); // Accountant
                $employees[6]->update(['manager_id' => $employees[0]->id]); // IT Specialist
            }
            
            if (count($employees) > 7) {
                $employees[7]->update(['manager_id' => $employees[3]->id]); // Customer Service Rep reports to Branch Manager
                $employees[8]->update(['manager_id' => $employees[1]->id]); // Marketing Coordinator reports to HR Manager
            }
            
            if (count($employees) > 9) {
                $employees[9]->update(['manager_id' => $employees[1]->id]); // Intern reports to HR Manager
            }
        }

        $this->command->info('Employee seeder completed successfully. Created ' . count($employees) . ' employees.');
    }
}
