import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface InventoryItem {
  id: number;
  item_code: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  quantity: number;
  minimum_stock: number;
  cost_price: number;
  selling_price: number;
  supplier: string;
  expiry_date: string;
  location: string;
  is_active: boolean;
  office: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface PageProps {
  inventoryItem: InventoryItem;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Inventory Management', href: '/inventory' },
  { title: 'Item Details', href: '#' },
];

export default function InventoryShow({ inventoryItem }: PageProps) {
  const getStockStatus = () => {
    if (inventoryItem.quantity === 0) return { status: 'Out of Stock', variant: 'destructive' as const, icon: AlertTriangle };
    if (inventoryItem.quantity <= inventoryItem.minimum_stock) return { status: 'Low Stock', variant: 'warning' as const, icon: TrendingDown };
    return { status: 'In Stock', variant: 'success' as const, icon: TrendingUp };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-TZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;
  const totalValue = inventoryItem.quantity * inventoryItem.cost_price;
  const profitMargin = inventoryItem.selling_price - inventoryItem.cost_price;
  const profitPercentage = inventoryItem.cost_price > 0 ? (profitMargin / inventoryItem.cost_price) * 100 : 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`${inventoryItem.name} - Inventory Details`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.visit('/inventory')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{inventoryItem.name}</h1>
              <p className="text-gray-600 mt-1">Item Code: {inventoryItem.item_code}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={stockStatus.variant} className="flex items-center gap-1">
              <StockIcon className="h-3 w-3" />
              {stockStatus.status}
            </Badge>
            <Button
              onClick={() => router.visit(`/inventory/${inventoryItem.id}/edit`)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Item
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Basic Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{inventoryItem.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{inventoryItem.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Unit of Measure</p>
                      <p className="font-medium">{inventoryItem.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Office Location</p>
                      <p className="font-medium">{inventoryItem.office.name}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Additional Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Supplier</p>
                      <p className="font-medium">{inventoryItem.supplier || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Storage Location</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {inventoryItem.location || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {inventoryItem.expiry_date ? formatDate(inventoryItem.expiry_date) : 'No expiry date'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge variant={inventoryItem.is_active ? 'success' : 'secondary'}>
                        {inventoryItem.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {inventoryItem.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{inventoryItem.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stock & Financial Information */}
          <div className="space-y-6">
            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Stock</p>
                  <p className="text-3xl font-bold text-gray-900">{inventoryItem.quantity}</p>
                  <p className="text-sm text-gray-500">{inventoryItem.unit}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Minimum Stock</span>
                    <span className="font-medium">{inventoryItem.minimum_stock}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        inventoryItem.quantity <= inventoryItem.minimum_stock
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min(
                          (inventoryItem.quantity / Math.max(inventoryItem.minimum_stock * 2, 1)) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {inventoryItem.quantity <= inventoryItem.minimum_stock && (
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        Stock below minimum level
                      </span>
                    </div>
                    <p className="text-xs text-orange-700 mt-1">
                      Consider reordering soon
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Cost Price</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(inventoryItem.cost_price)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Selling Price</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(inventoryItem.selling_price)}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Profit Margin</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(profitMargin)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Profit %</span>
                    <span className="font-medium text-green-600">
                      {profitPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-sm text-blue-800 font-medium">Total Stock Value</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{formatDate(inventoryItem.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">{formatDate(inventoryItem.updated_at)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
