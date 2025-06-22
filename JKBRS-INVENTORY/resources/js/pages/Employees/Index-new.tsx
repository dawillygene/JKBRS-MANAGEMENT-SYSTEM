import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PermissionGate, AdminOnly, ManagerOnly } from '@/components/auth/PermissionGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  MoreHorizontal,
  Download,
  Upload,
  UserPlus,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  TrendingUp,
  Activity
} from 'lucide-react';

interface Employee {
  id: number;
  employee_number: string;
  user_id?: number;
  office_id: number;
  manager_id?: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  position: string;
  department: string;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
  hire_date: string;
  basic_salary: number;
  gender: 'male' | 'female';
  marital_status: 'single' | 'married' | 'divorced' | 'widowed';
  status: 'active' | 'inactive' | 'terminated' | 'resigned';
  profile_photo?: string;
  full_name: string;
  user?: any;
  office?: any;
  manager?: any;
}

interface Office {
  id: number;
  name: string;
  code: string;
}

interface EmployeeIndexProps {
  employees: {
    data: Employee[];
    total: number;
    from: number;
    to: number;
    last_page: number;
    current_page: number;
    prev_page_url?: string;
    next_page_url?: string;
  };
  offices: Office[];
  departments: string[];
  filters: {
    search?: string;
    office_id?: string;
    department?: string;
    status?: string;
  };
}

function EmployeeIndexContent({ employees, offices, departments, filters }: EmployeeIndexProps) {
  const { user, formatCurrency, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [selectedOffice, setSelectedOffice] = useState(filters?.office_id || 'all');
  const [selectedDepartment, setSelectedDepartment] = useState(filters?.department || 'all');
  const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Update states when filters prop changes
  React.useEffect(() => {
    setSearchTerm(filters?.search || '');
    setSelectedOffice(filters?.office_id || 'all');
    setSelectedDepartment(filters?.department || 'all');
    setSelectedStatus(filters?.status || 'all');
  }, [filters]);

  const handleSearch = () => {
    setLoading(true);
    router.get(route('employees.index'), {
      search: searchTerm,
      office_id: selectedOffice === 'all' ? '' : selectedOffice,
      department: selectedDepartment === 'all' ? '' : selectedDepartment,
      status: selectedStatus === 'all' ? '' : selectedStatus,
    }, {
      preserveState: true,
      replace: true,
      onFinish: () => setLoading(false),
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedOffice('all');
    setSelectedDepartment('all');
    setSelectedStatus('all');
    setLoading(true);
    router.get(route('employees.index'), {}, {
      onFinish: () => setLoading(false),
    });
  };

  const handleDelete = (employee: Employee) => {
    if (confirm(`Are you sure you want to delete ${employee.full_name}? This action cannot be undone.`)) {
      setDeleting(employee.id);
      router.delete(route('employees.destroy', employee.id), {
        onSuccess: () => {
          setDeleting(null);
        },
        onError: () => {
          setDeleting(null);
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, label: 'Active' },
      inactive: { variant: 'secondary' as const, icon: Clock, label: 'Inactive' },
      terminated: { variant: 'destructive' as const, icon: X, label: 'Terminated' },
      resigned: { variant: 'outline' as const, icon: AlertCircle, label: 'Resigned' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getEmploymentTypeBadge = (type: string) => {
    const typeConfig = {
      full_time: 'Full Time',
      part_time: 'Part Time', 
      contract: 'Contract',
      intern: 'Intern'
    };
    
    return (
      <Badge variant="outline" className="text-xs">
        {typeConfig[type as keyof typeof typeConfig] || type}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            Employee Management
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage employee records, performance, and organizational structure
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <PermissionGate permission="employees.create">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2 flex-1 sm:flex-initial">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>
              <Button size="sm" variant="outline" className="gap-2 flex-1 sm:flex-initial">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
            <Button asChild className="gap-2">
              <Link href={route('employees.create')}>
                <UserPlus className="h-4 w-4" />
                Add Employee
              </Link>
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">{employees?.total || 0}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% from last month
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-primary/5"></div>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {employees?.data?.filter(e => e.status === 'active').length || 0}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Activity className="h-3 w-3 text-green-600" />
              Currently working
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 to-green-500/5"></div>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-blue-600">{departments?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active departments
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 to-blue-500/5"></div>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Office Locations</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Building className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-purple-600">{offices?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Operating locations
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/20 to-purple-500/5"></div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            Search & Filter Employees
          </CardTitle>
          <CardDescription>
            Find employees by name, position, department, or office location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Offices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offices</SelectItem>
                  {offices?.map((office) => (
                    <SelectItem key={office.id} value={office.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        {office.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments?.map((department) => (
                    <SelectItem key={department} value={department}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-3 w-3" />
                        {department}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      Inactive
                    </div>
                  </SelectItem>
                  <SelectItem value="terminated">
                    <div className="flex items-center gap-2">
                      <X className="h-3 w-3 text-red-500" />
                      Terminated
                    </div>
                  </SelectItem>
                  <SelectItem value="resigned">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      Resigned
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex-1 sm:flex-initial gap-2"
                >
                  {loading ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  disabled={loading}
                  className="px-3"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">
            Employees ({employees?.total || 0})
          </CardTitle>
          <CardDescription>
            Manage your organization's workforce
          </CardDescription>
        </CardHeader>
        <CardContent>
          {employees?.data?.length > 0 ? (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 font-medium text-muted-foreground">Employee</th>
                        <th className="pb-3 font-medium text-muted-foreground">Position</th>
                        <th className="pb-3 font-medium text-muted-foreground">Department</th>
                        <th className="pb-3 font-medium text-muted-foreground">Office</th>
                        <th className="pb-3 font-medium text-muted-foreground">Status</th>
                        <th className="pb-3 font-medium text-muted-foreground">Type</th>
                        <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.data.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={employee.profile_photo} />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {getInitials(employee.full_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.full_name}</div>
                                <div className="text-sm text-muted-foreground">{employee.employee_number}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="font-medium">{employee.position}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{employee.department}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{employee.office?.name}</div>
                          </td>
                          <td className="py-4">
                            {getStatusBadge(employee.status)}
                          </td>
                          <td className="py-4">
                            {getEmploymentTypeBadge(employee.employment_type)}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" asChild>
                                <Link href={route('employees.show', employee.id)}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <PermissionGate permission="employees.update">
                                <Button size="sm" variant="ghost" asChild>
                                  <Link href={route('employees.edit', employee.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </PermissionGate>
                              <PermissionGate permission="employees.delete">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleDelete(employee)}
                                  disabled={deleting === employee.id}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </PermissionGate>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {employees.data.map((employee) => (
                  <Card key={employee.id} className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.profile_photo} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {getInitials(employee.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.full_name}</div>
                            <div className="text-sm text-muted-foreground">{employee.employee_number}</div>
                          </div>
                        </div>
                        {getStatusBadge(employee.status)}
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Position:</span>
                          <div className="font-medium">{employee.position}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>
                          <div className="font-medium">{employee.department}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Office:</span>
                          <div className="font-medium">{employee.office?.name}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <div className="mt-1">{getEmploymentTypeBadge(employee.employment_type)}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" asChild className="flex-1">
                          <Link href={route('employees.show', employee.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <PermissionGate permission="employees.update">
                          <Button size="sm" variant="outline" asChild className="flex-1">
                            <Link href={route('employees.edit', employee.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                        </PermissionGate>
                        <PermissionGate permission="employees.delete">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDelete(employee)}
                            disabled={deleting === employee.id}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </PermissionGate>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {employees.from || 0} to {employees.to || 0} of {employees.total} results
                </div>
                <div className="flex items-center gap-2">
                  {employees.prev_page_url && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link href={employees.prev_page_url}>
                        ← Previous
                      </Link>
                    </Button>
                  )}
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-muted-foreground">Page</span>
                    <span className="text-sm font-medium">{employees.current_page}</span>
                    <span className="text-sm text-muted-foreground">of</span>
                    <span className="text-sm font-medium">{employees.last_page}</span>
                  </div>
                  {employees.next_page_url && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link href={employees.next_page_url}>
                        Next →
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No employees found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedOffice !== 'all' || selectedDepartment !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search filters.'
                  : 'Start by adding your first employee.'}
              </p>
              <PermissionGate permission="employees.create">
                <Button asChild>
                  <Link href={route('employees.create')}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Link>
                </Button>
              </PermissionGate>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function EmployeeIndex(props: EmployeeIndexProps) {
  return (
    <AuthProvider>
      <AppLayout breadcrumbs={[{ title: 'Employee Management', href: '/employees' }]}>
        <Head title="Employee Management" />
        <EmployeeIndexContent {...props} />
      </AppLayout>
    </AuthProvider>
  );
}
