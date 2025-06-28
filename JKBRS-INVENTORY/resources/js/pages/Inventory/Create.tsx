import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Office {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface PageProps {
  offices: Office[];
  categories: Category[];
}

interface FormData {
  office_id: string;
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
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Inventory Management', href: '/inventory' },
  { title: 'Add New Item', href: '/inventory/create' },
];

export default function InventoryCreate({ offices, categories }: PageProps) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    office_id: '',
    item_code: '',
    name: '',
    description: '',
    category: '',
    unit: 'pieces',
    quantity: 0,
    minimum_stock: 0,
    cost_price: 0,
    selling_price: 0,
    supplier: '',
    expiry_date: '',
    location: '',
    is_active: true,
  });

  const generateItemCode = () => {
    const prefix = 'INV';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    setData('item_code', `${prefix}${timestamp}${random}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/inventory', {
      onSuccess: () => {
        router.visit('/inventory');
      },
    });
  };

  const units = [
    'pieces', 'kg', 'liters', 'meters', 'boxes', 'bottles', 'packets', 'sets'
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add New Inventory Item" />

      <div className="space-y-6">
        {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900">Add New Inventory Item</h1>
            <p className="text-gray-600 mt-1">Create a new inventory item and set initial stock levels</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="item_code">Item Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="item_code"
                        value={data.item_code}
                        onChange={(e) => setData('item_code', e.target.value)}
                        placeholder="e.g., INV001"
                        className={errors.item_code ? 'border-red-500' : ''}
                      />
                      <Button type="button" variant="outline" onClick={generateItemCode}>
                        Generate
                      </Button>
                    </div>
                    {errors.item_code && (
                      <p className="text-sm text-red-500 mt-1">{errors.item_code}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="office_id">Office</Label>
                    <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                      <SelectTrigger className={errors.office_id ? 'border-red-500' : ''}>
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
                    {errors.office_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.office_id}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter item name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Enter item description"
                    rows={3}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="unit">Unit of Measure</Label>
                    <Select value={data.unit} onValueChange={(value) => setData('unit', value)}>
                      <SelectTrigger className={errors.unit ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.unit && (
                      <p className="text-sm text-red-500 mt-1">{errors.unit}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Stock & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Initial Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={data.quantity}
                    onChange={(e) => setData('quantity', parseInt(e.target.value) || 0)}
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="minimum_stock">Minimum Stock Level</Label>
                  <Input
                    id="minimum_stock"
                    type="number"
                    min="0"
                    value={data.minimum_stock}
                    onChange={(e) => setData('minimum_stock', parseInt(e.target.value) || 0)}
                    className={errors.minimum_stock ? 'border-red-500' : ''}
                  />
                  {errors.minimum_stock && (
                    <p className="text-sm text-red-500 mt-1">{errors.minimum_stock}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cost_price">Cost Price (TSH)</Label>
                  <Input
                    id="cost_price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={data.cost_price}
                    onChange={(e) => setData('cost_price', parseFloat(e.target.value) || 0)}
                    className={errors.cost_price ? 'border-red-500' : ''}
                  />
                  {errors.cost_price && (
                    <p className="text-sm text-red-500 mt-1">{errors.cost_price}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="selling_price">Selling Price (TSH)</Label>
                  <Input
                    id="selling_price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={data.selling_price}
                    onChange={(e) => setData('selling_price', parseFloat(e.target.value) || 0)}
                    className={errors.selling_price ? 'border-red-500' : ''}
                  />
                  {errors.selling_price && (
                    <p className="text-sm text-red-500 mt-1">{errors.selling_price}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                  />
                  <Label htmlFor="is_active">Active Item</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={data.supplier}
                    onChange={(e) => setData('supplier', e.target.value)}
                    placeholder="Enter supplier name"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    placeholder="e.g., Warehouse A, Shelf 1"
                  />
                </div>

                <div>
                  <Label htmlFor="expiry_date">Expiry Date (if applicable)</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={data.expiry_date}
                    onChange={(e) => setData('expiry_date', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit('/inventory')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={processing} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {processing ? 'Saving...' : 'Save Item'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
