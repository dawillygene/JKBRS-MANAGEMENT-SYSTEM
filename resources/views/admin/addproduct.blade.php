<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Dashboard</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<!-- Sidebar -->
<div class="d-flex">
    <div class="bg-dark text-white p-3" style="width: 250px; height: 100vh;">
        <h4 class="text-center">Dashboard</h4>
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link text-white" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">Categories</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">Orders</a>
            </li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1">
        <!-- Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{ config('app.name','jkbrs') }}</a>
            </div>
        </nav>

        <!-- Page Content -->
        <div class="container mt-4">
            <h2>Add Product</h2>
            <div class="card">
                <div class="card-body">
                    <form id="productForm" action="{{ route("products.store") }}" enctype="multipart/form-data" method="POST" >
                        @csrf
                        @method('POST')
                        <div class="mb-3">
                            <label for="productName" class="form-label">Product Name</label>
                            <input type="text" class="form-control" name="productName" id="productName" placeholder="Enter product name" required>
                        </div>
                        <div class="mb-3">
                            <label for="productPrice" class="form-label">Price</label>
                            <input type="number" class="form-control" name="productPrice" id="productPrice" placeholder="Enter price" min="0" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="productDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="productDescription" name="productDescription" rows="3" placeholder="Enter product description" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="productTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" name="productTitle" id="productTitle" placeholder="Enter product title" required>
                        </div>
                        <div class="mb-3">
                            <label for="productCategory" class="form-label">Category</label>
                            <select class="form-select" id="productCategory" name="productCategory" required>
                                <option value="">Select a category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home">Home</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="stockQuantity" class="form-label">Stock Quantity</label>
                            <input type="number" class="form-control" id="stockQuantity" name="stockQuantity" placeholder="Enter stock quantity" min="0" required>
                        </div>
                        <div class="mb-3">
                            <label for="productImage" class="form-label">Product Image</label>
                            <input type="file" class="form-control" name="productImage" id="productImage" accept="image/*" required>
                        </div>
                        <input type="submit" name="" value="add product" id="">
                        {{-- <button type="submit" class="btn btn-primary">Add Product</button> --}}
                    </form>                    
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Example Form Submission Logic
    // document.getElementById('productForm').addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     alert('Product Added Successfully!');
    // });
</script>
</body>
</html>
