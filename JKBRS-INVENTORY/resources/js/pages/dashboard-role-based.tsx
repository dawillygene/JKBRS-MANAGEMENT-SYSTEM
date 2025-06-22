import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MetricCard } from '@/components/metrics/MetricCard';
import { StatusCard } from '@/components/ui/StatusCard';
import { DataTable } from '@/components/ui/DataTable';
import { ActivityItem } from '@/components/ActivityItem';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PermissionGate, AdminOnly, ManagerOnly, InventoryAccess, SalesAccess } from '@/components/auth/PermissionGate';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
    const { user, formatCurrency, isAdmin, getUserOffices } = useAuth();
    const userOffices = getUserOffices();

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

    const currentData = {
        totalRevenue: data?.totalRevenue || sampleData.totalRevenue,
        totalSales: data?.totalSales || sampleData.totalSales,
        totalInventoryValue: data?.totalInventoryValue || sampleData.totalInventoryValue,
        totalEmployees: data?.totalEmployees || sampleData.totalEmployees,
        lowStockItems: data?.lowStockItems || sampleData.lowStockItems,
        pendingOrders: data?.pendingOrders || sampleData.pendingOrders,
        monthlyRevenue: data?.monthlyRevenue || sampleData.monthlyRevenue,
        topSellingItems: data?.topSellingItems || sampleData.topSellingItems,
        recentActivities: data?.recentActivities || sampleData.recentActivities,
        officeMetrics: data?.officeMetrics || sampleData.officeMetrics,
    };

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
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Top Selling Items by Revenue',
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
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {user?.role?.display_name} at {user?.office?.name}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
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
                                Employee ID: {user?.employee_id}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Monthly Budget</p>
                        <p className="text-lg font-semibold text-green-600">
                            {user?.office?.budget_allocation ? formatCurrency(user.office.budget_allocation) : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InventoryAccess>
                    <StatusCard
                        title="Low Stock Alert"
                        value={currentData.lowStockItems.toString()}
                        bgColor="bg-orange-100"
                        textColor="text-orange-600"
                    />
                </InventoryAccess>
                
                <SalesAccess>
                    <StatusCard
                        title="Pending Orders"
                        value={currentData.pendingOrders.toString()}
                        bgColor="bg-blue-100"
                        textColor="text-blue-600"
                    />
                </SalesAccess>

                <StatusCard
                    title="System Status"
                    value="Operational"
                    bgColor="bg-green-100"
                    textColor="text-green-600"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesAccess>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </SalesAccess>

                <SalesAccess>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </SalesAccess>
            </div>

            {/* Office Metrics for Managers */}
            <AdminOnly>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office Performance</h3>
                        <p className="text-gray-600 dark:text-gray-400">Performance metrics across all offices</p>
                    </div>
                    <div className="p-6">
                        <DataTable
                            headers={['Office', 'Revenue (Tsh)', 'Total Sales', 'Employees']}
                            rows={(currentData.officeMetrics || []).map(office => [
                                office.office,
                                formatCurrency(office.revenue),
                                office.sales.toString(),
                                office.employees.toString()
                            ])}
                        />
                    </div>
                </div>
            </AdminOnly>

            {/* Data Tables and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesAccess>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
                            <p className="text-gray-600 dark:text-gray-400">Best performing items this month</p>
                        </div>
                        <div className="p-6">
                            <DataTable
                                headers={['Product Name', 'Quantity Sold', 'Revenue (Tsh)']}
                                rows={(currentData.topSellingItems || []).map(item => [
                                    item.name,
                                    item.quantity.toString(),
                                    formatCurrency(item.revenue)
                                ])}
                            />
                        </div>
                    </div>
                </SalesAccess>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                        <p className="text-gray-600 dark:text-gray-400">Latest system activities</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {(currentData.recentActivities || []).map((activity) => (
                                <ActivityItem
                                    key={activity.id}
                                    iconClass="fas fa-circle"
                                    iconBg="bg-blue-100"
                                    iconColor="text-blue-600"
                                    title={activity.description}
                                    description={`${activity.user} • ${activity.timestamp}${activity.office ? ` • ${activity.office}` : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RoleBasedDashboard({ data }: { data?: DashboardData }) {
    return (
        <AuthProvider>
            <AppLayout>
                <Head title="Dashboard - JKBRS Inventory Management" />
                <DashboardContent data={data} />
            </AppLayout>
        </AuthProvider>
    );
}
