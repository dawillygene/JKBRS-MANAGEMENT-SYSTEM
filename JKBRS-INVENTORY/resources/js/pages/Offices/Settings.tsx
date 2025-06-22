import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Building, 
  Users, 
  Shield, 
  Bell, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Save,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface OfficeSettings {
  general: {
    name: string;
    office_type: string;
    description: string;
    capacity: number;
    operating_hours: {
      start: string;
      end: string;
      days: string[];
    };
  };
  contact: {
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  permissions: {
    can_manage_budget: boolean;
    can_transfer_staff: boolean;
    can_create_sub_offices: boolean;
    requires_approval_for_transfers: boolean;
    budget_approval_limit: number;
  };
  notifications: {
    budget_alerts: boolean;
    staff_notifications: boolean;
    performance_reports: boolean;
    maintenance_reminders: boolean;
    email_frequency: string;
  };
  workflow: {
    auto_assign_assets: boolean;
    require_manager_approval: boolean;
    default_budget_allocation_method: string;
    asset_depreciation_rate: number;
  };
}

interface Office {
  id: number;
  name: string;
  office_type: string;
  settings: OfficeSettings;
}

interface SettingsProps {
  office: Office;
  office_types: string[];
  parent_offices: { id: number; name: string }[];
}

const OfficeSettings: React.FC<SettingsProps> = ({ 
  office, 
  office_types, 
  parent_offices 
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // General settings form
  const generalForm = useForm({
    name: office.settings.general.name,
    office_type: office.settings.general.office_type,
    description: office.settings.general.description,
    capacity: office.settings.general.capacity.toString(),
    operating_hours_start: office.settings.general.operating_hours.start,
    operating_hours_end: office.settings.general.operating_hours.end,
    operating_days: office.settings.general.operating_hours.days,
  });

  // Contact settings form
  const contactForm = useForm({
    phone: office.settings.contact.phone,
    email: office.settings.contact.email,
    street: office.settings.contact.address.street,
    city: office.settings.contact.address.city,
    state: office.settings.contact.address.state,
    zip: office.settings.contact.address.zip,
    country: office.settings.contact.address.country,
  });

  // Permissions settings form
  const permissionsForm = useForm({
    can_manage_budget: office.settings.permissions.can_manage_budget,
    can_transfer_staff: office.settings.permissions.can_transfer_staff,
    can_create_sub_offices: office.settings.permissions.can_create_sub_offices,
    requires_approval_for_transfers: office.settings.permissions.requires_approval_for_transfers,
    budget_approval_limit: office.settings.permissions.budget_approval_limit.toString(),
  });

  // Notifications settings form
  const notificationsForm = useForm({
    budget_alerts: office.settings.notifications.budget_alerts,
    staff_notifications: office.settings.notifications.staff_notifications,
    performance_reports: office.settings.notifications.performance_reports,
    maintenance_reminders: office.settings.notifications.maintenance_reminders,
    email_frequency: office.settings.notifications.email_frequency,
  });

  // Workflow settings form
  const workflowForm = useForm({
    auto_assign_assets: office.settings.workflow.auto_assign_assets,
    require_manager_approval: office.settings.workflow.require_manager_approval,
    default_budget_allocation_method: office.settings.workflow.default_budget_allocation_method,
    asset_depreciation_rate: office.settings.workflow.asset_depreciation_rate.toString(),
  });

  const handleSaveSettings = (formType: string) => {
    let form;
    let endpoint = `/offices/${office.id}/settings`;

    switch (formType) {
      case 'general':
        form = generalForm;
        break;
      case 'contact':
        form = contactForm;
        break;
      case 'permissions':
        form = permissionsForm;
        break;
      case 'notifications':
        form = notificationsForm;
        break;
      case 'workflow':
        form = workflowForm;
        break;
      default:
        return;
    }

    form.put(endpoint, {
      onSuccess: () => {
        setHasUnsavedChanges(false);
      }
    });
  };

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <>
      <Head title={`Settings - ${office.name}`} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Office Settings</h1>
            <p className="text-gray-600 mt-2">{office.name}</p>
          </div>
          <div className="flex space-x-2">
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={() => router.visit(`/offices/${office.id}`)}
            >
              <X className="h-4 w-4 mr-2" />
              Back to Office
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Workflow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Office Name</Label>
                    <Input
                      id="name"
                      value={generalForm.data.name}
                      onChange={(e) => {
                        generalForm.setData('name', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      className={generalForm.errors.name ? 'border-red-500' : ''}
                    />
                    {generalForm.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{generalForm.errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="office_type">Office Type</Label>
                    <Select 
                      value={generalForm.data.office_type} 
                      onValueChange={(value) => {
                        generalForm.setData('office_type', value);
                        setHasUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {office_types.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={generalForm.data.description}
                    onChange={(e) => {
                      generalForm.setData('description', e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    rows={3}
                    placeholder="Office description..."
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={generalForm.data.capacity}
                    onChange={(e) => {
                      generalForm.setData('capacity', e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Maximum staff capacity"
                    className={generalForm.errors.capacity ? 'border-red-500' : ''}
                  />
                  {generalForm.errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">{generalForm.errors.capacity}</p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    Operating Hours
                  </Label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="start_time">Start Time</Label>
                      <Input
                        id="start_time"
                        type="time"
                        value={generalForm.data.operating_hours_start}
                        onChange={(e) => {
                          generalForm.setData('operating_hours_start', e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_time">End Time</Label>
                      <Input
                        id="end_time"
                        type="time"
                        value={generalForm.data.operating_hours_end}
                        onChange={(e) => {
                          generalForm.setData('operating_hours_end', e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Operating Days</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {weekDays.map(day => (
                        <Badge
                          key={day}
                          variant={generalForm.data.operating_days.includes(day) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const days = generalForm.data.operating_days.includes(day)
                              ? generalForm.data.operating_days.filter(d => d !== day)
                              : [...generalForm.data.operating_days, day];
                            generalForm.setData('operating_days', days);
                            setHasUnsavedChanges(true);
                          }}
                        >
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('general')}
                  disabled={generalForm.processing}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {generalForm.processing ? 'Saving...' : 'Save General Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={contactForm.data.phone}
                      onChange={(e) => {
                        contactForm.setData('phone', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.data.email}
                      onChange={(e) => {
                        contactForm.setData('email', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="office@company.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={contactForm.data.street}
                    onChange={(e) => {
                      contactForm.setData('street', e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={contactForm.data.city}
                      onChange={(e) => {
                        contactForm.setData('city', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={contactForm.data.state}
                      onChange={(e) => {
                        contactForm.setData('state', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={contactForm.data.zip}
                      onChange={(e) => {
                        contactForm.setData('zip', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={contactForm.data.country}
                      onChange={(e) => {
                        contactForm.setData('country', e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="United States"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('contact')}
                  disabled={contactForm.processing}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {contactForm.processing ? 'Saving...' : 'Save Contact Information'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Permissions & Access Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Budget Management</h4>
                      <p className="text-sm text-gray-600">Allow this office to manage its own budget</p>
                    </div>
                    <Switch
                      checked={permissionsForm.data.can_manage_budget}
                      onCheckedChange={(checked) => {
                        permissionsForm.setData('can_manage_budget', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Staff Transfers</h4>
                      <p className="text-sm text-gray-600">Allow transferring staff to/from this office</p>
                    </div>
                    <Switch
                      checked={permissionsForm.data.can_transfer_staff}
                      onCheckedChange={(checked) => {
                        permissionsForm.setData('can_transfer_staff', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Create Sub-Offices</h4>
                      <p className="text-sm text-gray-600">Allow creating new sub-offices under this office</p>
                    </div>
                    <Switch
                      checked={permissionsForm.data.can_create_sub_offices}
                      onCheckedChange={(checked) => {
                        permissionsForm.setData('can_create_sub_offices', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Require Transfer Approval</h4>
                      <p className="text-sm text-gray-600">Require manager approval for staff transfers</p>
                    </div>
                    <Switch
                      checked={permissionsForm.data.requires_approval_for_transfers}
                      onCheckedChange={(checked) => {
                        permissionsForm.setData('requires_approval_for_transfers', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget_approval_limit">Budget Approval Limit</Label>
                  <Input
                    id="budget_approval_limit"
                    type="number"
                    value={permissionsForm.data.budget_approval_limit}
                    onChange={(e) => {
                      permissionsForm.setData('budget_approval_limit', e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Maximum budget amount that can be approved"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Maximum amount this office can approve without escalation
                  </p>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('permissions')}
                  disabled={permissionsForm.processing}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {permissionsForm.processing ? 'Saving...' : 'Save Permissions'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Budget Alerts</h4>
                      <p className="text-sm text-gray-600">Receive notifications about budget changes and limits</p>
                    </div>
                    <Switch
                      checked={notificationsForm.data.budget_alerts}
                      onCheckedChange={(checked) => {
                        notificationsForm.setData('budget_alerts', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Staff Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications about staff changes and transfers</p>
                    </div>
                    <Switch
                      checked={notificationsForm.data.staff_notifications}
                      onCheckedChange={(checked) => {
                        notificationsForm.setData('staff_notifications', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Performance Reports</h4>
                      <p className="text-sm text-gray-600">Receive regular performance and analytics reports</p>
                    </div>
                    <Switch
                      checked={notificationsForm.data.performance_reports}
                      onCheckedChange={(checked) => {
                        notificationsForm.setData('performance_reports', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Maintenance Reminders</h4>
                      <p className="text-sm text-gray-600">Receive reminders about asset maintenance and warranties</p>
                    </div>
                    <Switch
                      checked={notificationsForm.data.maintenance_reminders}
                      onCheckedChange={(checked) => {
                        notificationsForm.setData('maintenance_reminders', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email_frequency">Email Frequency</Label>
                  <Select 
                    value={notificationsForm.data.email_frequency} 
                    onValueChange={(value) => {
                      notificationsForm.setData('email_frequency', value);
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="monthly">Monthly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('notifications')}
                  disabled={notificationsForm.processing}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {notificationsForm.processing ? 'Saving...' : 'Save Notification Preferences'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Workflow Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Auto-Assign Assets</h4>
                      <p className="text-sm text-gray-600">Automatically assign assets to new staff members</p>
                    </div>
                    <Switch
                      checked={workflowForm.data.auto_assign_assets}
                      onCheckedChange={(checked) => {
                        workflowForm.setData('auto_assign_assets', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Require Manager Approval</h4>
                      <p className="text-sm text-gray-600">Require manager approval for certain actions</p>
                    </div>
                    <Switch
                      checked={workflowForm.data.require_manager_approval}
                      onCheckedChange={(checked) => {
                        workflowForm.setData('require_manager_approval', checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget_allocation_method">Default Budget Allocation Method</Label>
                  <Select 
                    value={workflowForm.data.default_budget_allocation_method} 
                    onValueChange={(value) => {
                      workflowForm.setData('default_budget_allocation_method', value);
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equal">Equal Distribution</SelectItem>
                      <SelectItem value="performance">Performance Based</SelectItem>
                      <SelectItem value="staff_count">Staff Count Based</SelectItem>
                      <SelectItem value="manual">Manual Allocation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="depreciation_rate">Asset Depreciation Rate (%)</Label>
                  <Input
                    id="depreciation_rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={workflowForm.data.asset_depreciation_rate}
                    onChange={(e) => {
                      workflowForm.setData('asset_depreciation_rate', e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Annual depreciation rate"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Annual depreciation rate for asset valuation
                  </p>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('workflow')}
                  disabled={workflowForm.processing}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {workflowForm.processing ? 'Saving...' : 'Save Workflow Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default OfficeSettings;
