import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard -> Factory',
        href: '/factory',
    }
];



const FactoryMain = () => {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
                    <div className="container mx-auto px-6 py-8">
                        <div id="factory-section" className="section">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Data Input Panel */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Factory Data Input</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Raw Material from Samba (Kg)</label>
                                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter quantity in Kg" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Boxes/Sachets</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="number" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Quantity" />
                                                <input type="number" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Price each" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Processed Raw Material (Kg)</label>
                                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter quantity in Kg" />
                                        </div>
                                        <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Submit Data</button>
                                    </div>
                                </div>

                                {/* Factory Status */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Factory Status</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                            <span className="font-medium">Raw Materials</span>
                                            <span className="text-blue-800 font-bold">2,450 Kg</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                                            <span className="font-medium">Processed Materials</span>
                                            <span className="text-emerald-600 font-bold">1,890 Kg</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                                            <span className="font-medium">Finished Products</span>
                                            <span className="text-orange-600 font-bold">1,245 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="font-medium">Active Workers</span>
                                            <span className="text-gray-700 font-bold">24/30</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Labor Management */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Labor Management</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Wage</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ravi Kumar</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Production Worker</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹500</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Paid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Priya Sharma</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Quality Control</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹600</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Pending</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900">Pay Now</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amit Singh</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Machine Operator</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹750</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Paid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </AppLayout>
        </>
    );
};

export default FactoryMain;