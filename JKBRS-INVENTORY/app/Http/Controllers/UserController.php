<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Office;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get accessible offices for filtering
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $query = User::with(['role', 'office'])
            ->whereIn('office_id', $officeIds);
        
        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('role_id')) {
            $query->where('role_id', $request->role_id);
        }
        
        if ($request->filled('office_id')) {
            $query->where('office_id', $request->office_id);
        }
        
        if ($request->filled('employment_status')) {
            $query->where('employment_status', $request->employment_status);
        }
        
        $users = $query->orderBy('name')
            ->paginate(15);
        
        // Get data for filters
        $roles = Role::all();
        $offices = Office::whereIn('id', $officeIds)->get();
        
        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'offices' => $offices,
            'filters' => $request->only(['search', 'role_id', 'office_id', 'employment_status'])
        ]);
    }
    
    /**
     * Show the form for creating a new user
     */
    public function create()
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $roles = Role::all();
        $offices = Office::whereIn('id', $officeIds)->get();
        
        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'offices' => $offices
        ]);
    }
    
    /**
     * Store a newly created user in storage
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $officeIds = Office::getAllOfficeIds($user->office_id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', Password::defaults()],
            'role_id' => ['required', 'exists:roles,id'],
            'office_id' => ['required', Rule::in($officeIds)],
            'employee_id' => ['nullable', 'string', 'max:255', 'unique:users'],
            'phone' => ['nullable', 'string', 'max:20'],
            'hire_date' => ['nullable', 'date'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_status' => ['required', 'in:active,inactive,terminated,resigned'],
            'permissions' => ['nullable', 'array'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $newUser = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id' => $validated['role_id'],
                'office_id' => $validated['office_id'],
                'employee_id' => $validated['employee_id'],
                'phone' => $validated['phone'],
                'hire_date' => $validated['hire_date'],
                'salary' => $validated['salary'],
                'employment_status' => $validated['employment_status'],
                'permissions' => $validated['permissions'] ?? [],
            ]);
            
            // Log user creation
            $this->logUserAction('created', $newUser, $user);
            
            DB::commit();
            
            return redirect()->route('users.index')
                ->with('success', 'User created successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('User creation failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create user. Please try again.']);
        }
    }
    
    /**
     * Display the specified user
     */
    public function show(User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can view this user
        if (!$this->canManageUser($currentUser, $user)) {
            abort(403, 'Unauthorized access to user profile.');
        }
        
        $user->load(['role', 'office', 'salesTransactions', 'payrollRecords']);
        
        // Get recent activity
        $recentActivity = $this->getUserActivity($user->id);
        
        return Inertia::render('Users/Show', [
            'user' => $user,
            'recentActivity' => $recentActivity,
        ]);
    }
    
    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can edit this user
        if (!$this->canManageUser($currentUser, $user)) {
            abort(403, 'Unauthorized access to edit user.');
        }
        
        $officeIds = Office::getAllOfficeIds($currentUser->office_id);
        
        $roles = Role::all();
        $offices = Office::whereIn('id', $officeIds)->get();
        
        return Inertia::render('Users/Edit', [
            'user' => $user->load(['role', 'office']),
            'roles' => $roles,
            'offices' => $offices
        ]);
    }
    
    /**
     * Update the specified user in storage
     */
    public function update(Request $request, User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can edit this user
        if (!$this->canManageUser($currentUser, $user)) {
            abort(403, 'Unauthorized access to edit user.');
        }
        
        $officeIds = Office::getAllOfficeIds($currentUser->office_id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role_id' => ['required', 'exists:roles,id'],
            'office_id' => ['required', Rule::in($officeIds)],
            'employee_id' => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'hire_date' => ['nullable', 'date'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_status' => ['required', 'in:active,inactive,terminated,resigned'],
            'permissions' => ['nullable', 'array'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $originalData = $user->toArray();
            
            $user->update($validated);
            
            // Log user update
            $this->logUserAction('updated', $user, $currentUser, $originalData);
            
            DB::commit();
            
            return redirect()->route('users.index')
                ->with('success', 'User updated successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('User update failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update user. Please try again.']);
        }
    }
    
    /**
     * Remove the specified user from storage
     */
    public function destroy(User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can delete this user
        if (!$this->canManageUser($currentUser, $user)) {
            abort(403, 'Unauthorized access to delete user.');
        }
        
        // Prevent self-deletion
        if ($currentUser->id === $user->id) {
            return redirect()->back()
                ->withErrors(['error' => 'You cannot delete your own account.']);
        }
        
        try {
            DB::beginTransaction();
            
            // Log user deletion before deleting
            $this->logUserAction('deleted', $user, $currentUser);
            
            $user->delete();
            
            DB::commit();
            
            return redirect()->route('users.index')
                ->with('success', 'User deleted successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('User deletion failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete user. Please try again.']);
        }
    }
    
    /**
     * Transfer user to different office
     */
    public function transfer(Request $request, User $user)
    {
        $currentUser = Auth::user();
        
        // Check permissions
        if (!$this->hasPermission($currentUser, 'transfer_users')) {
            abort(403, 'Unauthorized to transfer users.');
        }
        
        $officeIds = Office::getAllOfficeIds($currentUser->office_id);
        
        $validated = $request->validate([
            'new_office_id' => ['required', Rule::in($officeIds)],
            'transfer_date' => ['required', 'date'],
            'reason' => ['required', 'string', 'max:500'],
        ]);
        
        try {
            DB::beginTransaction();
            
            $oldOffice = $user->office;
            
            $user->update([
                'office_id' => $validated['new_office_id']
            ]);
            
            // Log office transfer
            $this->logUserAction('transferred', $user, $currentUser, [
                'from_office' => $oldOffice->name,
                'to_office' => $user->fresh()->office->name,
                'transfer_date' => $validated['transfer_date'],
                'reason' => $validated['reason'],
            ]);
            
            DB::commit();
            
            return redirect()->route('users.show', $user)
                ->with('success', 'User transferred successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('User transfer failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to transfer user. Please try again.']);
        }
    }
    
    /**
     * Bulk operations on users
     */
    public function bulkAction(Request $request)
    {
        $currentUser = Auth::user();
        
        $validated = $request->validate([
            'action' => ['required', 'in:activate,deactivate,delete,transfer'],
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['exists:users,id'],
            'office_id' => ['required_if:action,transfer', 'exists:offices,id'],
        ]);
        
        $officeIds = Office::getAllOfficeIds($currentUser->office_id);
        $users = User::whereIn('id', $validated['user_ids'])
                    ->whereIn('office_id', $officeIds)
                    ->get();
        
        if ($users->count() !== count($validated['user_ids'])) {
            return redirect()->back()
                ->withErrors(['error' => 'Some users could not be found or you do not have permission to modify them.']);
        }
        
        try {
            DB::beginTransaction();
            
            foreach ($users as $user) {
                // Prevent operating on own account
                if ($user->id === $currentUser->id && in_array($validated['action'], ['deactivate', 'delete'])) {
                    continue;
                }
                
                switch ($validated['action']) {
                    case 'activate':
                        $user->update(['employment_status' => 'active']);
                        $this->logUserAction('activated', $user, $currentUser);
                        break;
                        
                    case 'deactivate':
                        $user->update(['employment_status' => 'inactive']);
                        $this->logUserAction('deactivated', $user, $currentUser);
                        break;
                        
                    case 'delete':
                        $this->logUserAction('deleted', $user, $currentUser);
                        $user->delete();
                        break;
                        
                    case 'transfer':
                        $oldOffice = $user->office;
                        $user->update(['office_id' => $validated['office_id']]);
                        $this->logUserAction('transferred', $user, $currentUser, [
                            'from_office' => $oldOffice->name,
                            'to_office' => $user->fresh()->office->name,
                            'bulk_action' => true,
                        ]);
                        break;
                }
            }
            
            DB::commit();
            
            return redirect()->route('users.index')
                ->with('success', 'Bulk action completed successfully.');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Bulk user action failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to complete bulk action. Please try again.']);
        }
    }
    
    /**
     * Update user password
     */
    public function updatePassword(Request $request, User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can update this user's password
        if (!$this->canManageUser($currentUser, $user) && $currentUser->id !== $user->id) {
            abort(403, 'Unauthorized to update password.');
        }
        
        $validated = $request->validate([
            'current_password' => ['required_if:self_update,true'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'self_update' => ['boolean'],
        ]);
        
        // If user is updating their own password, verify current password
        if ($validated['self_update'] && $currentUser->id === $user->id) {
            if (!Hash::check($validated['current_password'], $currentUser->password)) {
                return redirect()->back()
                    ->withErrors(['current_password' => 'Current password is incorrect.']);
            }
        }
        
        try {
            $user->update([
                'password' => Hash::make($validated['password'])
            ]);
            
            $this->logUserAction('password_changed', $user, $currentUser);
            
            return redirect()->back()
                ->with('success', 'Password updated successfully.');
                
        } catch (\Exception $e) {
            Log::error('Password update failed: ' . $e->getMessage());
            
            return redirect()->back()
                ->withErrors(['error' => 'Failed to update password. Please try again.']);
        }
    }
    
    /**
     * Get user activity logs
     */
    public function activityLogs(User $user)
    {
        $currentUser = Auth::user();
        
        // Check if current user can view this user's activity
        if (!$this->canManageUser($currentUser, $user)) {
            abort(403, 'Unauthorized to view user activity.');
        }
        
        $activity = $this->getUserActivity($user->id, 50);
        
        return response()->json($activity);
    }
    
    /**
     * Check if current user can manage target user
     */
    private function canManageUser(User $currentUser, User $targetUser): bool
    {
        // Admin can manage all users
        if ($currentUser->isAdmin()) {
            return true;
        }
        
        // Users can manage themselves for basic operations
        if ($currentUser->id === $targetUser->id) {
            return true;
        }
        
        // Office managers can manage users in their office hierarchy
        $officeIds = Office::getAllOfficeIds($currentUser->office_id);
        return in_array($targetUser->office_id, $officeIds);
    }
    
    /**
     * Check if user has specific permission
     */
    private function hasPermission(User $user, string $permission): bool
    {
        // Check role permissions first
        if ($user->role && $user->role->hasPermission($permission)) {
            return true;
        }
        
        // Check user-specific permissions
        return in_array($permission, $user->permissions ?? []);
    }
    
    /**
     * Log user action
     */
    private function logUserAction(string $action, User $targetUser, User $performedBy, array $metadata = [])
    {
        Log::info('User Action', [
            'action' => $action,
            'target_user_id' => $targetUser->id,
            'target_user_name' => $targetUser->name,
            'target_user_email' => $targetUser->email,
            'performed_by_id' => $performedBy->id,
            'performed_by_name' => $performedBy->name,
            'performed_by_email' => $performedBy->email,
            'timestamp' => Carbon::now(),
            'metadata' => $metadata,
        ]);
    }
    
    /**
     * Get user activity from logs
     */
    private function getUserActivity(int $userId, int $limit = 20): array
    {
        // This is a simplified version. In production, you might want to use
        // a dedicated activity log package like spatie/laravel-activitylog
        
        $logFile = storage_path('logs/laravel.log');
        $activities = [];
        
        if (file_exists($logFile)) {
            $lines = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $lines = array_reverse($lines);
            
            foreach ($lines as $line) {
                if (strpos($line, "User Action") !== false && strpos($line, "target_user_id\":$userId") !== false) {
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
}
