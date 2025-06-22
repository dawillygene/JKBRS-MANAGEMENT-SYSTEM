<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeDocument;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeDocumentController extends Controller
{
    public function index(Employee $employee)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        $documents = $employee->documents()
            ->orderBy('document_type')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Employees/Documents/Index', [
            'employee' => $employee,
            'documents' => $documents
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
            'document_type' => 'required|in:contract,certificate,id_copy,cv,other',
            'document_name' => 'required|string|max:255',
            'file_path' => 'required|file|max:10240', // 10MB max
            'description' => 'nullable|string',
            'expiry_date' => 'nullable|date|after:today'
        ]);
        
        // Store file
        $file = $request->file('file_path');
        $filename = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('employee-documents', $filename, 'private');
        
        $document = $employee->documents()->create([
            'document_type' => $validated['document_type'],
            'document_name' => $validated['document_name'],
            'file_path' => $filePath,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'description' => $validated['description'] ?? null,
            'expiry_date' => $validated['expiry_date'] ?? null,
            'uploaded_by' => $user->id
        ]);
        
        return back()->with('success', 'Document uploaded successfully');
    }
    
    public function download(Employee $employee, EmployeeDocument $document)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if document belongs to employee
        if ($document->employee_id !== $employee->id) {
            abort(404);
        }
        
        if (!Storage::disk('private')->exists($document->file_path)) {
            abort(404, 'File not found');
        }
        
        return Storage::disk('private')->download($document->file_path, $document->file_name);
    }
    
    public function destroy(Employee $employee, EmployeeDocument $document)
    {
        // Check access to employee
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($employee->office_id, $officeIds)) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if document belongs to employee
        if ($document->employee_id !== $employee->id) {
            abort(404);
        }
        
        // Delete file from storage
        if (Storage::disk('private')->exists($document->file_path)) {
            Storage::disk('private')->delete($document->file_path);
        }
        
        $document->delete();
        
        return back()->with('success', 'Document deleted successfully');
    }
}
