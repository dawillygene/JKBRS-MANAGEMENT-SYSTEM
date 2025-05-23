import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    }
];

const Reports = () => {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
          <div className="container mx-auto px-6 py-8">
            <div id="reports-section" className="section">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Report Generator */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Generate Report</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Sales Report</option>
                        <option>Inventory Report</option>
                        <option>Financial Report</option>
                        <option>Production Report</option>
                        <option>Employee Report</option>
                        <option>Expense Report</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Generate Report</button>
                  </div>
                </div>

                {/* Quick Reports */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Reports</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-emerald-100 text-emerald-800 py-3 px-4 rounded-lg hover:bg-emerald-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-chart-line mb-2 text-lg block"></i>
                      Daily Sales
                    </button>
                    <button className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg hover:bg-blue-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-boxes mb-2 text-lg block"></i>
                      Current Stock
                    </button>
                    <button className="bg-orange-100 text-orange-800 py-3 px-4 rounded-lg hover:bg-orange-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-industry mb-2 text-lg block"></i>
                      Production
                    </button>
                    <button className="bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-users mb-2 text-lg block"></i>
                      Employee
                    </button>
                    <button className="bg-purple-100 text-purple-800 py-3 px-4 rounded-lg hover:bg-purple-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-wallet mb-2 text-lg block"></i>
                      Expenses
                    </button>
                    <button className="bg-yellow-100 text-yellow-800 py-3 px-4 rounded-lg hover:bg-yellow-200 transition duration-200 text-sm font-medium">
                      <i className="fas fa-coins mb-2 text-lg block"></i>
                      Profit/Loss
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Reports</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Sales Analysis</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sales Report</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1-31, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Download</button>
                          <button className="text-emerald-600 hover:text-emerald-900">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory Status</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Inventory Report</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Current</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mike Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Download</button>
                          <button className="text-emerald-600 hover:text-emerald-900">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Production Summary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Production Report</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1-15, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">David Wilson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 days ago</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Download</button>
                          <button className="text-emerald-600 hover:text-emerald-900">View</button>
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

export default Reports;