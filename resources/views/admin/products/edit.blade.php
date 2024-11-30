<x-admin>
    <x-slot:heading>
        Edit Product
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card card-info card-outline mb-4">
                        <div class="card-header">
                            <div class="card-title">Edit products : </div>
                        </div>
                        <form class="needs-validation" id="productForm" action="{{ route('products.update', $id) }}"
                            enctype="multipart/form-data" method="POST" novalidate>
                            @csrf
                            @method('PUT')
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6"> <label for="validationCustom01" class="form-label">Product
                                            Name</label> <input type="text" name="productName" class="form-control"
                                            value="{{ $product->product_name }}" required>
                                    </div>
                                    <div class="col-md-6"> <label for="validationCustom03"
                                            class="form-label">Title</label> <input type="text" name="productTitle"
                                            value="{{ $product->title }}" class="form-control" required>
                                    </div>
                                    <div class="col-md-6"> <label for="validationCustom02"
                                            class="form-label">Price</label> <input type="number" name="productPrice"
                                            value="{{ $product->price }}" class="form-control" required>
                                    </div>
                                    <div class="col-md-6"> <label for="validationCustom04" class="form-label">Product
                                            Image</label> <input type="file" class="form-control" name="productImage"
                                            value="{{ $product->product_image }}" id="productImage" accept="image/*"
                                            required>
                                    </div>
                                </div>
                                <div class="col-md-12"> <label for="validationCustomUsername"
                                        class="form-label">Description</label>
                                    <div class="input-group has-validation">
                                        <textarea class="form-control" id="productDescription" name="productDescription" rows="3" required>{{ old('productDescription', $product->description) }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer"> <input type="submit" name="save"
                                    class="btn btn-info col-md-12" value="save changes"> </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('sweetalert::alert')
</x-admin>
