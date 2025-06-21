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
        title: 'Factory Management',
        href: '/factory',
    }
];

export default function FactoryMain() {
    const [formData, setFormData] = useState({
        rawMaterial: '',
        boxQuantity: '',
        boxPrice: '',
        processedMaterial: ''
    });

    const laborData = [
        ['Rajesh Kumar', 'Production Supervisor', '₹800', 'Active'],
        ['Priya Sharma', 'Quality Controller', '₹650', 'Active'],
        ['Amit Singh', 'Machine Operator', '₹500', 'Active'],
        ['Sita Devi', 'Packaging Staff', '₹400', 'On Leave'],
        ['Ravi Patel', 'Maintenance', '₹550', 'Active'],
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Factory data submitted:', formData);
        // Handle form submission
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Factory Management" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 custom-scrollbar">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Data Input Panel */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Factory Data Input</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormField
                                    label="Raw Material from Samba (Kg)"
                                    type="number"
                                    placeholder="Enter quantity in Kg"
                                    value={formData.rawMaterial}
                                    onChange={(value) => handleInputChange('rawMaterial', value)}
                                />
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Boxes/Sachets
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <FormField
                                            label=""
                                            type="number"
                                            placeholder="Quantity"
                                            value={formData.boxQuantity}
                                            onChange={(value) => handleInputChange('boxQuantity', value)}
                                        />
                                        <FormField
                                            label=""
                                            type="number"
                                            placeholder="Price each"
                                            value={formData.boxPrice}
                                            onChange={(value) => handleInputChange('boxPrice', value)}
                                        />
                                    </div>
                                </div>

                                <FormField
                                    label="Processed Raw Material (Kg)"
                                    type="number"
                                    placeholder="Enter quantity in Kg"
                                    value={formData.processedMaterial}
                                    onChange={(value) => handleInputChange('processedMaterial', value)}
                                />

                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white"
                                >
                                    Submit Data
                                </Button>
                            </form>
                        </div>

                        {/* Factory Status */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Current Factory Status</h3>
                            <div className="space-y-4">
                                <StatusCard
                                    title="Raw Materials"
                                    value="2,450 Kg"
                                    bgColor="bg-blue-50"
                                    textColor="text-blue-800"
                                />
                                <StatusCard
                                    title="Processed Materials"
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
                                <StatusCard
                                    title="Active Workers"
                                    value="24/30"
                                    bgColor="bg-gray-50"
                                    textColor="text-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Production Progress */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Today's Production Progress</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-wheat text-blue-800 dark:text-blue-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Raw Material Processing</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">75% Complete</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-cogs text-emerald-600 dark:text-emerald-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Manufacturing</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">60% Complete</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-box text-orange-600 dark:text-orange-200 text-2xl"></i>
                                </div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Packaging</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">45% Complete</p>
                            </div>
                        </div>
                    </div>

                    {/* Labor Management */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Labor Management</h3>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <i className="fas fa-plus mr-2"></i>
                                Add Worker
                            </Button>
                        </div>
                        <DataTable
                            headers={['Name', 'Role', 'Daily Wage', 'Status']}
                            rows={laborData.map(row => row.map((cell, index) => (
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
