import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { StatusCard } from '@/components/ui/StatusCard';
import { DataTable } from '@/components/ui/DataTable';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Main Office',
        href: '/office',
    }
];

export default function Office() {
    const [productData, setProductData] = useState({
        quantity: '',
        description: '',
        estimatedPrice: ''
    });

    const [salesData, setSalesData] = useState({
        customerName: '',
        quantity: '',
        unitPrice: '',
        discount: ''
    });

    const [expenseData, setExpenseData] = useState({
        category: '',
        amount: '',
        description: ''
    });

    const employeeData = [
        ['John Doe', 'Manager', '₹25,000', 'Active'],
        ['Jane Smith', 'Sales Executive', '₹18,000', 'Active'],
        ['Rahul Kumar', 'Accountant', '₹20,000', 'Active'],
        ['Priya Singh', 'Customer Service', '₹15,000', 'On Leave'],
    ];

    const handleProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Product data submitted:', productData);
    };

    const handleSalesSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sales data submitted:', salesData);
    };

    const handleExpenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Expense data submitted:', expenseData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Main Office" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Product Reception */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Receive Products from Factory</h3>
                            <form onSubmit={handleProductSubmit} className="space-y-4">
                                <FormField
                                    label="Product Quantity"
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={productData.quantity}
                                    onChange={(value) => setProductData(prev => ({ ...prev, quantity: value }))}
                                />
                                <FormField
                                    label="Product Description"
                                    type="textarea"
                                    placeholder="Enter product description"
                                    value={productData.description}
                                    onChange={(value) => setProductData(prev => ({ ...prev, description: value }))}
                                />
                                <FormField
                                    label="Estimated Price"
                                    type="number"
                                    placeholder="Enter estimated price"
                                    value={productData.estimatedPrice}
                                    onChange={(value) => setProductData(prev => ({ ...prev, estimatedPrice: value }))}
                                />
                                <Button 
                                    type="submit" 
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    Receive Products
                                </Button>
                            </form>
                        </div>

                        {/* Sales Management */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales Management</h3>
                            <form onSubmit={handleSalesSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Customer Name"
                                        type="text"
                                        placeholder="Customer name"
                                        value={salesData.customerName}
                                        onChange={(value) => setSalesData(prev => ({ ...prev, customerName: value }))}
                                    />
                                    <FormField
                                        label="Quantity Sold"
                                        type="number"
                                        placeholder="Quantity"
                                        value={salesData.quantity}
                                        onChange={(value) => setSalesData(prev => ({ ...prev, quantity: value }))}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Unit Price"
                                        type="number"
                                        placeholder="Price per unit"
                                        value={salesData.unitPrice}
                                        onChange={(value) => setSalesData(prev => ({ ...prev, unitPrice: value }))}
                                    />
                                    <FormField
                                        label="Discount (%)"
                                        type="number"
                                        placeholder="Discount"
                                        value={salesData.discount}
                                        onChange={(value) => setSalesData(prev => ({ ...prev, discount: value }))}
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                    Record Sale
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Office Stock Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <StatusCard
                            title="Available Stock"
                            value="1,280 Units"
                            bgColor="bg-blue-50"
                            textColor="text-blue-800"
                        />
                        <StatusCard
                            title="Reserved Stock"
                            value="145 Units"
                            bgColor="bg-yellow-50"
                            textColor="text-yellow-600"
                        />
                        <StatusCard
                            title="Today's Sales"
                            value="₹45,600"
                            bgColor="bg-emerald-50"
                            textColor="text-emerald-600"
                        />
                        <StatusCard
                            title="Pending Orders"
                            value="23"
                            bgColor="bg-orange-50"
                            textColor="text-orange-600"
                        />
                    </div>

                    {/* Office Expenses */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Office Expenses</h3>
                        <form onSubmit={handleExpenseSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <FormField
                                label="Expense Category"
                                type="select"
                                placeholder="Select category"
                                options={[
                                    { value: 'utilities', label: 'Utilities' },
                                    { value: 'rent', label: 'Rent' },
                                    { value: 'marketing', label: 'Marketing' },
                                    { value: 'transportation', label: 'Transportation' },
                                    { value: 'office-supplies', label: 'Office Supplies' },
                                ]}
                                value={expenseData.category}
                                onChange={(value) => setExpenseData(prev => ({ ...prev, category: value }))}
                            />
                            <FormField
                                label="Amount"
                                type="number"
                                placeholder="Enter amount"
                                value={expenseData.amount}
                                onChange={(value) => setExpenseData(prev => ({ ...prev, amount: value }))}
                            />
                            <FormField
                                label="Description"
                                type="text"
                                placeholder="Brief description"
                                value={expenseData.description}
                                onChange={(value) => setExpenseData(prev => ({ ...prev, description: value }))}
                            />
                        </form>
                        <Button 
                            type="submit" 
                            className="bg-blue-800 hover:bg-blue-700 text-white"
                            onClick={handleExpenseSubmit}
                        >
                            Add Expense
                        </Button>
                    </div>

                    {/* Recent Sales Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Sales</h3>
                        <DataTable
                            headers={['Date', 'Customer', 'Product', 'Quantity', 'Amount', 'Status']}
                            rows={[
                                ['2025-06-22', 'ABC Store', 'Rice Packets', '50', '₹12,500', <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Completed</span>],
                                ['2025-06-22', 'XYZ Mart', 'Rice Packets', '30', '₹7,500', <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>],
                                ['2025-06-21', 'Local Store', 'Rice Packets', '75', '₹18,750', <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Completed</span>],
                            ]}
                        />
                    </div>

                    {/* Employee List */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Office Employees</h3>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <i className="fas fa-plus mr-2"></i>
                                Add Employee
                            </Button>
                        </div>
                        <DataTable
                            headers={['Name', 'Position', 'Salary', 'Status']}
                            rows={employeeData.map(row => row.map((cell, index) => (
                                index === 3 ? (
                                    <span 
                                        key={index}
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            cell === 'Active' 
                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
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
