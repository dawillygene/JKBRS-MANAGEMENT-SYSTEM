<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\InventoryItem;
use App\Models\Office;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InventorySystemSeeder extends Seeder
{
    /**
     * Run the database seeds for JKBRS-IMS Inventory System
     */
    public function run(): void
    {
        $this->command->info('🚀 Seeding JKBRS Inventory Management System...');
        
        // Create Categories
        $this->createCategories();
        
        // Create Suppliers
        $this->createSuppliers();
        
        // Create Warehouses
        $this->createWarehouses();
        
        // Create Products
        $this->createProducts();
        
        // Create Initial Inventory
        $this->createInitialInventory();
        
        $this->command->info('✅ Inventory system seeding completed!');
    }

    private function createCategories(): void
    {
        $this->command->info('📂 Creating product categories...');
        
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and accessories',
                'children' => [
                    ['name' => 'Mobile Phones', 'description' => 'Smartphones and accessories'],
                    ['name' => 'Computers', 'description' => 'Laptops, desktops, and accessories'],
                ]
            ],
            [
                'name' => 'Clothing',
                'description' => 'Apparel and textile products',
                'children' => [
                    ['name' => 'Men Clothing', 'description' => 'Clothing for men'],
                    ['name' => 'Women Clothing', 'description' => 'Clothing for women'],
                ]
            ],
            [
                'name' => 'Food & Beverages',
                'description' => 'Food items and beverages',
                'children' => [
                    ['name' => 'Beverages', 'description' => 'Soft drinks, juices, water'],
                    ['name' => 'Dairy Products', 'description' => 'Milk, cheese, yogurt'],
                ]
            ]
        ];

        foreach ($categories as $categoryData) {
            $parent = Category::firstOrCreate(
                ['slug' => Str::slug($categoryData['name'])],
                [
                    'name' => $categoryData['name'],
                    'description' => $categoryData['description'],
                    'is_active' => true
                ]
            );

            if (isset($categoryData['children'])) {
                foreach ($categoryData['children'] as $childData) {
                    Category::firstOrCreate(
                        ['slug' => Str::slug($childData['name'])],
                        [
                            'name' => $childData['name'],
                            'description' => $childData['description'],
                            'parent_id' => $parent->id,
                            'is_active' => true
                        ]
                    );
                }
            }
        }
    }

    private function createSuppliers(): void
    {
        $this->command->info('🏭 Creating suppliers...');
        
        $suppliers = [
            [
                'name' => 'TechSupply Tanzania Ltd',
                'company_name' => 'TechSupply Tanzania Limited',
                'contact_person' => 'John Mwalimu',
                'email' => 'info@techsupply.co.tz',
                'phone' => '+255 22 211 5555',
                'address' => 'Plot 123, Uhuru Street',
                'city' => 'Dar es Salaam',
                'region' => 'Dar es Salaam',
                'country' => 'Tanzania',
                'tax_number' => '123-456-789',
                'payment_terms' => 'net_30',
                'credit_limit' => 50000000,
                'rating' => 4.5
            ],
            [
                'name' => 'Fashion Hub Africa',
                'company_name' => 'Fashion Hub Africa Limited',
                'contact_person' => 'Mary Kimathi',
                'email' => 'orders@fashionhub.co.tz',
                'phone' => '+255 22 266 7777',
                'address' => 'Msimbazi Street, Ilala',
                'city' => 'Dar es Salaam',
                'region' => 'Dar es Salaam',
                'country' => 'Tanzania',
                'tax_number' => '987-654-321',
                'payment_terms' => 'net_15',
                'credit_limit' => 30000000,
                'rating' => 4.2
            ]
        ];

        foreach ($suppliers as $supplierData) {
            Supplier::firstOrCreate(
                ['email' => $supplierData['email']],
                $supplierData
            );
        }
    }

    private function createWarehouses(): void
    {
        $this->command->info('🏪 Creating warehouses...');
        
        $offices = Office::take(3)->get(); // Just first 3 offices
        
        foreach ($offices as $office) {
            $warehouseCode = 'WH' . str_pad($office->id, 3, '0', STR_PAD_LEFT);
            
            Warehouse::firstOrCreate(
                ['code' => $warehouseCode],
                [
                    'office_id' => $office->id,
                    'name' => $office->name . ' Warehouse',
                    'description' => 'Main warehouse for ' . $office->name,
                    'location' => 'Warehouse District',
                    'city' => 'Dar es Salaam',
                    'type' => 'main',
                    'capacity' => 1000.00,
                    'capacity_unit' => 'sqm',
                    'is_active' => true,
                    'climate_controlled' => false,
                    'security_system' => true
                ]
            );
        }
    }

    private function createProducts(): void
    {
        $this->command->info('📦 Creating products...');
        
        $categories = Category::whereNotNull('parent_id')->get();
        
        $products = [
            [
                'name' => 'Samsung Galaxy A54',
                'description' => 'Latest Samsung smartphone',
                'category_name' => 'Mobile Phones',
                'cost_price' => 850000,
                'selling_price' => 1200000,
            ],
            [
                'name' => 'Dell Laptop Inspiron',
                'description' => 'Professional laptop',
                'category_name' => 'Computers',
                'cost_price' => 1200000,
                'selling_price' => 1600000,
            ],
            [
                'name' => 'Cotton T-Shirt',
                'description' => 'Premium cotton t-shirt',
                'category_name' => 'Men Clothing',
                'cost_price' => 15000,
                'selling_price' => 25000,
            ],
            [
                'name' => 'Coca-Cola 500ml',
                'description' => 'Refreshing soft drink',
                'category_name' => 'Beverages',
                'cost_price' => 800,
                'selling_price' => 1200,
            ]
        ];

        foreach ($products as $productData) {
            $category = $categories->where('name', $productData['category_name'])->first();
            
            if ($category) {
                Product::firstOrCreate(
                    ['name' => $productData['name']],
                    [
                        'description' => $productData['description'],
                        'category_id' => $category->id,
                        'cost_price' => $productData['cost_price'],
                        'selling_price' => $productData['selling_price'],
                        'unit_of_measure' => 'pieces',
                        'is_active' => true,
                        'track_quantity' => true
                    ]
                );
            }
        }
    }

    private function createInitialInventory(): void
    {
        $this->command->info('📊 Creating initial inventory...');
        
        $products = Product::with('category')->get();
        $offices = Office::take(3)->get();
        
        foreach ($products as $product) {
            foreach ($offices as $office) {
                $quantity = rand(50, 200);
                $minStockLevel = intval($quantity * 0.2);
                
                $itemCode = 'INV' . str_pad($product->id, 3, '0', STR_PAD_LEFT) . str_pad($office->id, 2, '0', STR_PAD_LEFT);
                
                InventoryItem::firstOrCreate(
                    [
                        'item_code' => $itemCode
                    ],
                    [
                        'office_id' => $office->id,
                        'item_code' => $itemCode,
                        'name' => $product->name,
                        'description' => $product->description ?? 'Product from ' . $product->name,
                        'category' => $product->category->name ?? 'General',
                        'unit' => $product->unit_of_measure ?? 'pieces',
                        'quantity' => $quantity,
                        'minimum_stock' => $minStockLevel,
                        'cost_price' => $product->cost_price ?? 0,
                        'selling_price' => $product->selling_price ?? 0,
                        'supplier' => 'TechSupply Tanzania Ltd',
                        'location' => $office->name . ' - Main Store',
                        'is_active' => true
                    ]
                );
            }
        }
    }
}
