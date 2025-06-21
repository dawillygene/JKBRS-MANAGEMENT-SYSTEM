import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ActivityItem } from '@/components/ActivityItem';
import { MetricCard } from '@/components/metrics/MetricCard';
import { Factory, Building2, TrendingUp, Coins } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
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
    // Sample chart data
    const salesChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales (₹)',
                data: [45000, 52000, 48000, 61000, 58000, 67000],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const inventoryChartData = {
        labels: ['Factory', 'Main Office', 'Distribution Centers', 'Retail Shops'],
        datasets: [
            {
                data: [45, 25, 20, 10],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MetricCard
                            title="Factory Stock"
                            value="2,450 Kg"
                            change="12% from last month"
                            changeType="increase"
                            icon={Factory}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-800"
                        />
                        <MetricCard
                            title="Office Stock"
                            value="1,280 Units"
                            change="5% from last month"
                            changeType="decrease"
                            icon={Building2}
                            iconBgColor="bg-emerald-100"
                            iconColor="text-emerald-600"
                        />
                        <MetricCard
                            title="Daily Sales"
                            value="₹45,600"
                            change="8% from yesterday"
                            changeType="increase"
                            icon={TrendingUp}
                            iconBgColor="bg-orange-100"
                            iconColor="text-orange-600"
                        />
                        <MetricCard
                            title="Monthly Profit"
                            value="₹3,24,500"
                            change="15% from last month"
                            changeType="increase"
                            icon={Coins}
                            iconBgColor="bg-gray-100"
                            iconColor="text-gray-700"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales Performance</h3>
                            <div style={{ height: '300px' }}>
                                <Line data={salesChartData} options={chartOptions} />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Inventory Distribution</h3>
                            <div style={{ height: '300px' }}>
                                <Doughnut data={inventoryChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
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
            </main>
        </AppLayout>
    );
}
