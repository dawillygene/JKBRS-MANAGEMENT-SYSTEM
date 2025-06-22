<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeTraining;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeTrainingController extends Controller
{
    public function index(Employee $employee)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $trainings = $employee->trainings()
            ->orderBy('start_date', 'desc')
            ->paginate(10);
        
        return Inertia::render('Employees/Training/Index', [
            'employee' => $employee,
            'trainings' => $trainings
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
        
        return Inertia::render('Employees/Training/Create', [
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
            'training_name' => 'required|string|max:255',
            'training_type' => 'required|in:internal,external,online,certification',
            'provider' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:planned,in_progress,completed,cancelled',
            'cost' => 'nullable|numeric|min:0',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'objectives' => 'nullable|string',
            'feedback' => 'nullable|string',
            'certificate_issued' => 'nullable|boolean',
            'certificate_number' => 'nullable|string|max:255',
            'certificate_expiry' => 'nullable|date'
        ]);
        
        $training = $employee->trainings()->create($validated);
        
        return redirect()->route('employees.training.show', [$employee, $training])
            ->with('success', 'Training record created successfully');
    }
    
    public function show(Employee $employee, EmployeeTraining $training)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if training belongs to employee
        if ($training->employee_id !== $employee->id) {
            abort(404);
        }
        
        return Inertia::render('Employees/Training/Show', [
            'employee' => $employee,
            'training' => $training
        ]);
    }
    
    public function edit(Employee $employee, EmployeeTraining $training)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if training belongs to employee
        if ($training->employee_id !== $employee->id) {
            abort(404);
        }
        
        return Inertia::render('Employees/Training/Edit', [
            'employee' => $employee,
            'training' => $training
        ]);
    }
    
    public function update(Request $request, Employee $employee, EmployeeTraining $training)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if training belongs to employee
        if ($training->employee_id !== $employee->id) {
            abort(404);
        }
        
        $validated = $request->validate([
            'training_name' => 'required|string|max:255',
            'training_type' => 'required|in:internal,external,online,certification',
            'provider' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:planned,in_progress,completed,cancelled',
            'cost' => 'nullable|numeric|min:0',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'objectives' => 'nullable|string',
            'feedback' => 'nullable|string',
            'certificate_issued' => 'nullable|boolean',
            'certificate_number' => 'nullable|string|max:255',
            'certificate_expiry' => 'nullable|date'
        ]);
        
        $training->update($validated);
        
        return redirect()->route('employees.training.show', [$employee, $training])
            ->with('success', 'Training record updated successfully');
    }
    
    public function destroy(Employee $employee, EmployeeTraining $training)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if training belongs to employee
        if ($training->employee_id !== $employee->id) {
            abort(404);
        }
        
        $training->delete();
        
        return redirect()->route('employees.training.index', $employee)
            ->with('success', 'Training record deleted successfully');
    }
}
