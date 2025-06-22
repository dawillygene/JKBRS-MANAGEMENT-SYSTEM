<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeePerformance;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeePerformanceController extends Controller
{
    public function index(Employee $employee)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $performanceReviews = $employee->performanceReviews()
            ->with('reviewer')
            ->orderBy('review_date', 'desc')
            ->paginate(10);
        
        return Inertia::render('Employees/Performance/Index', [
            'employee' => $employee,
            'performanceReviews' => $performanceReviews
        ]);
    }
    
    public function create(Employee $employee)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        return Inertia::render('Employees/Performance/Create', [
            'employee' => $employee
        ]);
    }
    
    public function store(Request $request, Employee $employee)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $validated = $request->validate([
            'review_date' => 'required|date',
            'review_period_start' => 'required|date',
            'review_period_end' => 'required|date|after:review_period_start',
            'type' => 'required|in:quarterly,annual,probation,disciplinary,promotion',
            'overall_rating' => 'required|numeric|min:1|max:5',
            'goals_rating' => 'required|numeric|min:1|max:5',
            'competencies_rating' => 'required|numeric|min:1|max:5',
            'areas_of_strength' => 'nullable|string',
            'areas_for_improvement' => 'nullable|string',
            'goals_achieved' => 'nullable|string',
            'goals_for_next_period' => 'nullable|string',
            'notes' => 'nullable|string',
            'action_plan' => 'nullable|string'
        ]);
        
        $validated['reviewer_id'] = $user->id;
        
        $performance = $employee->performanceReviews()->create($validated);
        
        return redirect()->route('employees.performance.show', [$employee, $performance])
            ->with('success', 'Performance review created successfully');
    }
    
    public function show(Employee $employee, EmployeePerformance $performance)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if performance belongs to employee
        if ($performance->employee_id !== $employee->id) {
            abort(404);
        }
        
        $performance->load('reviewer');
        
        return Inertia::render('Employees/Performance/Show', [
            'employee' => $employee,
            'performance' => $performance
        ]);
    }
    
    public function edit(Employee $employee, EmployeePerformance $performance)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if performance belongs to employee
        if ($performance->employee_id !== $employee->id) {
            abort(404);
        }
        
        return Inertia::render('Employees/Performance/Edit', [
            'employee' => $employee,
            'performance' => $performance
        ]);
    }
    
    public function update(Request $request, Employee $employee, EmployeePerformance $performance)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if performance belongs to employee
        if ($performance->employee_id !== $employee->id) {
            abort(404);
        }
        
        $validated = $request->validate([
            'review_date' => 'required|date',
            'review_period_start' => 'required|date',
            'review_period_end' => 'required|date|after:review_period_start',
            'type' => 'required|in:quarterly,annual,probation,disciplinary,promotion',
            'overall_rating' => 'required|numeric|min:1|max:5',
            'goals_rating' => 'required|numeric|min:1|max:5',
            'competencies_rating' => 'required|numeric|min:1|max:5',
            'areas_of_strength' => 'nullable|string',
            'areas_for_improvement' => 'nullable|string',
            'goals_achieved' => 'nullable|string',
            'goals_for_next_period' => 'nullable|string',
            'notes' => 'nullable|string',
            'action_plan' => 'nullable|string'
        ]);
        
        $performance->update($validated);
        
        return redirect()->route('employees.performance.show', [$employee, $performance])
            ->with('success', 'Performance review updated successfully');
    }
    
    public function destroy(Employee $employee, EmployeePerformance $performance)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if performance belongs to employee
        if ($performance->employee_id !== $employee->id) {
            abort(404);
        }
        
        $performance->delete();
        
        return redirect()->route('employees.performance.index', $employee)
            ->with('success', 'Performance review deleted successfully');
    }
}
