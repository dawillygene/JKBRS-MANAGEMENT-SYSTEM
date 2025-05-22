<x-admin> 
    <x-slot:heading>
    Add Location
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card card-info card-outline mb-4">
                        <div class="card-header">
                            <div class="card-title">Add Location:</div>
                        </div>
                        <form class="needs-validation" action="{{ route('locations.store') }}" method="POST" novalidate>
                            @csrf
                            @method('POST')
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6"> <label for="validationCustom03"
                                            class="form-label">City Name</label>
                                            <input type="text" name="city" id="city" class="form-control" required>
                                    </div>
                                   
                                    <div class="col-md-6"> <label for="validationCustom04" class="form-label">Location Name</label>  
                                        <input type="text" name="name" id="name" class="form-control" required>
                                    </div>
                                 </div>
                                 <div class="col-md-12"> <label for="validationCustomUsername"
                                        class="form-label">Description</label>
                                    <div class="input-group has-validation">
                                        <textarea name="description" id="description" class="form-control" rows="3"></textarea>
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