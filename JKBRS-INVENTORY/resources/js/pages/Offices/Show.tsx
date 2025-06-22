import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Building2, MapPin, Phone, Mail, User, DollarSign, TrendingUp, Users, Edit, Settings, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Office {
  id: number;
  name: string;
  office_code: string;
  office_type: string;
  location: string;
  contact_phone?: string;
  contact_email?: string;
  status: 'active' | 'inactive' | 'closed';
  description?: string;
  opening_date?: string;
  parentOffice?: {
    id: number;
    name: string;
  };
  manager?: {
    id: number;
    name: string;
    email: string;
  };
  childOffices: Array<{
    id: number;
    name: string;
    office_type: string;
    users_count: number;
    employees_count: number;
  }>;
  users: Array<{
    id: number;
    name: string;
    email: string;
    role?: {
      display_name: string;
    };
  }>;
  employees: Array<{
    id: number;
    name: string;
    position: string;
    user?: {
      email: string;
    };
  }>;
}

interface PerformanceMetrics {
  employee_count: number;
  user_count: number;
  budget_allocated: number;
  budget_spent: number;
  budget_utilization: number;
  sales_this_month: number;
  sales_last_month: number;
  sales_growth: number;
}

interface BudgetInfo {
  allocated: number;
  spent: number;
  remaining: number;
  utilization_percentage: number;
  period: string;
  notes: string;
}

interface AssetInfo {
  total_assets: number;
  asset_value: number;
  maintenance_due: number;
  depreciation: number;
}

interface Activity {
  timestamp: string;
  action: string;
  performed_by: string;
}

interface PageProps {
  office: Office;
  performanceMetrics: PerformanceMetrics;
  budgetInfo: BudgetInfo;
  assetInfo: AssetInfo;
  recentActivity: Activity[];
  auth: {
    user: any;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'closed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatOfficeType = (type: string) => {
  return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function OfficeShow() {
  const { office, performanceMetrics, budgetInfo, assetInfo, recentActivity, auth } = usePage<PageProps>().props;

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Office - ${office.name}`} />
      
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('offices.index')}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Offices
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{office.name}</h1>
              <p className="mt-2 text-gray-600">{office.office_code} • {formatOfficeType(office.office_type)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={route('offices.edit', office.id)}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Office
              </Button>
            </Link>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Office Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Office Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Office Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{office.location}</p>
                    </div>
                  </div>
                  
                  {office.contact_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{office.contact_phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {office.contact_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{office.contact_email}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge className={getStatusColor(office.status)}>
                        {office.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {office.manager && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Manager</p>
                        <p className="font-medium">{office.manager.name}</p>
                        <p className="text-sm text-gray-500">{office.manager.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {office.parentOffice && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Parent Office</p>
                        <Link href={route('offices.show', office.parentOffice.id)} className="font-medium text-blue-600 hover:underline">
                          {office.parentOffice.name}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {office.description && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Description</p>
                    <p className="text-gray-700">{office.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600">Staff</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.employee_count}</p>
                    <p className="text-sm text-gray-500">{performanceMetrics.user_count} system users</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-600">Sales Growth</span>
                    </div>
                    <p className={`text-2xl font-bold ${performanceMetrics.sales_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {performanceMetrics.sales_growth >= 0 ? '+' : ''}{performanceMetrics.sales_growth}%
                    </p>
                    <p className="text-sm text-gray-500">vs last month</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-600">Budget Utilization</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.budget_utilization}%</p>
                    <Progress value={performanceMetrics.budget_utilization} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Child Offices */}
            {office.childOffices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Sub-Offices ({office.childOffices.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {office.childOffices.map((child) => (
                      <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <Link href={route('offices.show', child.id)} className="font-medium text-blue-600 hover:underline">
                            {child.name}
                          </Link>
                          <p className="text-sm text-gray-500">{formatOfficeType(child.office_type)}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{child.employees_count} employees</p>
                          <p>{child.users_count} users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Staff Members */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Members ({office.users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {office.users.length > 0 ? (
                  <div className="space-y-3">
                    {office.users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <Badge variant="outline">
                          {user.role?.display_name || 'No Role'}
                        </Badge>
                      </div>
                    ))}
                    {office.users.length > 5 && (
                      <p className="text-sm text-gray-500 text-center">
                        and {office.users.length - 5} more...
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No staff members assigned</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Allocated</span>
                    <span className="font-medium">{formatCurrency(budgetInfo.allocated)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Spent</span>
                    <span className="font-medium">{formatCurrency(budgetInfo.spent)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className={`font-medium ${budgetInfo.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(budgetInfo.remaining)}
                    </span>
                  </div>
                  <Progress value={budgetInfo.utilization_percentage} className="mt-3" />
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {budgetInfo.utilization_percentage}% utilized
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Budget Period</p>
                  <Badge variant="outline">{budgetInfo.period}</Badge>
                </div>
                
                {budgetInfo.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Notes</p>
                    <p className="text-sm text-gray-700">{budgetInfo.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Staff
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Update Budget
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Building2 className="w-4 h-4 mr-2" />
                  Transfer Users
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
