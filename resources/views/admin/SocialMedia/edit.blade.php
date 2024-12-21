<x-admin>
    <x-slot:heading>
        Edit Social Media Link
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card card-info card-outline mb-4">
                        <div class="card-header">
                            <div class="card-title">Edit Social Media Link:</div>
                        </div>
                        <form class="needs-validation" id="socialMediaForm" 
                              action="{{ route('social-media-links.update', $link->id) }}" 
                              method="POST" novalidate>
                            @csrf
                            @method('PUT')
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="platform" class="form-label">Platform</label>
                                        <input type="text" name="platform" class="form-control"
                                               value="{{ old('platform', $link->platform) }}" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="url" class="form-label">URL</label>
                                        <input type="url" name="url" class="form-control"
                                               value="{{ old('url', $link->url) }}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <input type="submit" name="save" class="btn btn-info col-md-12" value="Save Changes">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('sweetalert::alert')
</x-admin>
