import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ActivityItem } from '@/components/ActivityItem';
import { MetricCard } from '@/components/metrics/MetricCard';
import { Factory, Building2, TrendingUp, Coins } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    }
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
            <div className="container mx-auto px-6 py-8">
            <div id="dashboard-section" className="section">
                     
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Factory Stock</p>
                                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">2,450 Kg</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400"><i className="fas fa-arrow-up"></i> 12% from last month</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <i className="fas fa-industry text-blue-800 dark:text-blue-200 text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Office Stock</p>
                                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">1,280 Units</p>
                                        <p className="text-xs text-orange-600"><i className="fas fa-arrow-down"></i> 5% from last month</p>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-building text-emerald-600 text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Sales</p>
                                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">₹45,600</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400"><i className="fas fa-arrow-up"></i> 8% from yesterday</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-chart-line text-orange-600 text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Profit</p>
                                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">₹3,24,500</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400"><i className="fas fa-arrow-up"></i> 15% from last month</p>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-coins text-gray-700 text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales Performance</h3>
                                <canvas id="salesChart" width="400" height="200"></canvas>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Inventory Distribution</h3>
                                <canvas id="inventoryChart" width="400" height="200"></canvas>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Factory Activities</h3>
                                <div className="space-y-4">
                                    <ActivityItem
                                        iconClass="fas fa-plus"
                                        iconBg="bg-blue-100"
                                        iconColor="text-blue-600"
                                        title="Raw Material Added"
                                        description="500 Kg Samba - 2 hours ago"
                                    />
                                    <ActivityItem
                                        iconClass="fas fa-cogs"
                                        iconBg="bg-emerald-100"
                                        iconColor="text-emerald-600"
                                        title="Production Completed"
                                        description="200 Units Processed - 4 hours ago"
                                    />
                                    <ActivityItem
                                        iconClass="fas fa-truck"
                                        iconBg="bg-orange-100"
                                        iconColor="text-orange-600"
                                        title="Shipped to Office"
                                        description="150 Units - 6 hours ago"
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Office Activities</h3>
                                <div className="space-y-4">
                                    <ActivityItem
                                        iconClass="fas fa-shopping-cart"
                                        iconBg="bg-emerald-100"
                                        iconColor="text-emerald-600"
                                        title="New Sale"
                                        description="50 Units - ₹12,500 - 1 hour ago"
                                    />
                                    <ActivityItem
                                        iconClass="fas fa-box"
                                        iconBg="bg-blue-100"
                                        iconColor="text-blue-600"
                                        title="Stock Received"
                                        description="150 Units from Factory - 3 hours ago"
                                    />
                                    <ActivityItem
                                        iconClass="fas fa-bullhorn"
                                        iconBg="bg-orange-100"
                                        iconColor="text-orange-600"
                                        title="Advertisement Campaign"
                                        description="₹5,000 spent - 5 hours ago"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </main>
        </AppLayout>
    );
}
