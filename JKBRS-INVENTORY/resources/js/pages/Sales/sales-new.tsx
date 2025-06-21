import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { DataTable } from '@/components/ui/DataTable';
import { MetricCard } from '@/components/metrics/MetricCard';
import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales & Purchases',
        href: '/sales',
    }
];

export default function Sales() {
    const [saleData, setSaleData] = useState({
        customerName: '',
        product: '',
        quantity: '',
        unitPrice: '',
        discount: ''
    });

    const [purchaseData, setPurchaseData] = useState({
        supplier: '',
        product: '',
        quantity: '',
        unitCost: '',
        totalAmount: ''
    });

    const recentTransactions = [
        ['2025-06-22', 'ABC Store', 'Sale', 'Rice 1kg', '50', '₹12,500', <span className="text-emerald-600 font-bold">Completed</span>],
        ['2025-06-22', 'Raw Material Supplier', 'Purchase', 'Raw Rice', '500 Kg', '₹25,000', <span className="text-blue-600 font-bold">Paid</span>],
        ['2025-06-21', 'XYZ Mart', 'Sale', 'Rice 5kg', '20', '₹18,000', <span className="text-emerald-600 font-bold">Completed</span>],
        ['2025-06-21', 'Packaging Co.', 'Purchase', 'Packaging', '1000', '₹5,000', <span className="text-yellow-600 font-bold">Pending</span>],
    ];

    const topCustomers = [
        ['ABC Store', '₹45,600', '23', 'Regular'],
        ['XYZ Mart', '₹38,200', '18', 'Premium'],
        ['Local Store', '₹29,800', '15', 'Regular'],
        ['Super Market', '₹25,400', '12', 'New'],
    ];

    const handleSaleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sale data submitted:', saleData);
    };

    const handlePurchaseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Purchase data submitted:', purchaseData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales & Purchases" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    {/* Quick Entry Forms */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Quick Sale Entry */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Sale Entry</h3>
                            <form onSubmit={handleSaleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Customer Name"
                                        type="text"
                                        placeholder="Customer name"
                                        value={saleData.customerName}
                                        onChange={(value) => setSaleData(prev => ({ ...prev, customerName: value }))}
                                    />
                                    <FormField
                                        label="Product"
                                        type="select"
                                        options={[
                                            { value: 'rice-1kg', label: 'Rice 1kg Packet' },
                                            { value: 'rice-5kg', label: 'Rice 5kg Packet' },
                                            { value: 'rice-10kg', label: 'Rice 10kg Packet' },
                                        ]}
                                        value={saleData.product}
                                        onChange={(value) => setSaleData(prev => ({ ...prev, product: value }))}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        value={saleData.quantity}
                                        onChange={(value) => setSaleData(prev => ({ ...prev, quantity: value }))}
                                    />
                                    <FormField
                                        label="Unit Price"
                                        type="number"
                                        placeholder="Price per unit"
                                        value={saleData.unitPrice}
                                        onChange={(value) => setSaleData(prev => ({ ...prev, unitPrice: value }))}
                                    />
                                </div>
                                <FormField
                                    label="Discount (%)"
                                    type="number"
                                    placeholder="Discount percentage"
                                    value={saleData.discount}
                                    onChange={(value) => setSaleData(prev => ({ ...prev, discount: value }))}
                                />
                                <Button 
                                    type="submit" 
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    Record Sale
                                </Button>
                            </form>
                        </div>

                        {/* Purchase Entry */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Purchase Entry</h3>
                            <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Supplier"
                                        type="text"
                                        placeholder="Supplier name"
                                        value={purchaseData.supplier}
                                        onChange={(value) => setPurchaseData(prev => ({ ...prev, supplier: value }))}
                                    />
                                    <FormField
                                        label="Product"
                                        type="select"
                                        options={[
                                            { value: 'raw-rice', label: 'Raw Rice' },
                                            { value: 'packaging', label: 'Packaging Material' },
                                            { value: 'labels', label: 'Labels' },
                                        ]}
                                        value={purchaseData.product}
                                        onChange={(value) => setPurchaseData(prev => ({ ...prev, product: value }))}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        value={purchaseData.quantity}
                                        onChange={(value) => setPurchaseData(prev => ({ ...prev, quantity: value }))}
                                    />
                                    <FormField
                                        label="Unit Cost"
                                        type="number"
                                        placeholder="Cost per unit"
                                        value={purchaseData.unitCost}
                                        onChange={(value) => setPurchaseData(prev => ({ ...prev, unitCost: value }))}
                                    />
                                </div>
                                <FormField
                                    label="Total Amount"
                                    type="number"
                                    placeholder="Total amount"
                                    value={purchaseData.totalAmount}
                                    onChange={(value) => setPurchaseData(prev => ({ ...prev, totalAmount: value }))}
                                />
                                <Button 
                                    type="submit" 
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                    Record Purchase
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <MetricCard
                            title="Today's Sales"
                            value="₹45,600"
                            change="8% from yesterday"
                            changeType="increase"
                            icon={TrendingUp}
                            iconBgColor="bg-emerald-100"
                            iconColor="text-emerald-600"
                        />
                        <MetricCard
                            title="Today's Purchases"
                            value="₹28,400"
                            change="12% from yesterday"
                            changeType="increase"
                            icon={TrendingDown}
                            iconBgColor="bg-orange-100"
                            iconColor="text-orange-600"
                        />
                        <MetricCard
                            title="Net Profit Today"
                            value="₹17,200"
                            change="5% from yesterday"
                            changeType="increase"
                            icon={DollarSign}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-800"
                        />
                    </div>

                    {/* Sales Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Top Customers</h3>
                            <DataTable
                                headers={['Customer', 'Total Sales', 'Orders', 'Type']}
                                rows={topCustomers.map(row => row.map((cell, index) => (
                                    index === 3 ? (
                                        <span 
                                            key={index}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                cell === 'Premium' 
                                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                    : cell === 'Regular'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                                            }`}
                                        >
                                            {cell}
                                        </span>
                                    ) : cell
                                )))}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Button className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 py-4 flex-col h-auto">
                                    <i className="fas fa-receipt mb-2 text-lg"></i>
                                    <span className="text-sm font-medium">Generate Invoice</span>
                                </Button>
                                <Button className="bg-blue-100 text-blue-800 hover:bg-blue-200 py-4 flex-col h-auto">
                                    <i className="fas fa-chart-bar mb-2 text-lg"></i>
                                    <span className="text-sm font-medium">Sales Report</span>
                                </Button>
                                <Button className="bg-orange-100 text-orange-800 hover:bg-orange-200 py-4 flex-col h-auto">
                                    <i className="fas fa-file-invoice mb-2 text-lg"></i>
                                    <span className="text-sm font-medium">Purchase Order</span>
                                </Button>
                                <Button className="bg-purple-100 text-purple-800 hover:bg-purple-200 py-4 flex-col h-auto">
                                    <i className="fas fa-users mb-2 text-lg"></i>
                                    <span className="text-sm font-medium">Customer List</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recent Transactions</h3>
                            <div className="flex gap-2">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                                    <i className="fas fa-filter mr-2"></i>
                                    Filter
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                                    <i className="fas fa-download mr-2"></i>
                                    Export
                                </Button>
                            </div>
                        </div>
                        <DataTable
                            headers={['Date', 'Customer/Supplier', 'Type', 'Product', 'Quantity', 'Amount', 'Status']}
                            rows={recentTransactions}
                        />
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
