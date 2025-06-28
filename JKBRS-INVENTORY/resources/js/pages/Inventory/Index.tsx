import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Plus, 
  Search, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Filter,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface InventoryItem {
  id: number;
  item_code: string;
  name: string;
  category: string;
  quantity: number;
  minimum_stock: number;
  cost_price: number;
  selling_price: number;
  office: {
    id: number;
    name: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Office {
  id: number;
  name: string;
}

interface PageProps {
  inventoryItems: {
    data: InventoryItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  offices: Office[];
  categories: string[];
  filters: {
    office_id?: string;
    category?: string;
    search?: string;
    low_stock?: boolean | string;
    is_active?: boolean | string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Inventory Management', href: '/inventory' },
];

export default function InventoryIndex({ inventoryItems, offices, categories, filters }: PageProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedOffice, setSelectedOffice] = useState(filters.office_id || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [showLowStock, setShowLowStock] = useState(
    filters.low_stock === true || filters.low_stock === 'true' || filters.low_stock === '1'
  );

  const handleSearch = () => {
    const searchParams: any = {
      search: searchTerm,
      low_stock: showLowStock,
    };
    
    if (selectedOffice !== 'all') {
      searchParams.office_id = selectedOffice;
    }
    
    if (selectedCategory !== 'all') {
      searchParams.category = selectedCategory;
    }
    
    router.get('/inventory', searchParams, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedOffice('all');
    setSelectedCategory('all');
    setShowLowStock(false);
    router.get('/inventory', {}, { preserveState: true, replace: true });
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity === 0) return { status: 'Out of Stock', variant: 'destructive' as const };
    if (item.quantity <= item.minimum_stock) return { status: 'Low Stock', variant: 'secondary' as const };
    return { status: 'In Stock', variant: 'default' as const };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Inventory Management" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 custom-scrollbar">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Manage your inventory items and track stock levels</p>
              </div>
              <Button onClick={() => router.visit('/inventory/create')} className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add New Item
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold text-gray-900">{inventoryItems.total}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {inventoryItems.data.filter(item => item.quantity <= item.minimum_stock).length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Value</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(inventoryItems.data.reduce((sum, item) => sum + (item.quantity * item.cost_price), 0))}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
                    </div>
                    <Filter className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Filters & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  <div>
                    <Input
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Office" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Offices</SelectItem>
                        {offices.map((office) => (
                          <SelectItem key={office.id} value={office.id.toString()}>
                            {office.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="low-stock"
                      checked={showLowStock}
                      onChange={(e) => setShowLowStock(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="low-stock" className="text-sm font-medium">
                      Low Stock Only
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleSearch} className="flex items-center justify-center gap-2 w-full sm:w-auto">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                    <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Item Code</TableHead>
                        <TableHead className="min-w-[150px]">Name</TableHead>
                        <TableHead className="min-w-[120px]">Category</TableHead>
                        <TableHead className="min-w-[120px]">Office</TableHead>
                        <TableHead className="min-w-[80px] text-center">Quantity</TableHead>
                        <TableHead className="min-w-[80px] text-center">Min Stock</TableHead>
                        <TableHead className="min-w-[100px]">Cost Price</TableHead>
                        <TableHead className="min-w-[100px]">Selling Price</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                {inventoryItems.data.map((item) => {
                  const stockStatus = getStockStatus(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.item_code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.office.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-center">{item.minimum_stock}</TableCell>
                      <TableCell>{formatCurrency(item.cost_price)}</TableCell>
                      <TableCell>{formatCurrency(item.selling_price)}</TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.status}
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
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this item?')) {
                                router.delete(`/inventory/${item.id}`);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {inventoryItems.last_page > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: inventoryItems.last_page }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === inventoryItems.current_page ? "default" : "outline"}
                    size="sm"
                    onClick={() => router.get(`/inventory?page=${page}`, filters)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
</main>
</AppLayout>
);
}
