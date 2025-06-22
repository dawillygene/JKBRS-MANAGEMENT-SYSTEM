# JKBRS Technical Architecture Guide

## 🏗️ **SYSTEM ARCHITECTURE OVERVIEW**

### **Technology Stack:**
- **Backend**: Laravel 11 (PHP 8.4+)
- **Frontend**: React 18 + TypeScript + Inertia.js
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Chart.js / Recharts
- **Authentication**: Laravel Sanctum
- **File Storage**: Laravel Storage (Local/S3)
- **Caching**: Redis (Production)
- **Queue**: Redis/Database
- **Email**: Laravel Mail + SMTP
- **SMS**: Africa's Talking API

---

## 📁 **PROJECT STRUCTURE**

```
JKBRS-INVENTORY/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/           # API Controllers
│   │   │   ├── Auth/          # Authentication Controllers
│   │   │   └── Web/           # Web Controllers
│   │   ├── Middleware/        # Custom Middleware
│   │   ├── Requests/          # Form Validation Requests
│   │   └── Resources/         # API Resources
│   ├── Models/                # Eloquent Models
│   ├── Services/              # Business Logic Services
│   ├── Repositories/          # Data Access Layer
│   └── Jobs/                  # Background Jobs
├── database/
│   ├── migrations/            # Database Migrations
│   ├── seeders/               # Database Seeders
│   └── factories/             # Model Factories
├── resources/
│   ├── js/
│   │   ├── components/        # Reusable React Components
│   │   ├── pages/             # Page Components
│   │   ├── layouts/           # Layout Components
│   │   ├── contexts/          # React Contexts
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── lib/               # Utility Libraries
│   │   └── types/             # TypeScript Type Definitions
│   ├── css/                   # Stylesheets
│   └── views/                 # Blade Templates (minimal)
├── routes/
│   ├── web.php                # Web Routes
│   ├── api.php                # API Routes
│   └── auth.php               # Authentication Routes
├── tests/
│   ├── Feature/               # Feature Tests
│   └── Unit/                  # Unit Tests
└── storage/
    ├── app/                   # Application Files
    ├── logs/                  # Log Files
    └── framework/             # Framework Storage
```

---

## 🗄️ **DATABASE ARCHITECTURE**

### **Core Tables (Implemented):**

```sql
-- Users and Authentication
users (id, name, email, employee_id, phone, office_id, role_id, ...)
roles (id, name, display_name, description, permissions)
offices (id, name, type, parent_office_id, address, budget_allocation, ...)

-- Session Management
sessions (id, user_id, ip_address, user_agent, payload, last_activity)
password_reset_tokens (email, token, created_at)
```

### **Inventory Tables (To Implement):**

```sql
-- Product Management
categories (id, name, description, parent_id, is_active, created_at, updated_at)
suppliers (id, name, contact_person, phone, email, address, tax_number, created_at, updated_at)
products (id, sku, name, description, category_id, supplier_id, cost_price, selling_price, unit, barcode, image, is_active, created_at, updated_at)
product_variants (id, product_id, variant_name, sku, price_adjustment, created_at, updated_at)

-- Warehouse Management
warehouses (id, office_id, name, location, manager_id, is_active, created_at, updated_at)
inventory_items (id, product_id, warehouse_id, quantity, reserved_quantity, min_stock, max_stock, reorder_point, created_at, updated_at)
stock_movements (id, product_id, warehouse_id, type, quantity, reference_type, reference_id, notes, user_id, created_at)
stock_adjustments (id, product_id, warehouse_id, old_quantity, new_quantity, reason, adjustment_value, user_id, created_at)
```

### **Sales Tables (To Implement):**

```sql
-- Customer Management
customers (id, customer_code, name, phone, email, address, credit_limit, payment_terms, tax_number, created_at, updated_at)
customer_contacts (id, customer_id, name, phone, email, position, is_primary, created_at, updated_at)

-- Sales Operations
sales_orders (id, order_number, customer_id, order_date, delivery_date, status, subtotal, tax_amount, discount, total, notes, user_id, office_id, created_at, updated_at)
sales_order_items (id, sales_order_id, product_id, quantity, unit_price, total_price, created_at, updated_at)
invoices (id, invoice_number, sales_order_id, customer_id, invoice_date, due_date, status, subtotal, tax_amount, discount, total, paid_amount, user_id, created_at, updated_at)
invoice_items (id, invoice_id, product_id, quantity, unit_price, total_price, created_at, updated_at)
```

### **Purchase Tables (To Implement):**

```sql
-- Purchase Management
purchase_orders (id, po_number, supplier_id, order_date, expected_date, status, subtotal, tax_amount, discount, total, notes, user_id, office_id, created_at, updated_at)
purchase_order_items (id, purchase_order_id, product_id, quantity, unit_price, total_price, received_quantity, created_at, updated_at)
goods_receipts (id, receipt_number, purchase_order_id, supplier_id, receipt_date, status, user_id, created_at, updated_at)
goods_receipt_items (id, goods_receipt_id, product_id, ordered_quantity, received_quantity, unit_price, created_at, updated_at)
```

### **Financial Tables (To Implement):**

```sql
-- Accounting
chart_of_accounts (id, account_code, account_name, account_type, parent_id, is_active, created_at, updated_at)
journal_entries (id, entry_number, date, description, reference, total_debit, total_credit, status, user_id, created_at, updated_at)
journal_entry_lines (id, journal_entry_id, account_id, description, debit_amount, credit_amount, created_at, updated_at)

-- Budget Management
budgets (id, office_id, year, month, category, budgeted_amount, actual_amount, variance, created_at, updated_at)
expenses (id, expense_number, office_id, category, amount, description, receipt_image, status, requested_by, approved_by, expense_date, created_at, updated_at)
```

### **HR Tables (To Implement):**

```sql
-- Employee Management
employees (id, user_id, employee_number, first_name, last_name, position, department, hire_date, salary, bank_account, nssf_number, tax_number, created_at, updated_at)
payroll (id, employee_id, pay_period_start, pay_period_end, basic_salary, allowances, deductions, gross_pay, net_pay, tax_amount, nssf_amount, processed_by, processed_at, created_at, updated_at)
attendance (id, employee_id, date, clock_in, clock_out, break_start, break_end, total_hours, overtime_hours, status, created_at, updated_at)
leave_requests (id, employee_id, leave_type, start_date, end_date, days_requested, reason, status, requested_by, approved_by, created_at, updated_at)
```

---

## 🔧 **API ARCHITECTURE**

### **API Response Structure:**

```php
// Success Response
{
    "success": true,
    "data": {...},
    "message": "Operation completed successfully",
    "meta": {
        "total": 100,
        "per_page": 15,
        "current_page": 1,
        "last_page": 7
    }
}

// Error Response
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "field_name": ["Error message"]
    }
}
```

### **API Endpoints Pattern:**

```php
// Resource Routes
GET    /api/products           # List products
POST   /api/products           # Create product
GET    /api/products/{id}      # Show product
PUT    /api/products/{id}      # Update product
DELETE /api/products/{id}      # Delete product

// Bulk Operations
POST   /api/products/bulk      # Bulk create/update
DELETE /api/products/bulk      # Bulk delete

// Search and Filter
GET    /api/products/search?q=term&category=1&status=active

// Related Resources
GET    /api/products/{id}/variants
GET    /api/products/{id}/stock-movements
```

### **Authentication & Authorization:**

```php
// Middleware Stack
Route::middleware(['auth:sanctum', 'role:admin|manager', 'office.access'])
    ->group(function () {
        // Protected routes
    });

// Permission Checking
if (auth()->user()->can('manage-inventory')) {
    // Allow access
}

// Office Access Control
if (auth()->user()->hasOfficeAccess($office)) {
    // Allow access to office data
}
```

---

## ⚛️ **FRONTEND ARCHITECTURE**

### **Component Hierarchy:**

```typescript
// App Structure
App
├── AuthProvider                # Authentication Context
├── AppLayout                   # Main Application Layout
│   ├── AppSidebar             # Navigation Sidebar
│   ├── AppHeader              # Top Navigation
│   └── AppContent             # Main Content Area
│       ├── Breadcrumbs        # Navigation Breadcrumbs
│       └── PageComponent      # Individual Page Components
│           ├── PageHeader     # Page Title and Actions
│           ├── PageContent    # Main Page Content
│           └── PageFooter     # Page Footer (if needed)
```

### **State Management:**

```typescript
// Context Pattern for Global State
interface AuthContextType {
    user: User | null;
    permissions: string[];
    office: Office | null;
    login: (credentials: LoginData) => Promise<void>;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
    formatCurrency: (amount: number) => string;
}

// Component State with Hooks
function useInventoryState() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<FilterState>({});
    
    // State management logic
    return { products, loading, filters, actions };
}
```

### **Form Handling:**

```typescript
// Form Validation with React Hook Form
interface ProductFormData {
    name: string;
    sku: string;
    category_id: number;
    cost_price: number;
    selling_price: number;
}

function ProductForm({ onSubmit }: ProductFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                label="Product Name"
                error={errors.name?.message}
                {...register('name', { required: 'Product name is required' })}
            />
            {/* Other fields */}
        </form>
    );
}
```

### **API Integration:**

```typescript
// API Service Layer
class ApiService {
    private static instance: ApiService;
    
    async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
        // HTTP GET implementation
    }
    
    async post<T>(url: string, data: object): Promise<ApiResponse<T>> {
        // HTTP POST implementation
    }
    
    // Other HTTP methods
}

// Resource-specific Services
class ProductService {
    static async getProducts(params: GetProductsParams): Promise<ApiResponse<Product[]>> {
        return ApiService.getInstance().get('/api/products', params);
    }
    
    static async createProduct(data: CreateProductData): Promise<ApiResponse<Product>> {
        return ApiService.getInstance().post('/api/products', data);
    }
}
```

---

## 🔐 **SECURITY ARCHITECTURE**

### **Authentication Flow:**

```php
// Laravel Sanctum Token-based Authentication
1. User logs in with credentials
2. Server validates and returns Sanctum token
3. Frontend stores token in httpOnly cookie
4. Token included in all subsequent requests
5. Server validates token on each request
```

### **Authorization Levels:**

```php
// Role-based Permissions
'permissions' => [
    'admin' => ['*'],  // All permissions
    'manager' => [
        'manage-office-users',
        'view-office-reports',
        'manage-office-inventory',
        'approve-office-expenses'
    ],
    'sales' => [
        'create-sales-orders',
        'view-customers',
        'process-payments'
    ],
    'inventory' => [
        'manage-products',
        'update-stock',
        'view-inventory-reports'
    ]
]
```

### **Data Protection:**

```php
// Input Validation
class CreateProductRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0'
        ];
    }
}

// SQL Injection Prevention (Eloquent ORM)
Product::where('category_id', $categoryId)
       ->where('name', 'like', '%' . $searchTerm . '%')
       ->get();

// XSS Prevention (Auto-escaping in React)
<div>{product.name}</div>  // Automatically escaped
```

---

## 🚀 **PERFORMANCE OPTIMIZATION**

### **Backend Optimization:**

```php
// Database Query Optimization
Product::with(['category', 'supplier'])  // Eager loading
       ->select(['id', 'name', 'sku', 'category_id'])  // Select only needed columns
       ->orderBy('name')
       ->paginate(20);

// Caching Strategy
Cache::remember('office-metrics-' . $officeId, 3600, function () {
    return OfficeMetrics::calculate($officeId);
});

// Background Jobs
dispatch(new ProcessInventoryReport($request->all()));
```

### **Frontend Optimization:**

```typescript
// Code Splitting
const ProductPage = lazy(() => import('./pages/Products/ProductPage'));
const InventoryPage = lazy(() => import('./pages/Inventory/InventoryPage'));

// Memoization
const expensiveCalculation = useMemo(() => {
    return products.reduce((total, product) => total + product.value, 0);
}, [products]);

// Virtual Scrolling for Large Lists
import { FixedSizeList as List } from 'react-window';

function ProductList({ products }: ProductListProps) {
    return (
        <List
            height={600}
            itemCount={products.length}
            itemSize={60}
            itemData={products}
        >
            {ProductItem}
        </List>
    );
}
```

---

## 📊 **MONITORING & LOGGING**

### **Application Logging:**

```php
// Structured Logging
Log::info('Product created', [
    'product_id' => $product->id,
    'user_id' => auth()->id(),
    'office_id' => auth()->user()->office_id
]);

Log::error('Stock update failed', [
    'product_id' => $productId,
    'attempted_quantity' => $quantity,
    'error' => $exception->getMessage()
]);
```

### **Performance Monitoring:**

```php
// Query Performance Monitoring
DB::listen(function ($query) {
    if ($query->time > 1000) {  // Log slow queries
        Log::warning('Slow query detected', [
            'sql' => $query->sql,
            'time' => $query->time
        ]);
    }
});

// Application Metrics
class MetricsService
{
    public static function trackUserAction($action, $data = [])
    {
        // Track user actions for analytics
    }
    
    public static function recordPerformanceMetric($metric, $value)
    {
        // Record performance metrics
    }
}
```

---

## 🔄 **DEPLOYMENT ARCHITECTURE**

### **Environment Configuration:**

```bash
# .env.production
APP_ENV=production
APP_DEBUG=false
APP_URL=https://inventory.jkbrs.co.tz

DB_CONNECTION=pgsql
DB_HOST=localhost
DB_DATABASE=jkbrs_inventory
DB_USERNAME=jkbrs_user
DB_PASSWORD=secure_password

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

MAIL_MAILER=smtp
MAIL_HOST=mail.jkbrs.co.tz
MAIL_PORT=587
MAIL_ENCRYPTION=tls
```

### **Production Deployment:**

```bash
# Deployment Script
#!/bin/bash
git pull origin main
composer install --no-dev --optimize-autoloader
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart
sudo systemctl reload nginx
```

---

## 🧪 **TESTING STRATEGY**

### **Backend Testing:**

```php
// Feature Test Example
class ProductManagementTest extends TestCase
{
    public function test_user_can_create_product()
    {
        $user = User::factory()->create();
        $productData = [
            'name' => 'Test Product',
            'sku' => 'TEST001',
            'cost_price' => 1000,
            'selling_price' => 1500
        ];
        
        $response = $this->actingAs($user)
                        ->postJson('/api/products', $productData);
        
        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'data' => ['id', 'name', 'sku'],
                    'message'
                ]);
    }
}
```

### **Frontend Testing:**

```typescript
// Component Test Example
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductForm } from './ProductForm';

test('creates product when form is submitted', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/product name/i), {
        target: { value: 'Test Product' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'Test Product',
            // ... other form data
        });
    });
});
```

---

*This technical architecture guide provides the foundation for building a scalable, maintainable, and secure inventory management system. All developers should follow these patterns and conventions for consistency.*
