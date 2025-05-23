import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard -> AppSettings',
        href: '/app-settings',
    }
];

const AppSettings = () => {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
          <div className="container mx-auto px-6 py-8">
            <div id="settings-section" className="section">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">System Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="ABC Manufacturing" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Asia/Kolkata</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-800">
                        <span className="sr-only">Enable notifications</span>
                        <span className="inline-block w-4 h-4 transform bg-white rounded-full transition translate-x-6"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Auto Backup</span>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-800">
                        <span className="sr-only">Enable auto backup</span>
                        <span className="inline-block w-4 h-4 transform bg-white rounded-full transition translate-x-6"></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={30} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Strong (8+ chars, numbers, symbols)</option>
                        <option>Medium (6+ chars, numbers)</option>
                        <option>Basic (6+ chars)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200">
                        <span className="sr-only">Enable 2FA</span>
                        <span className="inline-block w-4 h-4 transform bg-white rounded-full transition translate-x-1"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Login Logging</span>
                      <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-800">
                        <span className="sr-only">Enable login logging</span>
                        <span className="inline-block w-4 h-4 transform bg-white rounded-full transition translate-x-6"></span>
                      </button>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">Change Password</button>
                  </div>
                </div>
              </div>

              {/* Backup & Maintenance */}
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Backup & Maintenance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-database text-blue-800 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">Database Backup</h4>
                    <p className="text-sm text-gray-500 mb-4">Last backup: 2 hours ago</p>
                    <button className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Backup Now</button>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-sync-alt text-emerald-600 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">System Update</h4>
                    <p className="text-sm text-gray-500 mb-4">Version: 2.1.5 (Latest)</p>
                    <button className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-200">Check Updates</button>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-broom text-orange-600 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">System Cleanup</h4>
                    <p className="text-sm text-gray-500 mb-4">Free up 2.3 GB space</p>
                    <button className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">Clean Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
};

export default AppSettings;