import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertTriangle, 
  Package, 
  RefreshCw,
  ShoppingCart,
  Eye,
  Edit,
  TrendingUp,
  Download
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface LowStockItem {
  id: number;
  item_code: string;
  name: string;
  category: string;
  quantity: number;
  minimum_stock: number;
  cost_price: number;
  selling_price: number;
  office_name: string;
  shortage_quantity: number;
  shortage_value: number;
  supplier?: string;
  location?: string;
}

interface Office {
  id: number;
  name: string;
}

interface PageProps {
  lowStockItems: LowStockItem[];
  offices: Office[];
  selectedOffice?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Inventory Management', href: '/inventory' },
  { title: 'Low Stock Alerts', href: '/inventory/low-stock' },
];

export default function LowStockIndex({ lowStockItems, offices, selectedOffice }: PageProps) {
  const [officeFilter, setOfficeFilter] = useState(selectedOffice || '');

  const handleOfficeChange = (value: string) => {
    setOfficeFilter(value);
    router.get('/inventory/low-stock', {
      office_id: value || undefined,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getStockLevel = (quantity: number, minimum: number) => {
    if (minimum === 0) return 0;
    return Math.min((quantity / minimum) * 100, 100);
  };

  const getUrgencyLevel = (quantity: number, minimum: number) => {
    if (quantity === 0) return { level: 'critical', color: 'destructive' as const };
    if (quantity <= minimum * 0.5) return { level: 'urgent', color: 'destructive' as const };
    if (quantity <= minimum * 0.8) return { level: 'warning', color: 'warning' as const };
    return { level: 'low', color: 'secondary' as const };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalShortageValue = lowStockItems.reduce((sum, item) => sum + item.shortage_value, 0);

  const exportData = () => {
    // Create CSV data
    const headers = ['Item Code', 'Name', 'Category', 'Office', 'Current Stock', 'Minimum Stock', 'Shortage', 'Shortage Value (TZS)', 'Supplier'];
    const csvData = lowStockItems.map(item => [
      item.item_code,
      item.name,
      item.category,
      item.office_name,
      item.quantity,
      item.minimum_stock,
      item.shortage_quantity,
      item.shortage_value,
      item.supplier || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `\"${field}\"`).join(','))
      .join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `low-stock-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Low Stock Alerts" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              Low Stock Alerts
            </h1>
            <p className="text-gray-600 mt-1">Items that need immediate attention</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={() => router.visit('/inventory/create')}>
              <Package className="h-4 w-4 mr-2" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Items Needing Attention</p>
                  <p className="text-2xl font-bold text-orange-600">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Shortage Value</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalShortageValue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Items</p>
                  <p className="text-2xl font-bold text-red-600">
                    {lowStockItems.filter(item => item.quantity === 0).length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Filter by Office:</label>
                <Select value={officeFilter} onValueChange={handleOfficeChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Offices" />
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
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items ({lowStockItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Details</TableHead>
                    <TableHead>Office</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Current/Min</TableHead>
                    <TableHead>Shortage Value</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItems.map((item) => {
                    const stockLevel = getStockLevel(item.quantity, item.minimum_stock);
                    const urgency = getUrgencyLevel(item.quantity, item.minimum_stock);
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.item_code}</div>
                            <div className="text-xs text-gray-400">{item.category}</div>
                            {item.location && (
                              <div className="text-xs text-blue-600">{item.location}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{item.office_name}</div>
                          {item.supplier && (
                            <div className="text-xs text-gray-500">Supplier: {item.supplier}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="w-24">
                            <Progress 
                              value={stockLevel} 
                              className="h-2 mb-1"
                            />
                            <div className="text-xs text-gray-500">
                              {stockLevel.toFixed(0)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className={item.quantity === 0 ? 'text-red-600 font-bold' : 'text-gray-900'}>
                              {item.quantity}
                            </span>
                            <span className="text-gray-500"> / {item.minimum_stock}</span>
                          </div>
                          <div className="text-xs text-red-600">
                            -{item.shortage_quantity}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium text-red-600">
                            {formatCurrency(item.shortage_value)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={urgency.color}>
                            {urgency.level.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.visit(`/inventory/${item.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.visit(`/inventory/${item.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.visit(`/stock-adjustments/create?item_id=${item.id}`)}
                            >
                              <TrendingUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Low Stock Items</h3>
                <p className="text-gray-500">All inventory items are at healthy stock levels!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
