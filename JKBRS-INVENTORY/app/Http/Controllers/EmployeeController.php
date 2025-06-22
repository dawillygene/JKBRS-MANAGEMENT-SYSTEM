<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Office;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $query = Employee::with(['user', 'office', 'manager'])
            ->whereIn('office_id', $officeIds);
        
        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('employee_number', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('office_id')) {
            $query->where('office_id', $request->office_id);
        }
        
        if ($request->filled('department')) {
            $query->where('department', $request->department);
        }
        
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        $employees = $query->orderBy('first_name')
            ->orderBy('last_name')
            ->paginate(15);

        // Ensure full_name accessor is included
        $employees->through(function ($employee) {
            $employee->append('full_name');
            return $employee;
        });
        
        // Get offices for filter dropdown
        $offices = Office::whereIn('id', $officeIds)->get();
        
        // Get departments for filter dropdown
        $departments = Employee::whereIn('office_id', $officeIds)
            ->distinct()
            ->pluck('department')
            ->filter()
            ->sort()
            ->values();
        
        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'offices' => $offices,
            'departments' => $departments,
            'filters' => $request->only(['search', 'office_id', 'department', 'status'])
        ]);
    }
    
    public function create()
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $offices = Office::whereIn('id', $officeIds)->get();
        $managers = Employee::with('user')
            ->whereIn('office_id', $officeIds)
            ->where('status', 'active')
            ->get();
        
        return Inertia::render('Employees/Create', [
            'offices' => $offices,
            'managers' => $managers
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'office_id' => 'required|exists:offices,id',
            'manager_id' => 'nullable|exists:employees,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'employment_type' => 'required|in:full_time,part_time,contract,intern',
            'hire_date' => 'required|date',
            'probation_end_date' => 'nullable|date|after:hire_date',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|array',
            'bank_name' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'nssf_number' => 'nullable|string|max:255',
            'tax_number' => 'nullable|string|max:255',
            'national_id' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'marital_status' => 'required|in:single,married,divorced,widowed',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:255',
            'emergency_contact_relationship' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|image|max:2048',
            'skills' => 'nullable|array',
            'qualifications' => 'nullable|array',
        ]);
        
        // Verify office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($validated['office_id'], $officeIds)) {
            abort(403, 'Unauthorized office access');
        }
        
        // Handle file upload
        if ($request->hasFile('profile_photo')) {
            $validated['profile_photo'] = $request->file('profile_photo')
                ->store('employee-photos', 'public');
        }
        
        // Convert arrays to JSON
        if (isset($validated['allowances'])) {
            $validated['allowances'] = json_encode($validated['allowances']);
        }
        if (isset($validated['skills'])) {
            $validated['skills'] = json_encode($validated['skills']);
        }
        if (isset($validated['qualifications'])) {
            $validated['qualifications'] = json_encode($validated['qualifications']);
        }
        
        DB::beginTransaction();
        try {
            // Generate employee number
            $validated['employee_number'] = Employee::generateEmployeeNumber($validated['office_id']);
            
            $employee = Employee::create($validated);
            
            DB::commit();
            
            return redirect()->route('employees.show', $employee)
                ->with('success', 'Employee created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            
            // Delete uploaded file if exists
            if (isset($validated['profile_photo'])) {
                Storage::disk('public')->delete($validated['profile_photo']);
            }
            
            throw $e;
        }
    }
    
    public function show(Employee $employee)
    {
        // Check office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $employee->load([
            'user',
            'office',
            'manager.user',
            'subordinates.user',
            'documents',
            'performanceReviews' => function ($query) {
                $query->orderBy('review_date', 'desc')->take(5);
            },
            'trainings' => function ($query) {
                $query->orderBy('start_date', 'desc')->take(5);
            }
        ]);
        
        return Inertia::render('Employees/Show', [
            'employee' => $employee
        ]);
    }
    
    public function edit(Employee $employee)
    {
        // Check office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $offices = Office::whereIn('id', $officeIds)->get();
        $managers = Employee::with('user')
            ->whereIn('office_id', $officeIds)
            ->where('status', 'active')
            ->where('id', '!=', $employee->id)
            ->get();
        
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'offices' => $offices,
            'managers' => $managers
        ]);
    }
    
    public function update(Request $request, Employee $employee)
    {
        // Check office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'office_id' => 'required|exists:offices,id',
            'manager_id' => 'nullable|exists:employees,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'employment_type' => 'required|in:full_time,part_time,contract,intern',
            'hire_date' => 'required|date',
            'probation_end_date' => 'nullable|date|after:hire_date',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|array',
            'bank_name' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'nssf_number' => 'nullable|string|max:255',
            'tax_number' => 'nullable|string|max:255',
            'national_id' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'marital_status' => 'required|in:single,married,divorced,widowed',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:255',
            'emergency_contact_relationship' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|image|max:2048',
            'status' => 'required|in:active,inactive,terminated,resigned',
            'termination_date' => 'nullable|date',
            'termination_reason' => 'nullable|string',
            'skills' => 'nullable|array',
            'qualifications' => 'nullable|array',
        ]);
        
        // Verify new office access if changed
        if (!in_array($validated['office_id'], $officeIds)) {
            abort(403, 'Unauthorized office access');
        }
        
        // Handle file upload
        if ($request->hasFile('profile_photo')) {
            // Delete old photo
            if ($employee->profile_photo) {
                Storage::disk('public')->delete($employee->profile_photo);
            }
            
            $validated['profile_photo'] = $request->file('profile_photo')
                ->store('employee-photos', 'public');
        }
        
        // Convert arrays to JSON
        if (isset($validated['allowances'])) {
            $validated['allowances'] = json_encode($validated['allowances']);
        }
        if (isset($validated['skills'])) {
            $validated['skills'] = json_encode($validated['skills']);
        }
        if (isset($validated['qualifications'])) {
            $validated['qualifications'] = json_encode($validated['qualifications']);
        }
        
        $employee->update($validated);
        
        return redirect()->route('employees.show', $employee)
            ->with('success', 'Employee updated successfully');
    }
    
    public function destroy(Employee $employee)
    {
        // Check office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if employee has subordinates
        if ($employee->subordinates()->count() > 0) {
            return back()->withErrors([
                'employee' => 'Cannot delete employee with subordinates. Please reassign them first.'
            ]);
        }
        
        // Delete profile photo
        if ($employee->profile_photo) {
            Storage::disk('public')->delete($employee->profile_photo);
        }
        
        $employee->delete();
        
        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully');
    }
    
    public function transfer(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'new_office_id' => 'required|exists:offices,id',
            'new_manager_id' => 'nullable|exists:employees,id',
            'transfer_date' => 'required|date',
            'reason' => 'required|string|max:255'
        ]);
        
        // Check current office access
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check new office access
        if (!in_array($validated['new_office_id'], $officeIds)) {
            abort(403, 'Unauthorized office access');
        }
        
        DB::beginTransaction();
        try {
            // Update employee office and manager
            $employee->update([
                'office_id' => $validated['new_office_id'],
                'manager_id' => $validated['new_manager_id']
            ]);
            
            // Log the transfer (you might want to create a transfers table)
            // For now, we'll add it as a performance note
            $employee->performanceReviews()->create([
                'review_date' => $validated['transfer_date'],
                'reviewer_id' => $user->id,
                'type' => 'transfer',
                'notes' => "Transferred from Office {$employee->office->name} to Office " . 
                          Office::find($validated['new_office_id'])->name . 
                          ". Reason: " . $validated['reason']
            ]);
            
            DB::commit();
            
            return back()->with('success', 'Employee transferred successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    public function hierarchy()
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Get employees with their relationships
        $employees = Employee::with(['user', 'office', 'manager', 'subordinates'])
            ->whereIn('office_id', $officeIds)
            ->where('status', 'active')
            ->get();
        
        // Build hierarchy tree
        $hierarchy = $this->buildHierarchyTree($employees);
        
        return Inertia::render('Employees/Hierarchy', [
            'hierarchy' => $hierarchy
        ]);
    }
    
    private function buildHierarchyTree($employees)
    {
        $tree = [];
        $employeeMap = $employees->keyBy('id');
        
        foreach ($employees as $employee) {
            if (!$employee->manager_id) {
                // Top level employee
                $tree[] = $this->buildEmployeeNode($employee, $employeeMap);
            }
        }
        
        return $tree;
    }
    
    private function buildEmployeeNode($employee, $employeeMap)
    {
        $node = [
            'id' => $employee->id,
            'name' => $employee->full_name,
            'position' => $employee->position,
            'department' => $employee->department,
            'office' => $employee->office->name,
            'children' => []
        ];
        
        foreach ($employee->subordinates as $subordinate) {
            if ($employeeMap->has($subordinate->id)) {
                $node['children'][] = $this->buildEmployeeNode($subordinate, $employeeMap);
            }
        }
        
        return $node;
    }
}
