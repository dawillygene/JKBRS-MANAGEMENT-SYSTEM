import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, ArrowLeft, UserPlus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Role {
  id: number;
  name: string;
  display_name: string;
  description?: string;
}

interface Office {
  id: number;
  name: string;
  office_type: string;
}

interface PageProps {
  roles: Role[];
  offices: Office[];
  auth: {
    user: any;
  };
}

export default function UserCreate() {
  const { roles, offices, auth } = usePage<PageProps>().props;

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
    office_id: '',
    employee_id: '',
    phone: '',
    hire_date: '',
    salary: '',
    employment_status: 'active',
    permissions: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Create User" />
      
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
              <p className="mt-2 text-gray-600">Add a new user to the system</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the user's basic details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee_id">Employee ID</Label>
                  <Input
                    id="employee_id"
                    value={data.employee_id}
                    onChange={(e) => setData('employee_id', e.target.value)}
                    placeholder="Enter employee ID"
                    className={errors.employee_id ? 'border-red-500' : ''}
                  />
                  {errors.employee_id && (
                    <p className="text-sm text-red-500">{errors.employee_id}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Set up login credentials for the user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Enter password"
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm Password *</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder="Confirm password"
                    className={errors.password_confirmation ? 'border-red-500' : ''}
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role and Office Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Role and Office Assignment</CardTitle>
              <CardDescription>
                Assign the user to a role and office
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role_id">Role *</Label>
                  <Select value={data.role_id} onValueChange={(value) => setData('role_id', value)}>
                    <SelectTrigger className={errors.role_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.display_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role_id && (
                    <p className="text-sm text-red-500">{errors.role_id}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office_id">Office *</Label>
                  <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                    <SelectTrigger className={errors.office_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select an office" />
                    </SelectTrigger>
                    <SelectContent>
                      {offices.map((office) => (
                        <SelectItem key={office.id} value={office.id.toString()}>
                          {office.name} ({office.office_type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.office_id && (
                    <p className="text-sm text-red-500">{errors.office_id}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>
                Set employment status and compensation details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_status">Employment Status *</Label>
                  <Select value={data.employment_status} onValueChange={(value) => setData('employment_status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                      <SelectItem value="resigned">Resigned</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employment_status && (
                    <p className="text-sm text-red-500">{errors.employment_status}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hire_date">Hire Date</Label>
                  <Input
                    id="hire_date"
                    type="date"
                    value={data.hire_date}
                    onChange={(e) => setData('hire_date', e.target.value)}
                    className={errors.hire_date ? 'border-red-500' : ''}
                  />
                  {errors.hire_date && (
                    <p className="text-sm text-red-500">{errors.hire_date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary (TZS)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={data.salary}
                    onChange={(e) => setData('salary', e.target.value)}
                    placeholder="Enter salary amount"
                    className={errors.salary ? 'border-red-500' : ''}
                  />
                  {errors.salary && (
                    <p className="text-sm text-red-500">{errors.salary}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href={route('users.index')}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
