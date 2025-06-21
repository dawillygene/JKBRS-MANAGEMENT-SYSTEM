import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { DataTable } from '@/components/ui/DataTable';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management',
    }
];

export default function UserManagement() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        role: '',
        password: ''
    });

    const administrators = [
        ['John Doe', 'john@example.com', 'Super Admin', 'Active'],
        ['Admin User', 'admin@example.com', 'Admin', 'Active'],
    ];

    const managers = [
        ['Jane Smith', 'jane@example.com', 'Office Manager', 'Active'],
        ['Mike Johnson', 'mike@example.com', 'Factory Manager', 'Active'],
    ];

    const staffMembers = [
        ['Sarah Wilson', 'sarah@example.com', 'Sales Staff', 'Active'],
        ['Tom Brown', 'tom@example.com', 'Office Staff', 'On Leave'],
        ['Lisa Davis', 'lisa@example.com', 'Quality Controller', 'Active'],
        ['David Miller', 'david@example.com', 'Machine Operator', 'Active'],
    ];

    const rolePermissions = [
        ['Super Admin', <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>],
        ['Admin', <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-times text-red-600"></i>],
        ['Office Manager', <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-times text-red-600"></i>, <i className="fas fa-times text-red-600"></i>],
        ['Factory Manager', <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-times text-red-600"></i>, <i className="fas fa-check text-emerald-600"></i>, <i className="fas fa-times text-red-600"></i>],
        ['Staff', <i className="fas fa-times text-red-600"></i>, <i className="fas fa-times text-red-600"></i>, <i className="fas fa-times text-red-600"></i>, <i className="fas fa-times text-red-600"></i>],
    ];

    const handleUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User data submitted:', userData);
        // Reset form
        setUserData({
            fullName: '',
            email: '',
            role: '',
            password: ''
        });
    };

    const UserCard = ({ title, users, bgColor, badgeColor }: { 
        title: string; 
        users: string[][]; 
        bgColor: string; 
        badgeColor: string; 
    }) => (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h4>
            <div className="space-y-3">
                {users.map((user, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 ${bgColor} dark:bg-opacity-20 rounded`}>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{user[0]}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user[1]}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}>
                            {user[2]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    {/* Add New User Form */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Add New User</h3>
                        <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormField
                                label="Full Name"
                                type="text"
                                placeholder="Enter full name"
                                value={userData.fullName}
                                onChange={(value) => setUserData(prev => ({ ...prev, fullName: value }))}
                                required
                            />
                            <FormField
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                                value={userData.email}
                                onChange={(value) => setUserData(prev => ({ ...prev, email: value }))}
                                required
                            />
                            <FormField
                                label="Role"
                                type="select"
                                options={[
                                    { value: 'super-admin', label: 'Super Administrator' },
                                    { value: 'admin', label: 'Administrator' },
                                    { value: 'office-manager', label: 'Office Manager' },
                                    { value: 'factory-manager', label: 'Factory Manager' },
                                    { value: 'office-staff', label: 'Office Staff' },
                                    { value: 'sales-staff', label: 'Sales Staff' },
                                    { value: 'production-staff', label: 'Production Staff' },
                                ]}
                                value={userData.role}
                                onChange={(value) => setUserData(prev => ({ ...prev, role: value }))}
                                required
                            />
                            <div className="flex items-end">
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white"
                                >
                                    Add User
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* User Categories */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <UserCard
                            title="Administrators"
                            users={administrators}
                            bgColor="bg-blue-50"
                            badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        />
                        <UserCard
                            title="Managers"
                            users={managers}
                            bgColor="bg-emerald-50"
                            badgeColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        />
                        <UserCard
                            title="Staff Members"
                            users={staffMembers}
                            bgColor="bg-gray-50"
                            badgeColor="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>

                    {/* User Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-users text-blue-800 dark:text-blue-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">12</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-check text-emerald-600 dark:text-emerald-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">10</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-clock text-orange-600 dark:text-orange-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">2</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">On Leave</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-plus text-purple-600 dark:text-purple-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">3</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">New This Month</p>
                        </div>
                    </div>

                    {/* Role Permissions Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Role Permissions</h3>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <i className="fas fa-edit mr-2"></i>
                                Edit Permissions
                            </Button>
                        </div>
                        <DataTable
                            headers={['Role', 'Dashboard Access', 'Sales Management', 'Factory Management', 'User Management']}
                            rows={rolePermissions}
                        />
                    </div>

                    {/* User Activity Log */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent User Activity</h3>
                        <DataTable
                            headers={['User', 'Action', 'Module', 'Date & Time', 'IP Address']}
                            rows={[
                                ['John Doe', 'Login', 'Dashboard', '2025-06-22 14:30', '192.168.1.100'],
                                ['Jane Smith', 'Updated Sale', 'Sales', '2025-06-22 14:15', '192.168.1.101'],
                                ['Mike Johnson', 'Added Stock', 'Factory', '2025-06-22 13:45', '192.168.1.102'],
                                ['Sarah Wilson', 'Generated Report', 'Reports', '2025-06-22 13:30', '192.168.1.103'],
                            ]}
                        />
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
