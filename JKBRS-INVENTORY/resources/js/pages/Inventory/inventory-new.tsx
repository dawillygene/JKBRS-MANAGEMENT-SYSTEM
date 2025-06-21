import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { StatusCard } from '@/components/ui/StatusCard';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory Management',
        href: '/inventory',
    }
];

export default function Inventory() {
    const [stockData, setStockData] = useState({
        location: '',
        product: '',
        quantity: '',
        minLevel: ''
    });

    const inventoryMovements = [
        ['2025-06-22 10:30', 'Factory → Office', 'Rice Packets', '150', 'Transfer'],
        ['2025-06-22 14:15', 'Office → Center A', 'Rice Packets', '75', 'Distribution'],
        ['2025-06-21 16:45', 'Center A → Shop 1', 'Rice Packets', '30', 'Sale'],
        ['2025-06-21 09:20', 'Factory', 'Raw Material', '500', 'Received'],
    ];

    const stockLevels = [
        ['Rice 1kg Packets', 'Factory', '1245', '500', <span className="text-emerald-600 font-bold">Good</span>],
        ['Rice 5kg Packets', 'Office', '320', '100', <span className="text-emerald-600 font-bold">Good</span>],
        ['Raw Rice', 'Factory', '2450', '1000', <span className="text-emerald-600 font-bold">Good</span>],
        ['Packaging Material', 'Factory', '45', '200', <span className="text-red-600 font-bold">Low</span>],
    ];

    const chartData = {
        labels: ['Factory', 'Main Office', 'Center A', 'Center B', 'Center C', 'Shop 1', 'Shop 2', 'Shop 3'],
        datasets: [
            {
                label: 'Stock Levels',
                data: [1245, 320, 180, 150, 95, 85, 120, 95],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                ],
                borderWidth: 1,
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
            title: {
                display: true,
                text: 'Inventory Distribution Across Locations',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleStockSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Stock data submitted:', stockData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory Management" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    {/* Inventory Overview Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Factory Inventory */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Factory Inventory</h3>
                            <div className="space-y-3">
                                <StatusCard
                                    title="Raw Materials"
                                    value="2,450 Kg"
                                    bgColor="bg-blue-50"
                                    textColor="text-blue-800"
                                />
                                <StatusCard
                                    title="Processed"
                                    value="1,890 Kg"
                                    bgColor="bg-emerald-50"
                                    textColor="text-emerald-600"
                                />
                                <StatusCard
                                    title="Finished Products"
                                    value="1,245 Units"
                                    bgColor="bg-orange-50"
                                    textColor="text-orange-600"
                                />
                            </div>
                        </div>

                        {/* Distribution Centers */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Distribution Centers</h3>
                            <div className="space-y-3">
                                <StatusCard
                                    title="Center A"
                                    value="320 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                                <StatusCard
                                    title="Center B"
                                    value="280 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                                <StatusCard
                                    title="Center C"
                                    value="195 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Retail Shops */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Retail Shops</h3>
                            <div className="space-y-3">
                                <StatusCard
                                    title="Shop 1"
                                    value="85 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                                <StatusCard
                                    title="Shop 2"
                                    value="120 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                                <StatusCard
                                    title="Shop 3"
                                    value="95 Units"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inventory Chart */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Inventory Distribution Chart</h3>
                        <div style={{ height: '400px' }}>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Quick Stock Management */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Stock Entry</h3>
                        <form onSubmit={handleStockSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <FormField
                                label="Location"
                                type="select"
                                options={[
                                    { value: 'factory', label: 'Factory' },
                                    { value: 'office', label: 'Main Office' },
                                    { value: 'center-a', label: 'Center A' },
                                    { value: 'center-b', label: 'Center B' },
                                    { value: 'center-c', label: 'Center C' },
                                ]}
                                value={stockData.location}
                                onChange={(value) => setStockData(prev => ({ ...prev, location: value }))}
                            />
                            <FormField
                                label="Product"
                                type="text"
                                placeholder="Product name"
                                value={stockData.product}
                                onChange={(value) => setStockData(prev => ({ ...prev, product: value }))}
                            />
                            <FormField
                                label="Quantity"
                                type="number"
                                placeholder="Quantity"
                                value={stockData.quantity}
                                onChange={(value) => setStockData(prev => ({ ...prev, quantity: value }))}
                            />
                            <FormField
                                label="Min Level"
                                type="number"
                                placeholder="Minimum level"
                                value={stockData.minLevel}
                                onChange={(value) => setStockData(prev => ({ ...prev, minLevel: value }))}
                            />
                        </form>
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                Add Stock
                            </Button>
                            <Button type="button" className="bg-orange-600 hover:bg-orange-700 text-white">
                                Transfer Stock
                            </Button>
                            <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Adjust Stock
                            </Button>
                        </div>
                    </div>

                    {/* Stock Levels Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Current Stock Levels</h3>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <i className="fas fa-download mr-2"></i>
                                Export Report
                            </Button>
                        </div>
                        <DataTable
                            headers={['Product', 'Location', 'Current Stock', 'Min Level', 'Status']}
                            rows={stockLevels}
                        />
                    </div>

                    {/* Inventory Movement Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Inventory Movements</h3>
                        <DataTable
                            headers={['Date & Time', 'Movement', 'Product', 'Quantity', 'Type']}
                            rows={inventoryMovements.map(row => row.map((cell, index) => (
                                index === 4 ? (
                                    <span 
                                        key={index}
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            cell === 'Received' 
                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                                                : cell === 'Transfer'
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                : cell === 'Distribution'
                                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                        }`}
                                    >
                                        {cell}
                                    </span>
                                ) : cell
                            )))}
                        />
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
