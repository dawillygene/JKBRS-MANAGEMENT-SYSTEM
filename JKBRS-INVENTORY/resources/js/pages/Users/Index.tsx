import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Users, UserPlus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, UserCheck, UserX, ArrowRightLeft } from 'lucide-react';
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
import { Pagination } from '@/components/ui/pagination';

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

interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface Office {
  id: number;
  name: string;
  office_type: string;
}

interface PageProps {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  roles: Role[];
  offices: Office[];
  filters: {
    search?: string;
    role_id?: string;
    office_id?: string;
    employment_status?: string;
  };
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

export default function UsersIndex() {
  const { users, roles, offices, filters, auth } = usePage<PageProps>().props;
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const { data, setData, get, processing } = useForm({
    search: filters.search || '',
    role_id: filters.role_id || '',
    office_id: filters.office_id || '',
    employment_status: filters.employment_status || '',
  });

  const { post } = useForm({
    action: '',
    user_ids: [] as number[],
    office_id: '',
  });

  const handleFilter = () => {
    get(route('users.index'), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.data.map(user => user.id));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedUsers.length === 0) return;

    const formData = {
      action: bulkAction,
      user_ids: selectedUsers,
      office_id: bulkAction === 'transfer' ? data.office_id : '',
    };

    post(route('users.bulk-action'), {
      data: formData,
      onSuccess: () => {
        setSelectedUsers([]);
        setBulkAction('');
        setShowBulkActions(false);
      },
    });
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.total.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Users',
      value: users.data.filter(u => u.employment_status === 'active').length.toString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Inactive Users',
      value: users.data.filter(u => u.employment_status === 'inactive').length.toString(),
      icon: UserX,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Terminated',
      value: users.data.filter(u => u.employment_status === 'terminated').length.toString(),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="User Management" />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="mt-2 text-gray-600">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={route('users.create')}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
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
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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
                  placeholder="Search users..."
                  value={data.search}
                  onChange={(e) => setData('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={data.role_id} onValueChange={(value) => setData('role_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Offices</SelectItem>
                  {offices.map((office) => (
                    <SelectItem key={office.id} value={office.id.toString()}>
                      {office.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={data.employment_status} onValueChange={(value) => setData('employment_status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                  <SelectItem value="resigned">Resigned</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleFilter} disabled={processing}>
                <Search className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedUsers.length} user(s) selected
                  </span>
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Bulk action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activate">Activate</SelectItem>
                      <SelectItem value="deactivate">Deactivate</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                  </Select>
                  {bulkAction === 'transfer' && (
                    <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select office" />
                      </SelectTrigger>
                      <SelectContent>
                        {offices.map((office) => (
                          <SelectItem key={office.id} value={office.id.toString()}>
                            {office.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleBulkAction}
                    disabled={!bulkAction || (bulkAction === 'transfer' && !data.office_id)}
                    size="sm"
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUsers([])}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.total})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === users.data.length && users.data.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Office</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.employee_id && (
                          <div className="text-xs text-gray-400">ID: {user.employee_id}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.role?.display_name || 'No Role'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.office?.name || 'No Office'}</div>
                        <div className="text-sm text-gray-500 capitalize">
                          {user.office?.office_type}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.employment_status)}>
                        {user.employment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(user.salary)}</TableCell>
                    <TableCell>
                      {user.hire_date ? new Date(user.hire_date).toLocaleDateString() : 'N/A'}
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
                            <Link href={route('users.show', user.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={route('users.edit', user.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this user?')) {
                                // Handle delete
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {users.data.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {users.last_page > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={users.current_page}
              totalPages={users.last_page}
              onPageChange={(page) => {
                get(route('users.index', { ...filters, page }), {
                  preserveState: true,
                  preserveScroll: true,
                });
              }}
            />
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
