import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { StatusCard } from '@/components/ui/StatusCard';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PermissionGate, InventoryAccess, AdminOnly, ManagerOnly } from '@/components/auth/PermissionGate';
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
import { Package, AlertTriangle, TrendingUp, Plus, Filter, Download } from 'lucide-react';

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

interface InventoryItem {
    id: number;
    item_code: string;
    name: string;
    category: string;
    quantity: number;
    minimum_stock: number;
    cost_price: number;
    selling_price: number;
    unit: string;
    supplier?: string;
    location?: string;
    office: string;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

function InventoryContent() {
    const { user, formatCurrency, hasPermission, getUserOffices } = useAuth();
    const userOffices = getUserOffices();
    
    const [stockData, setStockData] = useState({
        location: '',
        product: '',
        quantity: '',
        minLevel: '',
        costPrice: '',
        sellingPrice: ''
    });

    const [selectedOffice, setSelectedOffice] = useState<string>(user?.office?.name || 'All Offices');

    // Sample inventory data with Tanzanian context
    const sampleInventoryItems: InventoryItem[] = [
        {
            id: 1,
            item_code: 'RICE001',
            name: 'Rice 25kg',
            category: 'Grains',
            quantity: 245,
            minimum_stock: 50,
            cost_price: 45000,
            selling_price: 50000,
            unit: 'bags',
            supplier: 'Mbeya Rice Mills',
            location: 'Warehouse A',
            office: user?.office?.name || 'Main Office',
            status: 'in_stock'
        },
        {
            id: 2,
            item_code: 'OIL002',
            name: 'Cooking Oil 5L',
            category: 'Oils',
            quantity: 15,
            minimum_stock: 20,
            cost_price: 18000,
            selling_price: 20000,
            unit: 'bottles',
            supplier: 'Bidco Tanzania',
            location: 'Warehouse B',
            office: user?.office?.name || 'Main Office',
            status: 'low_stock'
        },
        {
            id: 3,
            item_code: 'SUGAR003',
            name: 'Sugar 2kg',
            category: 'Sweeteners',
            quantity: 0,
            minimum_stock: 30,
            cost_price: 4800,
            selling_price: 5000,
            unit: 'packets',
            supplier: 'Kilombero Sugar',
            location: 'Warehouse A',
            office: user?.office?.name || 'Main Office',
            status: 'out_of_stock'
        },
        {
            id: 4,
            item_code: 'MAIZE004',
            name: 'Maize Flour 10kg',
            category: 'Flour',
            quantity: 120,
            minimum_stock: 25,
            cost_price: 28000,
            selling_price: 30000,
            unit: 'bags',
            supplier: 'Bakhresa Mills',
            location: 'Warehouse C',
            office: user?.office?.name || 'Main Office',
            status: 'in_stock'
        },
        {
            id: 5,
            item_code: 'BEANS005',
            name: 'Red Beans 2kg',
            category: 'Legumes',
            quantity: 18,
            minimum_stock: 20,
            cost_price: 8000,
            selling_price: 9000,
            unit: 'packets',
            supplier: 'Mbeya Farmers Coop',
            location: 'Warehouse B',
            office: user?.office?.name || 'Main Office',
            status: 'low_stock'
        }
    ];

    const inventoryMovements = [
        ['2025-06-22 10:30', user?.office?.name || 'Main Office', 'Rice 25kg', '150 bags', 'Stock Received', formatCurrency(6750000)],
        ['2025-06-22 14:15', user?.office?.name || 'Main Office', 'Cooking Oil 5L', '50 bottles', 'Sale', formatCurrency(1000000)],
        ['2025-06-21 16:45', user?.office?.name || 'Main Office', 'Sugar 2kg', '75 packets', 'Sale', formatCurrency(375000)],
        ['2025-06-21 09:20', user?.office?.name || 'Main Office', 'Maize Flour 10kg', '30 bags', 'Stock Received', formatCurrency(840000)],
        ['2025-06-20 11:30', user?.office?.name || 'Main Office', 'Red Beans 2kg', '40 packets', 'Sale', formatCurrency(360000)],
    ];

    // Calculate metrics
    const totalItems = sampleInventoryItems.length;
    const lowStockItems = sampleInventoryItems.filter(item => item.status === 'low_stock').length;
    const outOfStockItems = sampleInventoryItems.filter(item => item.status === 'out_of_stock').length;
    const totalValue = sampleInventoryItems.reduce((sum, item) => sum + (item.quantity * item.cost_price), 0);

    const handleStockSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Stock data submitted:', stockData);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Inventory Management - {user?.office?.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage stock levels and inventory for {user?.office?.type === 'main' ? 'all offices' : 'your office'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <InventoryAccess>
                            <Button className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Item
                            </Button>
                        </InventoryAccess>
                        <AdminOnly>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                        </AdminOnly>
                    </div>
                </div>
            </div>

            {/* Office Filter for Managers */}
            <ManagerOnly>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <select 
                            value={selectedOffice}
                            onChange={(e) => setSelectedOffice(e.target.value)}
                            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="All Offices">All Offices</option>
                            {userOffices.map(office => (
                                <option key={office.id} value={office.name}>{office.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </ManagerOnly>

            {/* Inventory Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard
                    title="Total Items"
                    value={totalItems.toString()}
                    subtitle="Active inventory items"
                    status="info"
                    icon={<Package className="w-5 h-5" />}
                />
                
                <StatusCard
                    title="Total Value"
                    value={formatCurrency(totalValue)}
                    subtitle="Current stock value"
                    status="success"
                    icon={<TrendingUp className="w-5 h-5" />}
                />

                <StatusCard
                    title="Low Stock"
                    value={lowStockItems.toString()}
                    subtitle="Items below minimum"
                    status="warning"
                    icon={<AlertTriangle className="w-5 h-5" />}
                />

                <StatusCard
                    title="Out of Stock"
                    value={outOfStockItems.toString()}
                    subtitle="Items need restocking"
                    status="error"
                    icon={<AlertTriangle className="w-5 h-5" />}
                />
            </div>

            {/* Inventory Chart */}
            <InventoryAccess>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Stock Levels by Category
                    </h3>
                    <div style={{ height: '300px' }}>
                        <Bar 
                            data={{
                                labels: ['Grains', 'Oils', 'Sweeteners', 'Flour', 'Legumes'],
                                datasets: [{
                                    label: 'Stock Value (Tsh)',
                                    data: [11025000, 270000, 0, 3360000, 144000],
                                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    borderWidth: 1,
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context: any) => `Value: ${formatCurrency(context.parsed.y)}`,
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
                            }}
                        />
                    </div>
                </div>
            </InventoryAccess>

            {/* Inventory Items Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Inventory</h3>
                    <p className="text-gray-600 dark:text-gray-400">Items in {selectedOffice}</p>
                </div>
                <div className="p-6">
                    <DataTable
                        data={sampleInventoryItems}
                        columns={[
                            { key: 'item_code', label: 'Item Code' },
                            { key: 'name', label: 'Product Name' },
                            { key: 'category', label: 'Category' },
                            { key: 'quantity', label: 'Quantity' },
                            { key: 'unit', label: 'Unit' },
                            { key: 'cost_price', label: 'Cost Price (Tsh)', format: (value: number) => formatCurrency(value) },
                            { key: 'selling_price', label: 'Selling Price (Tsh)', format: (value: number) => formatCurrency(value) },
                            { key: 'supplier', label: 'Supplier' },
                            { key: 'location', label: 'Location' },
                            { 
                                key: 'status', 
                                label: 'Status',
                                format: (value: string) => {
                                    const colors = {
                                        'in_stock': 'text-green-600 bg-green-100',
                                        'low_stock': 'text-yellow-600 bg-yellow-100',
                                        'out_of_stock': 'text-red-600 bg-red-100'
                                    };
                                    return (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
                                            {value.replace('_', ' ').toUpperCase()}
                                        </span>
                                    );
                                }
                            }
                        ]}
                    />
                </div>
            </div>

            {/* Recent Inventory Movements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Movements</h3>
                    <p className="text-gray-600 dark:text-gray-400">Latest inventory transactions</p>
                </div>
                <div className="p-6">
                    <DataTable
                        data={inventoryMovements.map((movement, index) => ({
                            id: index,
                            date: movement[0],
                            office: movement[1],
                            item: movement[2],
                            quantity: movement[3],
                            type: movement[4],
                            value: movement[5]
                        }))}
                        columns={[
                            { key: 'date', label: 'Date & Time' },
                            { key: 'office', label: 'Office' },
                            { key: 'item', label: 'Item' },
                            { key: 'quantity', label: 'Quantity' },
                            { key: 'type', label: 'Type' },
                            { key: 'value', label: 'Value' }
                        ]}
                    />
                </div>
            </div>

            {/* Add New Stock Form - Only for Inventory Access */}
            <InventoryAccess>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Inventory Item</h3>
                        <p className="text-gray-600 dark:text-gray-400">Register new stock items for {user?.office?.name}</p>
                    </div>
                    <form onSubmit={handleStockSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormField
                                label="Product Name"
                                type="text"
                                placeholder="Enter product name"
                                value={stockData.product}
                                onChange={(value) => setStockData({...stockData, product: value})}
                                required
                            />
                            <FormField
                                label="Location"
                                type="text"
                                placeholder="Warehouse location"
                                value={stockData.location}
                                onChange={(value) => setStockData({...stockData, location: value})}
                                required
                            />
                            <FormField
                                label="Quantity"
                                type="number"
                                placeholder="Initial quantity"
                                value={stockData.quantity}
                                onChange={(value) => setStockData({...stockData, quantity: value})}
                                required
                            />
                            <FormField
                                label="Minimum Level"
                                type="number"
                                placeholder="Minimum stock level"
                                value={stockData.minLevel}
                                onChange={(value) => setStockData({...stockData, minLevel: value})}
                                required
                            />
                            <FormField
                                label="Cost Price (Tsh)"
                                type="number"
                                placeholder="Cost price per unit"
                                value={stockData.costPrice}
                                onChange={(value) => setStockData({...stockData, costPrice: value})}
                                required
                            />
                            <FormField
                                label="Selling Price (Tsh)"
                                type="number"
                                placeholder="Selling price per unit"
                                value={stockData.sellingPrice}
                                onChange={(value) => setStockData({...stockData, sellingPrice: value})}
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <Button type="submit" className="w-full md:w-auto">
                                Add Inventory Item
                            </Button>
                        </div>
                    </form>
                </div>
            </InventoryAccess>
        </div>
    );
}

export default function RoleBasedInventory() {
    return (
        <AuthProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Inventory Management - JKBRS" />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                    <div className="container mx-auto px-6 py-8">
                        <InventoryContent />
                    </div>
                </main>
            </AppLayout>
        </AuthProvider>
    );
}
