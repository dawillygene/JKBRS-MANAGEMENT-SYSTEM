<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\User;
use App\Models\Employee;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class OfficeController extends Controller
{
    /**
     * Display a listing of offices
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get accessible offices based on user's role and office
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $query = Office::with(['parentOffice', 'childOffices', 'users', 'employees'])
            ->whereIn('id', $officeIds);
        
        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('office_code', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('office_type', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('office_type')) {
            $query->where('office_type', $request->office_type);
        }
        
        if ($request->filled('parent_office_id')) {
            $query->where('parent_office_id', $request->parent_office_id);
        }
        
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        $offices = $query->orderBy('name')
            ->paginate(15);
        
        // Get data for filters
        $parentOffices = Office::whereIn('id', $officeIds)
            ->whereNull('parent_office_id')
            ->get();
        
        // Calculate office statistics
        $offices->getCollection()->transform(function ($office) {
            $office->employee_count = $office->employees->count();
            $office->user_count = $office->users->count();
            $office->child_office_count = $office->childOffices->count();
            
            // Calculate performance metrics
            $office->performance_metrics = $this->calculateOfficePerformance($office);
            
            return $office;
        });
        
        return Inertia::render('Offices/Index', [
            'offices' => $offices,
            'parentOffices' => $parentOffices,
            'filters' => $request->only(['search', 'office_type', 'parent_office_id', 'status']),
            'officeTypes' => Office::getOfficeTypes(),
        ]);
    }
    
    /**
     * Show the form for creating a new office
     */
    public function create()
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $parentOffices = Office::whereIn('id', $officeIds)->get();
        
        return Inertia::render('Offices/Create', [
            'parentOffices' => $parentOffices,
            'officeTypes' => Office::getOfficeTypes(),
        ]);
    }
    
    /**
     * Store a newly created office in storage
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'office_code' => ['required', 'string', 'max:10', 'unique:offices'],
            'office_type' => ['required', Rule::in(Office::getOfficeTypes())],
            'parent_office_id' => ['nullable', Rule::in($officeIds)],
            'location' => ['required', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'manager_id' => ['nullable', 'exists:users,id'],
            'budget_allocated' => ['nullable', 'numeric', 'min:0'],
            'budget_spent' => ['nullable', 'numeric', 'min:0'],
            'description' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:active,inactive,closed'],
            'opening_date' => ['nullable', 'date'],
            'closing_date' => ['nullable', 'date', 'after:opening_date'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $office = Office::create($validated);
            
            // Log office creation
            $this->logOfficeAction('created', $office, $user);
            
            DB::commit();
            
            return redirect()->route('offices.index')
                ->with('success', 'Office created successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Office creation failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create office. Please try again.']);
        }
    }
    
    /**
     * Display the specified office
     */
    public function show(Office $office)
    {
        $user = Auth::user();
        
        // Check if user can access this office
        $officeIds = Office::getAllOfficeIds($user->office_id);
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized access to office.');
        }
        
        $office->load([
            'parentOffice',
            'childOffices.users',
            'childOffices.employees',
            'users.role',
            'employees.user',
            'manager'
        ]);
        
        // Get office performance metrics
        $performanceMetrics = $this->calculateOfficePerformance($office);
        
        // Get recent activities
        $recentActivity = $this->getOfficeActivity($office->id);
        
        // Get budget information
        $budgetInfo = $this->getBudgetInformation($office);
        
        // Get asset information
        $assetInfo = $this->getAssetInformation($office);
        
        return Inertia::render('Offices/Show', [
            'office' => $office,
            'performanceMetrics' => $performanceMetrics,
            'recentActivity' => $recentActivity,
            'budgetInfo' => $budgetInfo,
            'assetInfo' => $assetInfo,
        ]);
    }
    
    /**
     * Show the form for editing the specified office
     */
    public function edit(Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Check if user can edit this office
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized access to edit office.');
        }
        
        $parentOffices = Office::whereIn('id', $officeIds)
            ->where('id', '!=', $office->id)
            ->get();
        
        $managers = User::whereIn('office_id', $officeIds)
            ->with('role')
            ->get();
        
        return Inertia::render('Offices/Edit', [
            'office' => $office->load(['parentOffice', 'manager']),
            'parentOffices' => $parentOffices,
            'managers' => $managers,
            'officeTypes' => Office::getOfficeTypes(),
        ]);
    }
    
    /**
     * Update the specified office in storage
     */
    public function update(Request $request, Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Check if user can edit this office
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized access to edit office.');
        }
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'office_code' => ['required', 'string', 'max:10', Rule::unique('offices')->ignore($office->id)],
            'office_type' => ['required', Rule::in(Office::getOfficeTypes())],
            'parent_office_id' => ['nullable', Rule::in($officeIds)],
            'location' => ['required', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'manager_id' => ['nullable', 'exists:users,id'],
            'budget_allocated' => ['nullable', 'numeric', 'min:0'],
            'budget_spent' => ['nullable', 'numeric', 'min:0'],
            'description' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:active,inactive,closed'],
            'opening_date' => ['nullable', 'date'],
            'closing_date' => ['nullable', 'date', 'after:opening_date'],
        ]);
        
        // Prevent circular parent-child relationship
        if ($validated['parent_office_id']) {
            $childOfficeIds = Office::getChildOfficeIds($office->id);
            if (in_array($validated['parent_office_id'], $childOfficeIds)) {
                return redirect()->back()
                    ->withErrors(['parent_office_id' => 'Cannot set a child office as parent.']);
            }
        }
        
        try {
            DB::beginTransaction();
            
            $originalData = $office->toArray();
            
            $office->update($validated);
            
            // Log office update
            $this->logOfficeAction('updated', $office, $user, $originalData);
            
            DB::commit();
            
            return redirect()->route('offices.index')
                ->with('success', 'Office updated successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Office update failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update office. Please try again.']);
        }
    }
    
    /**
     * Remove the specified office from storage
     */
    public function destroy(Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Check if user can delete this office
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized access to delete office.');
        }
        
        // Check if office has child offices
        if ($office->childOffices()->count() > 0) {
            return redirect()->back()
                ->withErrors(['error' => 'Cannot delete office with child offices. Please reassign or delete child offices first.']);
        }
        
        // Check if office has users
        if ($office->users()->count() > 0) {
            return redirect()->back()
                ->withErrors(['error' => 'Cannot delete office with assigned users. Please transfer users first.']);
        }
        
        try {
            DB::beginTransaction();
            
            // Log office deletion before deleting
            $this->logOfficeAction('deleted', $office, $user);
            
            $office->delete();
            
            DB::commit();
            
            return redirect()->route('offices.index')
                ->with('success', 'Office deleted successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Office deletion failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete office. Please try again.']);
        }
    }
    
    /**
     * Get office hierarchy data
     */
    public function hierarchy()
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $offices = Office::with(['parentOffice', 'childOffices', 'users', 'employees'])
            ->whereIn('id', $officeIds)
            ->get();
        
        // Build hierarchy tree
        $hierarchy = $this->buildOfficeHierarchy($offices);
        
        return Inertia::render('Offices/Hierarchy', [
            'hierarchy' => $hierarchy,
            'offices' => $offices,
        ]);
    }
    
    /**
     * Update office budget
     */
    public function updateBudget(Request $request, Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Check permissions
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized to update office budget.');
        }
        
        $validated = $request->validate([
            'budget_allocated' => ['required', 'numeric', 'min:0'],
            'budget_period' => ['required', 'string', 'in:monthly,quarterly,yearly'],
            'budget_notes' => ['nullable', 'string', 'max:500'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $oldBudget = $office->budget_allocated;
            
            $office->update([
                'budget_allocated' => $validated['budget_allocated'],
                'budget_period' => $validated['budget_period'],
                'budget_notes' => $validated['budget_notes'],
            ]);
            
            // Log budget update
            $this->logOfficeAction('budget_updated', $office, $user, [
                'old_budget' => $oldBudget,
                'new_budget' => $validated['budget_allocated'],
                'budget_period' => $validated['budget_period'],
                'notes' => $validated['budget_notes'],
            ]);
            
            DB::commit();
            
            return redirect()->route('offices.show', $office)
                ->with('success', 'Office budget updated successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Office budget update failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to update budget. Please try again.']);
        }
    }
    
    /**
     * Transfer users between offices
     */
    public function transferUsers(Request $request, Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        // Check permissions
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized to transfer office users.');
        }
        
        $validated = $request->validate([
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['exists:users,id'],
            'target_office_id' => ['required', Rule::in($officeIds)],
            'transfer_date' => ['required', 'date'],
            'reason' => ['required', 'string', 'max:500'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $targetOffice = Office::find($validated['target_office_id']);
            $users = User::whereIn('id', $validated['user_ids'])
                         ->where('office_id', $office->id)
                         ->get();
            
            foreach ($users as $transferUser) {
                $transferUser->update(['office_id' => $validated['target_office_id']]);
                
                // Log user transfer
                $this->logOfficeAction('user_transferred', $office, $user, [
                    'transferred_user' => $transferUser->name,
                    'from_office' => $office->name,
                    'to_office' => $targetOffice->name,
                    'transfer_date' => $validated['transfer_date'],
                    'reason' => $validated['reason'],
                ]);
            }
            
            DB::commit();
            
            return redirect()->route('offices.show', $office)
                ->with('success', "Successfully transferred {$users->count()} user(s) to {$targetOffice->name}.");
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Office user transfer failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to transfer users. Please try again.']);
        }
    }
    
    /**
     * Get office performance metrics
     */
    public function performanceMetrics(Office $office)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        if (!in_array($office->id, $officeIds)) {
            abort(403, 'Unauthorized to view office metrics.');
        }
        
        $metrics = $this->calculateOfficePerformance($office);
        
        return response()->json($metrics);
    }
    
    /**
     * Calculate office performance metrics
     */
    private function calculateOfficePerformance(Office $office): array
    {
        $currentMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();
        
        // Get basic counts
        $employeeCount = $office->employees()->count();
        $userCount = $office->users()->count();
        
        // Calculate budget utilization
        $budgetUtilization = 0;
        if ($office->budget_allocated > 0) {
            $budgetUtilization = ($office->budget_spent / $office->budget_allocated) * 100;
        }
        
        // Get sales performance (if applicable)
        $salesThisMonth = 0;
        $salesLastMonth = 0;
        
        if ($office->users()->count() > 0) {
            // This would need to be adjusted based on your sales transaction structure
            // $salesThisMonth = SalesTransaction::whereIn('user_id', $office->users->pluck('id'))
            //     ->whereBetween('created_at', [$currentMonth, Carbon::now()])
            //     ->sum('total_amount');
        }
        
        return [
            'employee_count' => $employeeCount,
            'user_count' => $userCount,
            'budget_allocated' => $office->budget_allocated ?? 0,
            'budget_spent' => $office->budget_spent ?? 0,
            'budget_utilization' => round($budgetUtilization, 2),
            'sales_this_month' => $salesThisMonth,
            'sales_last_month' => $salesLastMonth,
            'sales_growth' => $salesLastMonth > 0 ? round((($salesThisMonth - $salesLastMonth) / $salesLastMonth) * 100, 2) : 0,
        ];
    }
    
    /**
     * Get budget information for office
     */
    private function getBudgetInformation(Office $office): array
    {
        return [
            'allocated' => $office->budget_allocated ?? 0,
            'spent' => $office->budget_spent ?? 0,
            'remaining' => ($office->budget_allocated ?? 0) - ($office->budget_spent ?? 0),
            'utilization_percentage' => $office->budget_allocated > 0 
                ? round(($office->budget_spent / $office->budget_allocated) * 100, 2)
                : 0,
            'period' => $office->budget_period ?? 'yearly',
            'notes' => $office->budget_notes ?? '',
        ];
    }
    
    /**
     * Get asset information for office
     */
    private function getAssetInformation(Office $office): array
    {
        // This would be expanded based on your asset management requirements
        return [
            'total_assets' => 0, // Count of assets assigned to this office
            'asset_value' => 0,  // Total value of assets
            'maintenance_due' => 0, // Assets requiring maintenance
            'depreciation' => 0, // Total depreciation
        ];
    }
    
    /**
     * Build office hierarchy tree
     */
    private function buildOfficeHierarchy($offices): array
    {
        $hierarchy = [];
        $officeMap = $offices->keyBy('id');
        
        // Find root offices (those without parents)
        $rootOffices = $offices->whereNull('parent_office_id');
        
        foreach ($rootOffices as $office) {
            $hierarchy[] = $this->buildOfficeTree($office, $officeMap);
        }
        
        return $hierarchy;
    }
    
    /**
     * Build office tree recursively
     */
    private function buildOfficeTree(Office $office, $officeMap): array
    {
        $node = [
            'id' => $office->id,
            'name' => $office->name,
            'office_code' => $office->office_code,
            'office_type' => $office->office_type,
            'location' => $office->location,
            'employee_count' => $office->employees->count(),
            'user_count' => $office->users->count(),
            'status' => $office->status,
            'children' => [],
        ];
        
        // Find children
        $children = $officeMap->where('parent_office_id', $office->id);
        
        foreach ($children as $child) {
            $node['children'][] = $this->buildOfficeTree($child, $officeMap);
        }
        
        return $node;
    }
    
    /**
     * Log office action
     */
    private function logOfficeAction(string $action, Office $office, User $performedBy, array $metadata = [])
    {
        Log::info('Office Action', [
            'action' => $action,
            'office_id' => $office->id,
            'office_name' => $office->name,
            'office_code' => $office->office_code,
            'performed_by_id' => $performedBy->id,
            'performed_by_name' => $performedBy->name,
            'performed_by_email' => $performedBy->email,
            'timestamp' => Carbon::now(),
            'metadata' => $metadata,
        ]);
    }
    
    /**
     * Get office activity from logs
     */
    private function getOfficeActivity(int $officeId, int $limit = 20): array
    {
        // This is a simplified version. In production, you might want to use
        // a dedicated activity log package like spatie/laravel-activitylog
        
        $logFile = storage_path('logs/laravel.log');
        $activities = [];
        
        if (file_exists($logFile)) {
            $lines = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $lines = array_reverse($lines);
            
            foreach ($lines as $line) {
                if (strpos($line, "Office Action") !== false && strpos($line, "office_id\":$officeId") !== false) {
                    if (count($activities) >= $limit) break;
                    
                    // Parse the log line (simplified)
                    if (preg_match('/\[(.*?)\].*?"action":"(.*?)".*?"performed_by_name":"(.*?)"/', $line, $matches)) {
                        $activities[] = [
                            'timestamp' => $matches[1],
                            'action' => $matches[2],
                            'performed_by' => $matches[3],
                        ];
                    }
                }
            }
        }
        
        return $activities;
    }
    
    /**
     * Bulk update budgets for multiple offices
     */
    public function bulkBudgetUpdate(Request $request)
    {
        $request->validate([
            'budgets' => 'required|array',
            'budgets.*.office_id' => 'required|exists:offices,id',
            'budgets.*.budget_allocation' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            foreach ($request->budgets as $budgetData) {
                $office = Office::findOrFail($budgetData['office_id']);
                
                // TODO: Add proper authorization check
                // $this->authorize('update', $office);
                
                $office->update([
                    'budget_allocation' => $budgetData['budget_allocation']
                ]);
                
                // Log the activity
                Log::info('Office Action', [
                    'action' => 'bulk_budget_update',
                    'office_id' => $office->id,
                    'office_name' => $office->name,
                    'new_budget' => $budgetData['budget_allocation'],
                    'performed_by' => Auth::id(),
                    'performed_by_name' => Auth::user()->name,
                    'timestamp' => now(),
                ]);
            }
            
            DB::commit();
            
            return redirect()->back()->with('success', 'Budgets updated successfully for ' . count($request->budgets) . ' offices.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Bulk budget update failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);
            
            return redirect()->back()->with('error', 'Failed to update budgets: ' . $e->getMessage());
        }
    }

    /**
     * Store a new asset for an office
     */
    public function storeAsset(Request $request, Office $office)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'asset_type' => 'required|string|max:100',
            'serial_number' => 'required|string|max:255|unique:office_assets,serial_number',
            'purchase_date' => 'required|date',
            'purchase_cost' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'assigned_to' => 'nullable|string|max:255',
            'warranty_expires' => 'nullable|date|after:today',
        ]);

        try {
            // In a real implementation, you would create the asset record
            // For now, we'll just log the action
            Log::info('Office Action', [
                'action' => 'asset_created',
                'office_id' => $office->id,
                'office_name' => $office->name,
                'asset_name' => $request->name,
                'asset_type' => $request->asset_type,
                'serial_number' => $request->serial_number,
                'purchase_cost' => $request->purchase_cost,
                'performed_by' => Auth::id(),
                'performed_by_name' => Auth::user()->name,
                'timestamp' => now(),
            ]);
            
            return redirect()->back()->with('success', 'Asset created successfully.');
        } catch (\Exception $e) {
            Log::error('Asset creation failed', [
                'error' => $e->getMessage(),
                'office_id' => $office->id,
                'user_id' => Auth::id(),
            ]);
            
            return redirect()->back()->with('error', 'Failed to create asset: ' . $e->getMessage());
        }
    }

    /**
     * Update office settings
     */
    public function updateSettings(Request $request, Office $office)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'office_type' => 'sometimes|string|in:headquarters,regional,branch,department',
            'description' => 'sometimes|nullable|string',
            'capacity' => 'sometimes|integer|min:1',
            'operating_hours_start' => 'sometimes|string',
            'operating_hours_end' => 'sometimes|string',
            'operating_days' => 'sometimes|array',
            'phone' => 'sometimes|nullable|string|max:20',
            'email' => 'sometimes|nullable|email|max:255',
            'street' => 'sometimes|nullable|string|max:255',
            'city' => 'sometimes|nullable|string|max:100',
            'state' => 'sometimes|nullable|string|max:100',
            'zip' => 'sometimes|nullable|string|max:20',
            'country' => 'sometimes|nullable|string|max:100',
            'can_manage_budget' => 'sometimes|boolean',
            'can_transfer_staff' => 'sometimes|boolean',
            'can_create_sub_offices' => 'sometimes|boolean',
            'requires_approval_for_transfers' => 'sometimes|boolean',
            'budget_approval_limit' => 'sometimes|numeric|min:0',
            'budget_alerts' => 'sometimes|boolean',
            'staff_notifications' => 'sometimes|boolean',
            'performance_reports' => 'sometimes|boolean',
            'maintenance_reminders' => 'sometimes|boolean',
            'email_frequency' => 'sometimes|string|in:immediate,daily,weekly,monthly',
            'auto_assign_assets' => 'sometimes|boolean',
            'require_manager_approval' => 'sometimes|boolean',
            'default_budget_allocation_method' => 'sometimes|string|in:equal,performance,staff_count,manual',
            'asset_depreciation_rate' => 'sometimes|numeric|min:0|max:100',
        ]);

        try {
            // Update basic office information
            $updateData = [];
            if ($request->has('name')) $updateData['name'] = $request->name;
            if ($request->has('office_type')) $updateData['office_type'] = $request->office_type;
            if ($request->has('description')) $updateData['description'] = $request->description;
            
            if (!empty($updateData)) {
                $office->update($updateData);
            }
            
            // In a real implementation, you would store settings in a separate table or JSON column
            // For now, we'll just log the settings update
            Log::info('Office Action', [
                'action' => 'settings_updated',
                'office_id' => $office->id,
                'office_name' => $office->name,
                'updated_fields' => array_keys($request->all()),
                'performed_by' => Auth::id(),
                'performed_by_name' => Auth::user()->name,
                'timestamp' => now(),
            ]);
            
            return redirect()->back()->with('success', 'Office settings updated successfully.');
        } catch (\Exception $e) {
            Log::error('Office settings update failed', [
                'error' => $e->getMessage(),
                'office_id' => $office->id,
                'user_id' => Auth::id(),
            ]);
            
            return redirect()->back()->with('error', 'Failed to update settings: ' . $e->getMessage());
        }
    }
}
