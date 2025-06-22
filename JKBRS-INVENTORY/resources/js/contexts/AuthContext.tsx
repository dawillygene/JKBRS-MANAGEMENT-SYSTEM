import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    employee_id: string;
    phone?: string;
    hire_date?: string;
    salary?: number;
    employment_status: 'active' | 'inactive' | 'terminated';
    formatted_salary?: string;
    role?: Role;
    office?: Office;
    permissions?: string[];
}

interface Role {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    permissions: string[];
}

interface Office {
    id: number;
    name: string;
    code: string;
    type: 'main' | 'regional' | 'branch';
    address: string;
    phone?: string;
    email?: string;
    manager_name?: string;
    budget_allocation: number;
    formatted_budget?: string;
    is_active: boolean;
    parent_office?: Office;
    child_offices?: Office[];
}

interface AuthContextType {
    user: User | null;
    hasPermission: (permission: string) => boolean;
    canManageOffice: (officeId: number) => boolean;
    isAdmin: () => boolean;
    isOfficeManager: () => boolean;
    isBranchManager: () => boolean;
    getUserOffices: () => Office[];
    formatCurrency: (amount: number) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const [user, setUser] = useState<User | null>(props.auth?.user || null);

    useEffect(() => {
        setUser(props.auth?.user || null);
    }, [props.auth?.user]);

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        
        // Check role permissions first
        if (user.role?.permissions?.includes(permission)) {
            return true;
        }
        
        // Check user-specific permissions
        return user.permissions?.includes(permission) || false;
    };

    const canManageOffice = (officeId: number): boolean => {
        if (!user) return false;
        
        // Admin can manage all offices
        if (hasPermission('view_all_offices')) {
            return true;
        }

        // Check if user's office matches or is parent of the target office
        return user.office?.id === officeId || 
               (user.office?.child_offices?.some(child => child.id === officeId)) || false;
    };

    const isAdmin = (): boolean => {
        return user?.role?.name === 'admin' || false;
    };

    const isOfficeManager = (): boolean => {
        return user?.role?.name === 'office_manager' || false;
    };

    const isBranchManager = (): boolean => {
        return user?.role?.name === 'branch_manager' || false;
    };

    const getUserOffices = (): Office[] => {
        if (!user || !user.office) return [];
        
        if (hasPermission('view_all_offices')) {
            // Admin can see all offices - this would be provided by backend
            return props.offices || [];
        }

        // Return user's office and any child offices they manage
        const offices = [user.office];
        if (user.office.child_offices) {
            offices.push(...user.office.child_offices);
        }
        return offices;
    };

    const formatCurrency = (amount: number): string => {
        return `Tsh ${amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        })}`;
    };

    const value: AuthContextType = {
        user,
        hasPermission,
        canManageOffice,
        isAdmin,
        isOfficeManager,
        isBranchManager,
        getUserOffices,
        formatCurrency,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export type { User, Role, Office, AuthContextType };
