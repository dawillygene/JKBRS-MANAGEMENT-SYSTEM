import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MetricCard } from '@/components/metrics/MetricCard';
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
    Briefcase,
    Clock,
    AlertTriangle,
    CheckCircle,
    Target,
    BarChart3,
    Eye,
    Filter,
    Download,
    RefreshCw,
    Calendar,
    Activity
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
    quarterlyRevenue: number[];
    topSellingItems: Array<{ name: string; quantity: number; revenue: number }>;
    recentActivities: Array<{ 
        id: number; 
        type: string; 
        description: string; 
        user: string; 
        timestamp: string;
        office?: string;
        priority?: 'high' | 'medium' | 'low';
    }>;
    officeMetrics?: Array<{
        office: string;
        revenue: number;
        sales: number;
        employees: number;
        status: 'active' | 'warning' | 'critical';
        efficiency: number;
    }>;
    systemHealth?: {
        uptime: string;
        activeUsers: number;
        processingSpeed: string;
        errorRate: number;
    };
    alerts?: Array<{
        id: number;
        type: 'info' | 'warning' | 'error' | 'success';
        title: string;
        message: string;
        timestamp: string;
    }>;
}

function DashboardContent({ data }: { data?: DashboardData }) {
    const { user, formatCurrency } = useAuth();
    const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'quarter'>('month');
    const [refreshing, setRefreshing] = useState(false);

    // Enhanced sample data with more comprehensive metrics
    const sampleData: DashboardData = {
        totalRevenue: 45750000, // 45.75M Tsh
        totalSales: 1247,
        totalInventoryValue: 12500000, // 12.5M Tsh
        totalEmployees: 34,
        lowStockItems: 8,
        pendingOrders: 15,
        monthlyRevenue: [3200000, 3800000, 4100000, 4500000, 4200000, 4750000],
        quarterlyRevenue: [11100000, 13200000, 12750000, 8700000],
        topSellingItems: [
            { name: 'Rice 25kg', quantity: 450, revenue: 2250000 },
            { name: 'Cooking Oil 5L', quantity: 320, revenue: 1920000 },
            { name: 'Sugar 2kg', quantity: 280, revenue: 1400000 },
            { name: 'Maize Flour 10kg', quantity: 200, revenue: 1200000 },
            { name: 'Beans 5kg', quantity: 180, revenue: 900000 },
        ],
        recentActivities: [
            { id: 1, type: 'sale', description: 'Large bulk order completed', user: 'John Doe', timestamp: '2 minutes ago', office: 'Arusha Branch 1', priority: 'high' },
            { id: 2, type: 'inventory', description: 'Stock updated for Rice 25kg', user: 'Jane Smith', timestamp: '15 minutes ago', office: 'Main Office', priority: 'medium' },
            { id: 3, type: 'user', description: 'New employee registered', user: 'Admin', timestamp: '1 hour ago', office: 'Mwanza Branch 1', priority: 'low' },
            { id: 4, type: 'payment', description: 'Payroll processed successfully', user: 'HR Manager', timestamp: '2 hours ago', office: 'Main Office', priority: 'medium' },
            { id: 5, type: 'alert', description: 'Low stock alert: Sugar 2kg', user: 'System', timestamp: '3 hours ago', office: 'Dodoma Regional', priority: 'high' },
        ],
        officeMetrics: [
            { office: 'Main Office', revenue: 15750000, sales: 425, employees: 12, status: 'active', efficiency: 94 },
            { office: 'Arusha Regional', revenue: 12250000, sales: 310, employees: 8, status: 'active', efficiency: 87 },
            { office: 'Mwanza Regional', revenue: 10500000, sales: 285, employees: 7, status: 'warning', efficiency: 78 },
            { office: 'Dodoma Regional', revenue: 7250000, sales: 227, employees: 7, status: 'critical', efficiency: 65 },
        ],
        systemHealth: {
            uptime: '99.8%',
            activeUsers: 28,
            processingSpeed: '245ms',
            errorRate: 0.02
        },
        alerts: [
            { id: 1, type: 'warning', title: 'Low Stock Alert', message: '8 items are running low on stock', timestamp: '10 minutes ago' },
            { id: 2, type: 'info', title: 'System Update', message: 'Scheduled maintenance on Sunday 2AM', timestamp: '2 hours ago' },
            { id: 3, type: 'success', title: 'Backup Complete', message: 'Daily backup completed successfully', timestamp: '6 hours ago' },
        ]
    };

    const currentData = data || sampleData;

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRefreshing(false);
    };

    // Enhanced chart configurations
    const revenueChartData = {
        labels: timeFilter === 'quarter' 
            ? ['Q1', 'Q2', 'Q3', 'Q4']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue (Tsh)',
                data: timeFilter === 'quarter' 
                    ? currentData.quarterlyRevenue 
                    : currentData.monthlyRevenue,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const revenueChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: `Revenue Trends (${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)})`,
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `Revenue: ${formatCurrency(context.parsed.y)}`,
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => formatCurrency(value).replace('Tsh ', 'Tsh '),
                    font: {
                        size: 11
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 11
                    }
                },
                grid: {
                    display: false
                }
            }
        },
    };

    const productDistributionData = {
        labels: (currentData.topSellingItems || []).map(item => item.name),
        datasets: [
            {
                data: (currentData.topSellingItems || []).map(item => item.revenue),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(139, 92, 246, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const productDistributionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 11
                    },
                    padding: 15
                }
            },
            title: {
                display: true,
                text: 'Product Revenue Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
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
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
            },
        },
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
            default: return <Activity className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-[1600px] mx-auto space-y-4 lg:space-y-6">
                
                {/* Enhanced Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
                                        Welcome back, {user?.name}!
                                    </h1>
                                    <p className="text-blue-100 text-sm lg:text-base">
                                        {user?.role?.display_name} at {user?.office?.name}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 text-xs sm:text-sm text-blue-100 mt-4">
                                <span className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                                    <Building2 className="w-4 h-4" />
                                    {user?.office?.type === 'main' ? 'Main Office' : 
                                     user?.office?.type === 'regional' ? 'Regional Office' : 'Branch'}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                                    <MapPin className="w-4 h-4" />
                                    {user?.office?.address || 'N/A'}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                                    <Briefcase className="w-4 h-4" />
                                    ID: {user?.employee_id}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-start sm:items-center">
                            <div className="text-center sm:text-right">
                                <p className="text-blue-100 text-xs lg:text-sm">Office Budget</p>
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                                    {user?.office?.budget_allocation ? formatCurrency(user.office.budget_allocation) : 'N/A'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleRefresh}
                                    disabled={refreshing}
                                    className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                                </button>
                                <select 
                                    value={timeFilter} 
                                    onChange={(e) => setTimeFilter(e.target.value as any)}
                                    className="bg-white/20 border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/70"
                                >
                                    <option value="today" className="text-black">Today</option>
                                    <option value="week" className="text-black">This Week</option>
                                    <option value="month" className="text-black">This Month</option>
                                    <option value="quarter" className="text-black">This Quarter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Health & Alerts Bar - Admin Only */}
                <AdminOnly>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    System Health
                                </h3>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Operational</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                <div>
                                    <p className="text-gray-500">Uptime</p>
                                    <p className="font-semibold text-green-600">{currentData.systemHealth?.uptime}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Active Users</p>
                                    <p className="font-semibold">{currentData.systemHealth?.activeUsers}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Response Time</p>
                                    <p className="font-semibold">{currentData.systemHealth?.processingSpeed}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Error Rate</p>
                                    <p className="font-semibold text-green-600">{currentData.systemHealth?.errorRate}%</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Recent Alerts
                            </h3>
                            <div className="space-y-2 max-h-20 overflow-y-auto">
                                {(currentData.alerts || []).slice(0, 3).map((alert) => (
                                    <div key={alert.id} className="flex items-start gap-2 text-xs">
                                        <div className={`w-2 h-2 rounded-full mt-1 ${
                                            alert.type === 'error' ? 'bg-red-500' :
                                            alert.type === 'warning' ? 'bg-yellow-500' :
                                            alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                        }`} />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{alert.title}</p>
                                            <p className="text-gray-500 text-xs">{alert.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AdminOnly>

                {/* Enhanced Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
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

                {/* Quick Action Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <InventoryAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
                                    <p className="text-2xl lg:text-3xl font-bold text-orange-600">{currentData.lowStockItems}</p>
                                    <p className="text-xs text-gray-500">Need immediate attention</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <TrendingDown className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    </InventoryAccess>
                    
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                                    <p className="text-2xl lg:text-3xl font-bold text-blue-600">{currentData.pendingOrders}</p>
                                    <p className="text-xs text-gray-500">Awaiting processing</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    Process Orders
                                </button>
                            </div>
                        </div>
                    </SalesAccess>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance</p>
                                <p className="text-2xl lg:text-3xl font-bold text-green-600">Excellent</p>
                                <p className="text-xs text-gray-500">All systems optimal</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                                <BarChart3 className="w-3 h-3" />
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Analytics</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive revenue tracking</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                                            <Download className="w-3 h-3 inline mr-1" />
                                            Export
                                        </button>
                                        <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition-colors">
                                            <Filter className="w-3 h-3 inline mr-1" />
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 lg:p-6">
                                <div className="h-64 lg:h-80">
                                    <Bar data={revenueChartData} options={revenueChartOptions} />
                                </div>
                            </div>
                        </div>
                    </SalesAccess>

                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Performance</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Top performing products analysis</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                                            <Eye className="w-3 h-3 inline mr-1" />
                                            View All
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 lg:p-6">
                                <div className="h-64 lg:h-80">
                                    <Doughnut data={productDistributionData} options={productDistributionOptions} />
                                </div>
                            </div>
                        </div>
                    </SalesAccess>
                </div>

                {/* Enhanced Office Performance Table for Admins */}
                <AdminOnly>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office Performance Dashboard</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Real-time metrics across all office locations</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                                        <Download className="w-3 h-3 inline mr-1" />
                                        Export Report
                                    </button>
                                    <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition-colors">
                                        <Calendar className="w-3 h-3 inline mr-1" />
                                        Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Office</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sales</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employees</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {(currentData.officeMetrics || []).map((office, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {office.office}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatCurrency(office.revenue)}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {office.sales.toLocaleString()}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {office.employees}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(office.status)}`}>
                                                    {office.status.charAt(0).toUpperCase() + office.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full ${
                                                                office.efficiency >= 90 ? 'bg-green-500' :
                                                                office.efficiency >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${office.efficiency}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium">{office.efficiency}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AdminOnly>

                {/* Enhanced Bottom Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                    {/* Top Selling Products Table */}
                    <SalesAccess>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Best performing items this period</p>
                                    </div>
                                    <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition-colors">
                                        <Eye className="w-3 h-3 inline mr-1" />
                                        View Full Report
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {(currentData.topSellingItems || []).map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {item.quantity.toLocaleString()}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {formatCurrency(item.revenue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </SalesAccess>

                    {/* Enhanced Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Latest system activities and updates</p>
                                </div>
                                <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                                    <Activity className="w-3 h-3 inline mr-1" />
                                    View All
                                </button>
                            </div>
                        </div>
                        <div className="p-4 lg:p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {(currentData.recentActivities || []).map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                {activity.type === 'sale' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                                                {activity.type === 'inventory' && <Package className="w-4 h-4 text-green-600" />}
                                                {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                                                {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-orange-600" />}
                                                {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {activity.description}
                                                </p>
                                                {activity.priority && getPriorityIcon(activity.priority)}
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <span>by {activity.user}</span>
                                                <span>•</span>
                                                <span>{activity.timestamp}</span>
                                                {activity.office && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-blue-600">{activity.office}</span>
                                                    </>
                                                )}
                                            </div>
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

export default function EnhancedAdminDashboard({ data }: { data?: DashboardData }) {
    return (
        <AuthProvider>
            <AppLayout>
                <Head title="Dashboard - JKBRS Inventory Management" />
                <DashboardContent data={data} />
            </AppLayout>
        </AuthProvider>
    );
}
