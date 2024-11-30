<x-admin> 
<x-slot:heading>
Add Articles
</x-slot:heading>
<div class="app-content">
    <div class="container-fluid">
        <div class="row g-4">
            <div class="col-md-12">
                <div class="card card-info card-outline mb-4">
                    <div class="card-header">
                        <div class="card-title">Add Articles</div>
                    </div>
                    <form class="needs-validation" id="productForm" action="{{ route('articles.store') }}"
                        enctype="multipart/form-data" method="POST" novalidate>
                        @csrf
                        @method('POST')
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-12"> <label for="validationCustom03"
                                        class="form-label">Article Title</label> <input type="text" class="form-control" id="title" name="title" placeholder="Enter article title" required>
                                </div>
                               
                                <div class="col-md-6"> <label for="validationCustom04" class="form-label">Publish Date</label>  <input type="date" class="form-control" id="publish_date" name="publish_date" required>
                                </div>
                                <div class="col-md-6"> <label for="validationCustom02"
                                    class="form-label">Article Image</label> <input type="file" class="form-control" id="image_path" name="image_path" accept="image/*" required>
                            </div>
                            </div>
                            
                            <div class="col-md-12"> <label for="validationCustomUsername"
                                    class="form-label">Description</label>
                                <div class="input-group has-validation">
                                    <textarea class="form-control" id="description" name="description" rows="4" placeholder="Enter article description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer"> <input type="submit" name="save"  class="btn btn-info col-md-12"  value="Save Article"> </div>
                    </form>
                </div> 
            </div> 
        </div> 
    </div>
</div> 
@include('sweetalert::alert')
</x-admin>