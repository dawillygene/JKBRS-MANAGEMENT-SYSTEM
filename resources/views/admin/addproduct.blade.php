<x-app>
</div>

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
                    </form>                    
                </div>
            </div>
        </div>
    </div>
</div>
@include('sweetalert::alert')
</x-app>

