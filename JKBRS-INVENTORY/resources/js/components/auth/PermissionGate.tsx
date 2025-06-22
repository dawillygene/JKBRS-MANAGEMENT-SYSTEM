import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGateProps {
    permission?: string;
    role?: string;
    office?: number;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export function PermissionGate({ 
    permission, 
    role, 
    office, 
    fallback = null, 
    children 
}: PermissionGateProps) {
    const { user, hasPermission, canManageOffice } = useAuth();

    // Check if user is authenticated
    if (!user) {
        return <>{fallback}</>;
    }

    // Check role-based access
    if (role && user.role?.name !== role) {
        return <>{fallback}</>;
    }

    // Check permission-based access
    if (permission && !hasPermission(permission)) {
        return <>{fallback}</>;
    }

    // Check office-based access
    if (office && !canManageOffice(office)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

// Specific permission gates for common use cases
export function AdminOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate role="admin" fallback={fallback}>
            {children}
        </PermissionGate>
    );
}

export function ManagerOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate 
            permission="manage_office_users" 
            fallback={fallback}
        >
            {children}
        </PermissionGate>
    );
}

export function InventoryAccess({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate 
            permission="manage_inventory" 
            fallback={fallback}
        >
            {children}
        </PermissionGate>
    );
}

export function SalesAccess({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate 
            permission="create_sales" 
            fallback={fallback}
        >
            {children}
        </PermissionGate>
    );
}

export function PayrollAccess({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate 
            permission="manage_payroll" 
            fallback={fallback}
        >
            {children}
        </PermissionGate>
    );
}

export function ReportsAccess({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    return (
        <PermissionGate 
            permission="view_reports" 
            fallback={fallback}
        >
            {children}
        </PermissionGate>
    );
}
