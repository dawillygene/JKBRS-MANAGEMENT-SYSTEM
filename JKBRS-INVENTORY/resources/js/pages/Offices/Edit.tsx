import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building2, MapPin, DollarSign, Users } from 'lucide-react';

interface Office {
  id: number;
  name: string;
  office_code: string;
  office_type: string;
  parent_office_id?: number;
  location: string;
  contact_phone?: string;
  contact_email?: string;
  manager_id?: number;
  budget_allocated?: number;
  budget_spent?: number;
  description?: string;
  status: 'active' | 'inactive' | 'closed';
  opening_date?: string;
  closing_date?: string;
  parentOffice?: {
    id: number;
    name: string;
  };
  manager?: {
    id: number;
    name: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  role?: {
    display_name: string;
  };
}

interface PageProps {
  office: Office;
  parentOffices: Office[];
  managers: User[];
  officeTypes: string[];
  auth: {
    user: any;
  };
}

const formatOfficeType = (type: string) => {
  return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function OfficeEdit() {
  const { office, parentOffices, managers, officeTypes, auth } = usePage<PageProps>().props;

  const { data, setData, put, processing, errors } = useForm({
    name: office.name || '',
    office_code: office.office_code || '',
    office_type: office.office_type || '',
    parent_office_id: office.parent_office_id?.toString() || '',
    location: office.location || '',
    contact_phone: office.contact_phone || '',
    contact_email: office.contact_email || '',
    manager_id: office.manager_id?.toString() || '',
    budget_allocated: office.budget_allocated?.toString() || '',
    description: office.description || '',
    status: office.status || 'active',
    opening_date: office.opening_date || '',
    closing_date: office.closing_date || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('offices.update', office.id));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Edit Office - ${office.name}`} />
      
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('offices.show', office.id)}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Office
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Office</h1>
              <p className="mt-2 text-gray-600">Update office information and settings</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Update the office's basic details and identification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Office Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter office name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office_code">Office Code *</Label>
                  <Input
                    id="office_code"
                    value={data.office_code}
                    onChange={(e) => setData('office_code', e.target.value.toUpperCase())}
                    placeholder="e.g., HQ001"
                    maxLength={10}
                    className={errors.office_code ? 'border-red-500' : ''}
                  />
                  {errors.office_code && (
                    <p className="text-sm text-red-500">{errors.office_code}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office_type">Office Type *</Label>
                  <Select value={data.office_type} onValueChange={(value) => setData('office_type', value)}>
                    <SelectTrigger className={errors.office_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select office type" />
                    </SelectTrigger>
                    <SelectContent>
                      {officeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {formatOfficeType(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.office_type && (
                    <p className="text-sm text-red-500">{errors.office_type}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent_office_id">Parent Office</Label>
                  <Select value={data.parent_office_id} onValueChange={(value) => setData('parent_office_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent office (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Parent Office</SelectItem>
                      {parentOffices.map((parentOffice) => (
                        <SelectItem key={parentOffice.id} value={parentOffice.id.toString()}>
                          {parentOffice.name} ({formatOfficeType(parentOffice.office_type)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.parent_office_id && (
                    <p className="text-sm text-red-500">{errors.parent_office_id}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-500">{errors.status}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manager_id">Office Manager</Label>
                  <Select value={data.manager_id} onValueChange={(value) => setData('manager_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select office manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Manager Assigned</SelectItem>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id.toString()}>
                          {manager.name} ({manager.role?.display_name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.manager_id && (
                    <p className="text-sm text-red-500">{errors.manager_id}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="opening_date">Opening Date</Label>
                  <Input
                    id="opening_date"
                    type="date"
                    value={data.opening_date}
                    onChange={(e) => setData('opening_date', e.target.value)}
                    className={errors.opening_date ? 'border-red-500' : ''}
                  />
                  {errors.opening_date && (
                    <p className="text-sm text-red-500">{errors.opening_date}</p>
                  )}
                </div>

                {data.status === 'closed' && (
                  <div className="space-y-2">
                    <Label htmlFor="closing_date">Closing Date</Label>
                    <Input
                      id="closing_date"
                      type="date"
                      value={data.closing_date}
                      onChange={(e) => setData('closing_date', e.target.value)}
                      className={errors.closing_date ? 'border-red-500' : ''}
                    />
                    {errors.closing_date && (
                      <p className="text-sm text-red-500">{errors.closing_date}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Enter office description"
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location & Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Contact Information
              </CardTitle>
              <CardDescription>
                Update the office location and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address *</Label>
                  <Input
                    id="location"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    placeholder="Enter office location"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={data.contact_phone}
                    onChange={(e) => setData('contact_phone', e.target.value)}
                    placeholder="+255 123 456 789"
                    className={errors.contact_phone ? 'border-red-500' : ''}
                  />
                  {errors.contact_phone && (
                    <p className="text-sm text-red-500">{errors.contact_phone}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={data.contact_email}
                    onChange={(e) => setData('contact_email', e.target.value)}
                    placeholder="office@jkbrs.co.tz"
                    className={errors.contact_email ? 'border-red-500' : ''}
                  />
                  {errors.contact_email && (
                    <p className="text-sm text-red-500">{errors.contact_email}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget Information
              </CardTitle>
              <CardDescription>
                Update the office budget allocation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_allocated">Budget Allocated (TZS)</Label>
                  <Input
                    id="budget_allocated"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.budget_allocated}
                    onChange={(e) => setData('budget_allocated', e.target.value)}
                    placeholder="0.00"
                    className={errors.budget_allocated ? 'border-red-500' : ''}
                  />
                  {errors.budget_allocated && (
                    <p className="text-sm text-red-500">{errors.budget_allocated}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Current Budget Spent</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-lg font-semibold">
                      {new Intl.NumberFormat('en-TZ', {
                        style: 'currency',
                        currency: 'TZS',
                        minimumFractionDigits: 0,
                      }).format(office.budget_spent || 0)}
                    </p>
                    <p className="text-sm text-gray-500">Read-only</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href={route('offices.show', office.id)}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Updating...' : 'Update Office'}
            </Button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
