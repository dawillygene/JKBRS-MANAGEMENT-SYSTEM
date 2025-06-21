import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'App Settings',
        href: '/app-settings',
    }
];

export default function AppSettings() {
    const [systemSettings, setSystemSettings] = useState({
        companyName: 'JKBRS Manufacturing',
        currency: 'INR',
        timeZone: 'Asia/Kolkata',
        emailNotifications: true,
        autoBackup: true
    });

    const [securitySettings, setSecuritySettings] = useState({
        sessionTimeout: '30',
        passwordPolicy: 'medium',
        twoFactorAuth: false,
        loginLogging: true
    });

    const handleSystemSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('System settings updated:', systemSettings);
    };

    const handleSecuritySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Security settings updated:', securitySettings);
    };

    const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
        <button 
            onClick={onChange}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                enabled ? 'bg-blue-800' : 'bg-gray-200 dark:bg-gray-600'
            }`}
        >
            <span 
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="App Settings" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* System Settings */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">System Settings</h3>
                            <form onSubmit={handleSystemSubmit} className="space-y-4">
                                <FormField
                                    label="Company Name"
                                    type="text"
                                    value={systemSettings.companyName}
                                    onChange={(value) => setSystemSettings(prev => ({ ...prev, companyName: value }))}
                                />
                                <FormField
                                    label="Currency"
                                    type="select"
                                    options={[
                                        { value: 'INR', label: 'Indian Rupee (₹)' },
                                        { value: 'USD', label: 'US Dollar ($)' },
                                        { value: 'EUR', label: 'Euro (€)' },
                                        { value: 'GBP', label: 'British Pound (£)' },
                                    ]}
                                    value={systemSettings.currency}
                                    onChange={(value) => setSystemSettings(prev => ({ ...prev, currency: value }))}
                                />
                                <FormField
                                    label="Time Zone"
                                    type="select"
                                    options={[
                                        { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
                                        { value: 'America/New_York', label: 'America/New_York (EST)' },
                                        { value: 'Europe/London', label: 'Europe/London (GMT)' },
                                        { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
                                    ]}
                                    value={systemSettings.timeZone}
                                    onChange={(value) => setSystemSettings(prev => ({ ...prev, timeZone: value }))}
                                />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</span>
                                    <ToggleSwitch
                                        enabled={systemSettings.emailNotifications}
                                        onChange={() => setSystemSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Backup</span>
                                    <ToggleSwitch
                                        enabled={systemSettings.autoBackup}
                                        onChange={() => setSystemSettings(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white"
                                >
                                    Save System Settings
                                </Button>
                            </form>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Security Settings</h3>
                            <form onSubmit={handleSecuritySubmit} className="space-y-4">
                                <FormField
                                    label="Session Timeout (minutes)"
                                    type="number"
                                    value={securitySettings.sessionTimeout}
                                    onChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                                />
                                <FormField
                                    label="Password Policy"
                                    type="select"
                                    options={[
                                        { value: 'basic', label: 'Basic (6+ characters)' },
                                        { value: 'medium', label: 'Medium (8+ chars, mixed case)' },
                                        { value: 'strong', label: 'Strong (12+ chars, mixed case, numbers, symbols)' },
                                    ]}
                                    value={securitySettings.passwordPolicy}
                                    onChange={(value) => setSecuritySettings(prev => ({ ...prev, passwordPolicy: value }))}
                                />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                                    <ToggleSwitch
                                        enabled={securitySettings.twoFactorAuth}
                                        onChange={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Login Logging</span>
                                    <ToggleSwitch
                                        enabled={securitySettings.loginLogging}
                                        onChange={() => setSecuritySettings(prev => ({ ...prev, loginLogging: !prev.loginLogging }))}
                                    />
                                </div>
                                <Button 
                                    type="button" 
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                    Change Password
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white"
                                >
                                    Save Security Settings
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Application Information */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Application Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-info-circle text-blue-800 dark:text-blue-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Version</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">v2.1.5</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-calendar text-emerald-600 dark:text-emerald-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Last Updated</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">June 15, 2025</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-shield-alt text-orange-600 dark:text-orange-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">License</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Enterprise</p>
                            </div>
                        </div>
                    </div>

                    {/* Backup & Maintenance */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Backup & Maintenance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-database text-blue-800 dark:text-blue-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Database Backup</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last backup: 2 hours ago</p>
                                <Button className="bg-blue-800 hover:bg-blue-700 text-white">
                                    Backup Now
                                </Button>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-sync-alt text-emerald-600 dark:text-emerald-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">System Update</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Version: 2.1.5 (Latest)</p>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                    Check Updates
                                </Button>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-broom text-orange-600 dark:text-orange-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">System Cleanup</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Free up 2.3 GB space</p>
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                    Clean Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">System Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 rounded">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Database</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 rounded">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">File System</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Healthy</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 rounded">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Service</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 rounded">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">System Uptime</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">98.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
