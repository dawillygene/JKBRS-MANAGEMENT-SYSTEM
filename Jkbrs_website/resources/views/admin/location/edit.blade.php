<x-admin> 
    <x-slot:heading>
    Edit Location
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card card-info card-outline mb-4">
                        <div class="card-header">
                            <div class="card-title">Edit Location:</div>
                        </div>
                        <form class="needs-validation" action="{{ route('locations.update',$id) }}" method="POST" novalidate>
                            @csrf
                            @method('PUT')
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6"> <label for="validationCustom03"
                                            class="form-label">City Name</label>
                                            <input type="text" name="city" value="{{ $location->city }}" class="form-control" required>
                                    </div>
                                   
                                    <div class="col-md-6"> <label for="validationCustom04" class="form-label">Location Name</label>  
                                        <input type="text" name="name" value="{{ $location->name }}" class="form-control" required>
                                    </div>
                                 </div>
                                 <div class="col-md-12"> <label for="validationCustomUsername"
                                        class="form-label">Description</label>
                                    <div class="input-group has-validation">
                                        <textarea name="description" id="description" class="form-control" rows="3">{{ $location->description }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer"> <input type="submit" name="save"  class="btn btn-info col-md-12"  value="Update Article"> </div>
                        </form>
                    </div> 
                </div> 
            </div> 
        </div>
    </div> 
    @include('sweetalert::alert')
    </x-admin>