import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Users, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Office {
  id: number;
  name: string;
  office_code: string;
  office_type: string;
  location: string;
  contact_phone?: string;
  contact_email?: string;
  status: 'active' | 'inactive' | 'closed';
  budget_allocated?: number;
  budget_spent?: number;
  employee_count: number;
  user_count: number;
  child_office_count: number;
  parentOffice?: {
    id: number;
    name: string;
  };
  manager?: {
    id: number;
    name: string;
  };
  performance_metrics?: {
    budget_utilization: number;
    sales_growth: number;
  };
  created_at: string;
  updated_at: string;
}

interface PageProps {
  offices: {
    data: Office[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  parentOffices: Office[];
  officeTypes: string[];
  filters: {
    search?: string;
    office_type?: string;
    parent_office_id?: string;
    status?: string;
  };
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

const formatCurrency = (amount: number | undefined) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatOfficeType = (type: string) => {
  return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function OfficesIndex() {
  const { offices, parentOffices, officeTypes, filters, auth } = usePage<PageProps>().props;
  const [selectedOffices, setSelectedOffices] = useState<number[]>([]);

  const { data, setData, get, processing } = useForm({
    search: filters.search || '',
    office_type: filters.office_type || '',
    parent_office_id: filters.parent_office_id || '',
    status: filters.status || '',
  });

  const handleFilter = () => {
    get(route('offices.index'), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSelectOffice = (officeId: number) => {
    setSelectedOffices(prev => 
      prev.includes(officeId) 
        ? prev.filter(id => id !== officeId)
        : [...prev, officeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOffices.length === offices.data.length) {
      setSelectedOffices([]);
    } else {
      setSelectedOffices(offices.data.map(office => office.id));
    }
  };

  // Calculate overall statistics
  const totalEmployees = offices.data.reduce((sum, office) => sum + office.employee_count, 0);
  const totalUsers = offices.data.reduce((sum, office) => sum + office.user_count, 0);
  const totalBudget = offices.data.reduce((sum, office) => sum + (office.budget_allocated || 0), 0);
  const totalSpent = offices.data.reduce((sum, office) => sum + (office.budget_spent || 0), 0);

  const stats = [
    {
      title: 'Total Offices',
      value: offices.total.toString(),
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Employees',
      value: totalEmployees.toString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Offices',
      value: offices.data.filter(o => o.status === 'active').length.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Budget',
      value: formatCurrency(totalBudget).replace('TZS', 'TZS'),
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Office Management" />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Office Management</h1>
            <p className="mt-2 text-gray-600">Manage office locations, budgets, and hierarchy</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={route('offices.hierarchy')}>
              <Button variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                View Hierarchy
              </Button>
            </Link>
            <Link href={route('offices.create')}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Office
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search offices..."
                  value={data.search}
                  onChange={(e) => setData('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={data.office_type} onValueChange={(value) => setData('office_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Office type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {officeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatOfficeType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={data.parent_office_id} onValueChange={(value) => setData('parent_office_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Parent office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Offices</SelectItem>
                  {parentOffices.map((office) => (
                    <SelectItem key={office.id} value={office.id.toString()}>
                      {office.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleFilter} disabled={processing}>
                <Search className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Offices ({offices.total})</CardTitle>
            {selectedOffices.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedOffices.length} office(s) selected
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOffices.length === offices.data.length && offices.data.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Office Details</TableHead>
                  <TableHead>Type & Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offices.data.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOffices.includes(office.id)}
                        onCheckedChange={() => handleSelectOffice(office.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{office.name}</div>
                        <div className="text-sm text-gray-500">Code: {office.office_code}</div>
                        {office.parentOffice && (
                          <div className="text-xs text-gray-400">
                            Parent: {office.parentOffice.name}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">
                          {formatOfficeType(office.office_type)}
                        </Badge>
                        <Badge className={getStatusColor(office.status)}>
                          {office.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{office.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{office.employee_count} employees</div>
                        <div className="text-gray-500">{office.user_count} users</div>
                        {office.child_office_count > 0 && (
                          <div className="text-gray-500">{office.child_office_count} sub-offices</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(office.budget_allocated)}</div>
                        <div className="text-gray-500">Spent: {formatCurrency(office.budget_spent)}</div>
                        {office.performance_metrics && (
                          <div className="text-xs text-green-600">
                            {office.performance_metrics.budget_utilization}% utilized
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {office.performance_metrics && (
                        <div className="text-sm">
                          <div className={`font-medium ${office.performance_metrics.sales_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {office.performance_metrics.sales_growth >= 0 ? '+' : ''}{office.performance_metrics.sales_growth}%
                          </div>
                          <div className="text-gray-500">growth</div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={route('offices.show', office.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={route('offices.edit', office.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Office
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this office?')) {
                                // Handle delete
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Office
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {offices.data.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No offices found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {offices.last_page > 1 && (
          <div className="flex justify-center">
            {/* Add pagination component here when available */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {offices.current_page} of {offices.last_page}
              </span>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
