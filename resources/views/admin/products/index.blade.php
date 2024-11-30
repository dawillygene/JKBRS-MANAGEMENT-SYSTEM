<x-admin>
<x-slot:heading>
    List all products
</x-slot:heading>
<div class="app-content">
    <div class="container-fluid">
        <div class="row g-4">
            <div class="col-md-12">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3 class="card-title">List of All Products</h3>
                    </div>
                    <div class="card-body p-0">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Name</th>
                                    <th>description</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($product as $prod)
                                <tr class="align-middle">
                                    <td>   <img src="{{ asset('storage/' . $prod->product_image) }}" alt="{{ $prod->product_name }}"
                                        width="100px" alt="Kinga ya Mwili" ></td>
                                    <td>{{ $prod->title }}</td>
                                    <td>
                                        <p>{{ $prod->description }}</p>
                                    </td>
                                    <td>
                                   
                                        <div class="d-flex gap-2">
                                            {{-- <a href="{{ route('admin.editproduct',$prod->encrypted_id) }}" class="btn btn-primary mb-2">View</a> --}}
                                            <a href="{{ route('admin.editproduct',$prod->encrypted_id) }}" class="btn btn-warning mb-2">Edit</a>

                                            <form action="{{ route('products.delete', $prod->encrypted_id) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this product?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger mb-2">Delete</button>
                                            </form>
                                        </div>
                                        
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>
</div> 
@include('sweetalert::alert')
</x-admin>