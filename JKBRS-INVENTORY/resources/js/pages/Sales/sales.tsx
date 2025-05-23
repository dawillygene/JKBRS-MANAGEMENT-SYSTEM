import React from 'react'
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard -> Sales', href: '/dashboard/sales' }
];

const Sales = () => {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
        <div className="container mx-auto px-6 py-8">
          <div id="sales-section" className="section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Quick Sale */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Sale Entry</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Product</option>
                        <option>Product A - 500g</option>
                        <option>Product B - 1kg</option>
                        <option>Product C - 250g</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Quantity" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Price per unit" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Customer name" />
                    </div>
                  </div>
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-200">Record Sale</button>
                </div>
              </div>

              {/* Purchase Entry */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Purchase Entry</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Supplier name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Item description" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Quantity" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Cost</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Total amount" />
                    </div>
                  </div>
                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">Record Purchase</button>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer/Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Sale</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ABC Retailers</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Product A - 500g</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹12,500</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Purchase</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Raw Material Co.</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Samba Raw Material</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500 Kg</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹25,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Today's Sales</h4>
                <div className="text-3xl font-bold text-emerald-600">₹45,600</div>
                <p className="text-sm text-gray-500 mt-2">+8% from yesterday</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Today's Purchases</h4>
                <div className="text-3xl font-bold text-orange-600">₹28,400</div>
                <p className="text-sm text-gray-500 mt-2">+12% from yesterday</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Net Profit Today</h4>
                <div className="text-3xl font-bold text-blue-800">₹17,200</div>
                <p className="text-sm text-gray-500 mt-2">+5% from yesterday</p>
              </div>
            </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
};

export default Sales;