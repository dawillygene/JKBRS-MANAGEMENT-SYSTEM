import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Boxes,
  ShoppingCart,
  Warehouse,
  DollarSign
} from 'lucide-react';
import { router } from '@inertiajs/react';

interface InventoryStats {
  total_items: number;
  total_categories: number;
  total_products: number;
  low_stock_items: number;
  total_value: number;
  out_of_stock: number;
  active_suppliers: number;
  warehouses: number;
}

interface LowStockItem {
  id: number;
  name: string;
  item_code: string;
  quantity: number;
  minimum_stock: number;
  office_name: string;
}

interface InventoryDashboardProps {
  stats: InventoryStats;
  lowStockItems: LowStockItem[];
}

export default function InventoryDashboard({ stats, lowStockItems }: InventoryDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockLevel = (quantity: number, minimum: number) => {
    const percentage = (quantity / minimum) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_items.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.total_products} products</p>
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
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_value)}</p>
                <p className="text-xs text-green-600 mt-1">Inventory worth</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{stats.low_stock_items}</p>
                <p className="text-xs text-gray-500 mt-1">Items need attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.out_of_stock}</p>
                <p className="text-xs text-gray-500 mt-1">Critical items</p>
              </div>
              <Boxes className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Low Stock Alerts</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.visit('/inventory/low-stock')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.length > 0 ? (
                lowStockItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.item_code} • {item.office_name}
                      </p>
                      <div className="mt-1">
                        <Progress 
                          value={getStockLevel(item.quantity, item.minimum_stock)} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <Badge variant="warning" className="text-xs">
                        {item.quantity}/{item.minimum_stock}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No low stock items</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.visit('/inventory/create')}
              >
                <Package className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.visit('/products/create')}
              >
                <Boxes className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.visit('/suppliers')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Manage Suppliers
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.visit('/warehouses')}
              >
                <Warehouse className="h-4 w-4 mr-2" />
                Manage Warehouses
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.visit('/stock-adjustments/create')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Stock Adjustment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total_categories}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active_suppliers}</div>
            <div className="text-sm text-gray-600">Suppliers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.warehouses}</div>
            <div className="text-sm text-gray-600">Warehouses</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.total_products}</div>
            <div className="text-sm text-gray-600">Products</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
