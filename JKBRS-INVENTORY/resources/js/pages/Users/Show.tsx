import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, DollarSign, Edit, Settings, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface User {
  id: number;
  name: string;
  email: string;
  employee_id?: string;
  phone?: string;
  employment_status: 'active' | 'inactive' | 'terminated' | 'resigned';
  hire_date?: string;
  salary?: number;
  role?: {
    id: number;
    name: string;
    display_name: string;
  };
  office?: {
    id: number;
    name: string;
    office_type: string;
  };
  created_at: string;
  updated_at: string;
}

interface Activity {
  timestamp: string;
  action: string;
  performed_by: string;
}

interface PageProps {
  user: User;
  recentActivity: Activity[];
  auth: {
    user: User;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'terminated':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'resigned':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number | undefined) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function UserShow() {
  const { user, recentActivity, auth } = usePage<PageProps>().props;

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`User - ${user.name}`} />
      
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('users.index')}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Users
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="mt-2 text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={route('users.edit', user.id)}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit User
              </Button>
            </Link>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Manage Permissions
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.employee_id && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Employee ID</p>
                        <p className="font-medium">{user.employee_id}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(user.employment_status)}>
                      {user.employment_status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role and Office */}
            <Card>
              <CardHeader>
                <CardTitle>Role and Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Role</p>
                    <Badge variant="outline" className="text-sm">
                      {user.role?.display_name || 'No Role Assigned'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <p className="font-medium">{user.office?.name || 'No Office Assigned'}</p>
                      {user.office && (
                        <p className="text-sm text-gray-500 capitalize">{user.office.office_type}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.hire_date && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Hire Date</p>
                        <p className="font-medium">{new Date(user.hire_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{formatCurrency(user.salary)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Transfer Office
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start" size="sm">
                  Deactivate User
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 capitalize">
                            {activity.action.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-gray-500">
                            by {activity.performed_by}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {recentActivity.length > 5 && (
                      <Button variant="link" className="text-sm p-0">
                        View all activity
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent activity</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
