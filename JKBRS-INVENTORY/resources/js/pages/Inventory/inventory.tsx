import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard -> Factory',
        href: '/factory',
    }
];


const Inventory = () => {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
                    <div className="container mx-auto px-6 py-8">
                        <div id="inventory-section" className="section">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Factory Inventory */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Factory Inventory</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                            <span className="text-sm font-medium">Raw Materials</span>
                                            <span className="text-blue-800 font-bold">2,450 Kg</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                                            <span className="text-sm font-medium">Processed</span>
                                            <span className="text-emerald-600 font-bold">1,890 Kg</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                                            <span className="text-sm font-medium">Finished Products</span>
                                            <span className="text-orange-600 font-bold">1,245 Units</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Distribution Centers */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribution Centers</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Center A</span>
                                            <span className="text-gray-700 font-bold">320 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Center B</span>
                                            <span className="text-gray-700 font-bold">280 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Center C</span>
                                            <span className="text-gray-700 font-bold">195 Units</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Retail Shops */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Retail Shops</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Shop 1</span>
                                            <span className="text-gray-700 font-bold">85 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Shop 2</span>
                                            <span className="text-gray-700 font-bold">120 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">Shop 3</span>
                                            <span className="text-gray-700 font-bold">95 Units</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Movement Table */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Inventory Movements</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Factory</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Office</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finished Product</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">150 Units</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Office</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Center A</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finished Product</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">80 Units</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">In Transit</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-14</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Center B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Shop 2</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finished Product</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50 Units</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Completed</span>
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

export default Inventory;