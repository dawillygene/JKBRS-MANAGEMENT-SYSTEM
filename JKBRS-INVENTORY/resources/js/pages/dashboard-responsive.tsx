import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MetricCard } from '@/components/metrics/MetricCard';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PermissionGate, AdminOnly, ManagerOnly, InventoryAccess, SalesAccess } from '@/components/auth/PermissionGate';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
    DollarSign, 
    ShoppingCart, 
    Package, 
    Users, 
    TrendingUp, 
    TrendingDown,
    Building2,
    MapPin,
    Briefcase
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

interface DashboardData {
    totalRevenue: number;
    totalSales: number;
    totalInventoryValue: number;
    totalEmployees: number;
    lowStockItems: number;
    pendingOrders: number;
    monthlyRevenue: number[];
    topSellingItems: Array<{ name: string; quantity: number; revenue: number }>;
    recentActivities: Array<{ 
        id: number; 
        type: string; 
        description: string; 
        user: string; 
        timestamp: string;
        office?: string;
    }>;
    officeMetrics?: Array<{
        office: string;
        revenue: number;
        sales: number;
        employees: number;
    }>;
}

function DashboardContent({ data }: { data?: DashboardData }) {
    const { user, formatCurrency } = useAuth();

    // Sample data - in real app this would come from props
    const sampleData: DashboardData = {
        totalRevenue: 45750000, // 45.75M Tsh
        totalSales: 1247,
        totalInventoryValue: 12500000, // 12.5M Tsh
        totalEmployees: 34,
        lowStockItems: 8,
        pendingOrders: 15,
        monthlyRevenue: [3200000, 3800000, 4100000, 4500000, 4200000, 4750000],
        topSellingItems: [
            { name: 'Rice 25kg', quantity: 450, revenue: 2250000 },
            { name: 'Cooking Oil 5L', quantity: 320, revenue: 1920000 },
            { name: 'Sugar 2kg', quantity: 280, revenue: 1400000 },
            { name: 'Maize Flour 10kg', quantity: 200, revenue: 1200000 },
        ],
        recentActivities: [
            { id: 1, type: 'sale', description: 'New sale completed', user: 'John Doe', timestamp: '2 minutes ago', office: 'Arusha Branch 1' },
            { id: 2, type: 'inventory', description: 'Stock updated for Rice 25kg', user: 'Jane Smith', timestamp: '15 minutes ago', office: 'Main Office' },
            { id: 3, type: 'user', description: 'New employee registered', user: 'Admin', timestamp: '1 hour ago', office: 'Mwanza Branch 1' },
            { id: 4, type: 'payment', description: 'Payroll processed', user: 'HR Manager', timestamp: '2 hours ago', office: 'Main Office' },
        ],
        officeMetrics: [
            { office: 'Main Office', revenue: 15750000, sales: 425, employees: 12 },
            { office: 'Arusha Regional', revenue: 12250000, sales: 310, employees: 8 },
            { office: 'Mwanza Regional', revenue: 10500000, sales: 285, employees: 7 },
            { office: 'Dodoma Regional', revenue: 7250000, sales: 227, employees: 7 },
        ]
    };

    const currentData = data || sampleData;

    // Chart configurations
    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Revenue (Tsh)',
                data: currentData.monthlyRevenue,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Revenue Trends',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `Revenue: ${formatCurrency(context.parsed.y)}`,
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value: any) => formatCurrency(value).replace('Tsh ', 'Tsh '),
                },
            },
        },
    };

    const doughnutData = {
        labels: (currentData.topSellingItems || []).map(item => item.name),
        datasets: [
            {
                data: (currentData.topSellingItems || []).map(item => item.revenue),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Top Products by Revenue',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const items = currentData.topSellingItems || [];
                        const item = items[context.dataIndex];
                        if (item) {
                            return `${item.name}: ${formatCurrency(item.revenue)} (${item.quantity} units)`;
                        }
                        return '';
                    },
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-blue-100 mb-4 lg:mb-0">
                                {user?.role?.display_name} at {user?.office?.name}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                                <span className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    {user?.office?.type === 'main' ? 'Main Office' : 
                                     user?.office?.type === 'regional' ? 'Regional Office' : 'Branch'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {user?.office?.address}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase className="w-4 h-4" />
                                    ID: {user?.employee_id}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0 text-right">
                            <p className="text-blue-100 text-sm">Office Budget</p>
                            <p className="text-2xl font-bold">
                                {user?.office?.budget_allocation ? formatCurrency(user.office.budget_allocation) : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <SalesAccess>
                        <MetricCard
                            title="Total Revenue"
                            value={formatCurrency(currentData.totalRevenue)}
                            change="+12.5%"
                            changeType="increase"
                            icon={DollarSign}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-600"
                        />
                    </SalesAccess>
                    
                    <SalesAccess>
                        <MetricCard
                            title="Total Sales"
                            value={currentData.totalSales.toLocaleString()}
                            change="+8.2%"
                            changeType="increase"
                            icon={ShoppingCart}
                            iconBgColor="bg-green-100"
                            iconColor="text-green-600"
                        />
                    </SalesAccess>

                    <InventoryAccess>
                        <MetricCard
                            title="Inventory Value"
                            value={formatCurrency(currentData.totalInventoryValue)}
                            change="-2.1%"
                            changeType="decrease"
                            icon={Package}
                            iconBgColor="bg-purple-100"
                            iconColor="text-purple-600"
                        />
                    </InventoryAccess>

                    <ManagerOnly>
                        <MetricCard
                            title="Total Employees"
                            value={currentData.totalEmployees.toString()}
                            change="+5.7%"
                            changeType="increase"
                            icon={Users}
                            iconBgColor="bg-orange-100"
                            iconColor="text-orange-600"
                        />
                    </ManagerOnly>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <InventoryAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
                                    <p className="text-2xl font-bold text-orange-600">{currentData.lowStockItems}</p>
                                    <p className="text-xs text-gray-500">Need restocking</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <TrendingDown className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </InventoryAccess>
                    
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                                    <p className="text-2xl font-bold text-blue-600">{currentData.pendingOrders}</p>
                                    <p className="text-xs text-gray-500">Awaiting processing</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </SalesAccess>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Status</p>
                                <p className="text-2xl font-bold text-green-600">Operational</p>
                                <p className="text-xs text-gray-500">All systems running</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trends</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly revenue performance</p>
                            </div>
                            <div className="p-6">
                                <div className="h-64 lg:h-80">
                                    <Bar data={barChartData} options={barChartOptions} />
                                </div>
                            </div>
                        </div>
                    </SalesAccess>

                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Best performing items by revenue</p>
                            </div>
                            <div className="p-6">
                                <div className="h-64 lg:h-80">
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                </div>
                            </div>
                        </div>
                    </SalesAccess>
                </div>

                {/* Office Performance Table for Admins */}
                <AdminOnly>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office Performance</h3>
                            <p className="text-gray-600 dark:text-gray-400">Performance metrics across all offices</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Office</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sales</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employees</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {(currentData.officeMetrics || []).map((office, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {office.office}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatCurrency(office.revenue)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {office.sales.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {office.employees}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AdminOnly>

                {/* Recent Activity and Top Products */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Top Selling Products Table */}
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
                                <p className="text-gray-600 dark:text-gray-400">Best performing items this month</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {(currentData.topSellingItems || []).map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {item.quantity.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {formatCurrency(item.revenue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </SalesAccess>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                            <p className="text-gray-600 dark:text-gray-400">Latest system activities</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {(currentData.recentActivities || []).map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                {activity.type === 'sale' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                                                {activity.type === 'inventory' && <Package className="w-4 h-4 text-green-600" />}
                                                {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                                                {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-orange-600" />}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.description}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                by {activity.user} • {activity.timestamp}
                                                {activity.office && ` • ${activity.office}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResponsiveDashboard({ data }: { data?: DashboardData }) {
    return (
        <AuthProvider>
            <AppLayout>
                <Head title="Dashboard - JKBRS Inventory Management" />
                <DashboardContent data={data} />
            </AppLayout>
        </AuthProvider>
    );
}
