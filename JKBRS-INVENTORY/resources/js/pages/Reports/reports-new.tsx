import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { DataTable } from '@/components/ui/DataTable';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    }
];

export default function Reports() {
    const [reportData, setReportData] = useState({
        reportType: '',
        dateFrom: '',
        dateTo: '',
        format: ''
    });

    const recentReports = [
        ['Daily Sales Report', '2025-06-22', 'PDF', 'Generated', <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1">Download</Button>],
        ['Inventory Summary', '2025-06-21', 'Excel', 'Generated', <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1">Download</Button>],
        ['Monthly P&L', '2025-06-01', 'PDF', 'Generated', <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1">Download</Button>],
        ['Employee Report', '2025-06-20', 'CSV', 'Processing', <span className="text-yellow-600 text-xs">Processing...</span>],
    ];

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Report data submitted:', reportData);
    };

    const QuickReportButton = ({ icon, title, bgColor, textColor }: {
        icon: string;
        title: string;
        bgColor: string;
        textColor: string;
    }) => (
        <Button className={`${bgColor} ${textColor} hover:opacity-80 py-6 px-4 rounded-lg transition duration-200 text-sm font-medium flex flex-col items-center h-auto`}>
            <i className={`${icon} mb-2 text-lg`}></i>
            {title}
        </Button>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Report Generator */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Generate Report</h3>
                            <form onSubmit={handleReportSubmit} className="space-y-4">
                                <FormField
                                    label="Report Type"
                                    type="select"
                                    options={[
                                        { value: 'daily-sales', label: 'Daily Sales' },
                                        { value: 'monthly-sales', label: 'Monthly Sales' },
                                        { value: 'inventory', label: 'Inventory Report' },
                                        { value: 'production', label: 'Production Report' },
                                        { value: 'expenses', label: 'Expense Report' },
                                        { value: 'profit-loss', label: 'Profit & Loss' },
                                        { value: 'employee', label: 'Employee Report' },
                                        { value: 'customer', label: 'Customer Report' },
                                    ]}
                                    value={reportData.reportType}
                                    onChange={(value) => setReportData(prev => ({ ...prev, reportType: value }))}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="From Date"
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        value={reportData.dateFrom}
                                        onChange={(value) => setReportData(prev => ({ ...prev, dateFrom: value }))}
                                    />
                                    <FormField
                                        label="To Date"
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        value={reportData.dateTo}
                                        onChange={(value) => setReportData(prev => ({ ...prev, dateTo: value }))}
                                    />
                                </div>
                                <FormField
                                    label="Format"
                                    type="select"
                                    options={[
                                        { value: 'pdf', label: 'PDF' },
                                        { value: 'excel', label: 'Excel (XLSX)' },
                                        { value: 'csv', label: 'CSV' },
                                        { value: 'html', label: 'HTML' },
                                    ]}
                                    value={reportData.format}
                                    onChange={(value) => setReportData(prev => ({ ...prev, format: value }))}
                                />
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white"
                                >
                                    Generate Report
                                </Button>
                            </form>
                        </div>

                        {/* Quick Reports */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Reports</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <QuickReportButton
                                    icon="fas fa-chart-line"
                                    title="Daily Sales"
                                    bgColor="bg-emerald-100 dark:bg-emerald-900"
                                    textColor="text-emerald-800 dark:text-emerald-200"
                                />
                                <QuickReportButton
                                    icon="fas fa-boxes"
                                    title="Current Stock"
                                    bgColor="bg-blue-100 dark:bg-blue-900"
                                    textColor="text-blue-800 dark:text-blue-200"
                                />
                                <QuickReportButton
                                    icon="fas fa-industry"
                                    title="Production"
                                    bgColor="bg-orange-100 dark:bg-orange-900"
                                    textColor="text-orange-800 dark:text-orange-200"
                                />
                                <QuickReportButton
                                    icon="fas fa-users"
                                    title="Employee"
                                    bgColor="bg-gray-100 dark:bg-gray-800"
                                    textColor="text-gray-800 dark:text-gray-200"
                                />
                                <QuickReportButton
                                    icon="fas fa-wallet"
                                    title="Expenses"
                                    bgColor="bg-purple-100 dark:bg-purple-900"
                                    textColor="text-purple-800 dark:text-purple-200"
                                />
                                <QuickReportButton
                                    icon="fas fa-coins"
                                    title="Profit/Loss"
                                    bgColor="bg-yellow-100 dark:bg-yellow-900"
                                    textColor="text-yellow-800 dark:text-yellow-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Report Analytics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-file-alt text-blue-800 dark:text-blue-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">247</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Reports</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-download text-emerald-600 dark:text-emerald-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">23</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-clock text-orange-600 dark:text-orange-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">2</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Processing</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-chart-bar text-purple-600 dark:text-purple-200 text-2xl"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-200">5</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled</p>
                        </div>
                    </div>

                    {/* Report Templates */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Scheduled Reports</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Daily Sales Summary</h4>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Generates daily at 11:59 PM</p>
                                <div className="flex gap-2">
                                    <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
                                    <Button className="text-xs bg-gray-600 hover:bg-gray-700 text-white">Pause</Button>
                                </div>
                            </div>

                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Weekly Inventory</h4>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Generates every Monday at 9:00 AM</p>
                                <div className="flex gap-2">
                                    <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
                                    <Button className="text-xs bg-gray-600 hover:bg-gray-700 text-white">Pause</Button>
                                </div>
                            </div>

                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Monthly P&L</h4>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                        Paused
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Generates on 1st of each month</p>
                                <div className="flex gap-2">
                                    <Button className="text-xs bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
                                    <Button className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white">Resume</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Reports */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recent Reports</h3>
                            <div className="flex gap-2">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                                    <i className="fas fa-plus mr-2"></i>
                                    Schedule Report
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                                    <i className="fas fa-history mr-2"></i>
                                    View All
                                </Button>
                            </div>
                        </div>
                        <DataTable
                            headers={['Report Name', 'Generated Date', 'Format', 'Status', 'Action']}
                            rows={recentReports}
                        />
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
