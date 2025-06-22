import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Monitor,
  Printer,
  Laptop,
  Smartphone,
  Archive,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface Asset {
  id: number;
  name: string;
  asset_type: string;
  serial_number: string;
  purchase_date: string;
  purchase_cost: number;
  current_value: number;
  status: 'active' | 'maintenance' | 'retired' | 'missing';
  location: string;
  assigned_to?: string;
  warranty_expires?: string;
  last_maintenance?: string;
}

interface Office {
  id: number;
  name: string;
  office_type: string;
}

interface AssetsProps {
  office: Office;
  assets: Asset[];
  asset_types: string[];
  total_value: number;
  depreciation_rate: number;
}

const AssetTracking: React.FC<AssetsProps> = ({ 
  office, 
  assets, 
  asset_types, 
  total_value, 
  depreciation_rate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add asset form
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    asset_type: '',
    serial_number: '',
    purchase_date: '',
    purchase_cost: '',
    location: '',
    assigned_to: '',
    warranty_expires: '',
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/offices/${office.id}/assets`, {
      onSuccess: () => {
        reset();
        setShowAddForm(false);
        router.reload();
      }
    });
  };

  // Filter assets based on search and filters
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assigned_to?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || asset.asset_type === filterType;
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get asset type icon
  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'computer':
      case 'desktop':
        return <Monitor className="h-5 w-5" />;
      case 'laptop':
        return <Laptop className="h-5 w-5" />;
      case 'printer':
        return <Printer className="h-5 w-5" />;
      case 'phone':
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-gray-100 text-gray-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate asset statistics
  const assetStats = {
    total: assets.length,
    active: assets.filter(a => a.status === 'active').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length,
    retired: assets.filter(a => a.status === 'retired').length,
    missing: assets.filter(a => a.status === 'missing').length,
  };

  const getMaintenanceAlerts = () => {
    const now = new Date();
    return assets.filter(asset => {
      if (asset.warranty_expires) {
        const warrantyDate = new Date(asset.warranty_expires);
        const daysUntilExpiry = Math.ceil((warrantyDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      }
      return false;
    });
  };

  const maintenanceAlerts = getMaintenanceAlerts();

  return (
    <>
      <Head title={`Asset Tracking - ${office.name}`} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Asset Tracking</h1>
            <p className="text-gray-600 mt-2">{office.name}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Asset Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-blue-600">{assetStats.total}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-green-600">${total_value.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Depreciation: {depreciation_rate}% annually
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Assets</p>
                  <p className="text-2xl font-bold text-green-600">{assetStats.active}</p>
                </div>
                <div className="text-green-600">
                  {Math.round((assetStats.active / assetStats.total) * 100)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Maintenance Alerts</p>
                  <p className="text-2xl font-bold text-orange-600">{maintenanceAlerts.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Alerts */}
        {maintenanceAlerts.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Maintenance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {maintenanceAlerts.map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-600">
                        Warranty expires: {new Date(asset.warranty_expires!).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Schedule Maintenance
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="assets">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Asset Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {asset_types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="missing">Missing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Assets List */}
            <Card>
              <CardHeader>
                <CardTitle>Assets ({filteredAssets.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map(asset => (
                      <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="text-gray-400">
                            {getAssetIcon(asset.asset_type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{asset.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{asset.asset_type}</Badge>
                              <Badge className={getStatusColor(asset.status)}>
                                {asset.status}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                SN: {asset.serial_number}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {asset.assigned_to && `Assigned to: ${asset.assigned_to} • `}
                              Location: {asset.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${asset.current_value.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              Purchased: {new Date(asset.purchase_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No assets found matching your criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Asset Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Asset analytics and reports will be displayed here.</p>
                  <p className="text-sm">Charts, depreciation trends, and cost analysis.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Maintenance scheduling and history will be displayed here.</p>
                  <p className="text-sm">Track repairs, upgrades, and preventive maintenance.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Asset Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add New Asset</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAsset} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Asset Name</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter asset name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="asset_type">Asset Type</Label>
                    <Select value={data.asset_type} onValueChange={(value) => setData('asset_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        {asset_types.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.asset_type && <p className="text-red-500 text-sm mt-1">{errors.asset_type}</p>}
                  </div>

                  <div>
                    <Label htmlFor="serial_number">Serial Number</Label>
                    <Input
                      id="serial_number"
                      value={data.serial_number}
                      onChange={(e) => setData('serial_number', e.target.value)}
                      placeholder="Enter serial number"
                      className={errors.serial_number ? 'border-red-500' : ''}
                    />
                    {errors.serial_number && <p className="text-red-500 text-sm mt-1">{errors.serial_number}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purchase_date">Purchase Date</Label>
                      <Input
                        id="purchase_date"
                        type="date"
                        value={data.purchase_date}
                        onChange={(e) => setData('purchase_date', e.target.value)}
                        className={errors.purchase_date ? 'border-red-500' : ''}
                      />
                      {errors.purchase_date && <p className="text-red-500 text-sm mt-1">{errors.purchase_date}</p>}
                    </div>

                    <div>
                      <Label htmlFor="purchase_cost">Purchase Cost</Label>
                      <Input
                        id="purchase_cost"
                        type="number"
                        value={data.purchase_cost}
                        onChange={(e) => setData('purchase_cost', e.target.value)}
                        placeholder="0.00"
                        className={errors.purchase_cost ? 'border-red-500' : ''}
                      />
                      {errors.purchase_cost && <p className="text-red-500 text-sm mt-1">{errors.purchase_cost}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={data.location}
                      onChange={(e) => setData('location', e.target.value)}
                      placeholder="Asset location"
                      className={errors.location ? 'border-red-500' : ''}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                      {processing ? 'Adding...' : 'Add Asset'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AssetTracking;
