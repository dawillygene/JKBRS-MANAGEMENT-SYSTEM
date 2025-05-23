import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard -> Factory',
        href: '/factory',
    }
];

const UserManagement = () => {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
          <div className="container mx-auto px-6 py-8">
            <div id="users-section" className="section">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Administrator</option>
                      <option>Office Manager</option>
                      <option>Factory Manager</option>
                      <option>Office Staff</option>
                      <option>Sales Staff</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Add User</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Administrators */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Administrators</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">john@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Admin</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">Jane Smith</p>
                        <p className="text-sm text-gray-500">jane@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Admin</span>
                    </div>
                  </div>
                </div>

                {/* Managers */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Managers</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">Mike Johnson</p>
                        <p className="text-sm text-gray-500">mike@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Office Mgr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">David Wilson</p>
                        <p className="text-sm text-gray-500">david@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Factory Mgr</span>
                    </div>
                  </div>
                </div>

                {/* Staff */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Staff Members</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">Sarah Lee</p>
                        <p className="text-sm text-gray-500">sarah@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Sales</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">Tom Brown</p>
                        <p className="text-sm text-gray-500">tom@company.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Office</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Permissions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Role Permissions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Administrator</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Office Manager</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Factory Manager</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manage Users</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manage Sales</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Factory Operations</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-times text-red-600"></i></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">View Reports</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-check text-emerald-600"></i></td>
                        <td className="px-6 py-4 whitespace-nowrap text-center"><i className="fas fa-minus text-orange-600"></i></td>
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

export default UserManagement;