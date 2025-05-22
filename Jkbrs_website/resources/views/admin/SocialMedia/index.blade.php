<x-admin>
    <x-slot:heading>
        Manage Social Media Links
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title">List of All Social Media Links</h3>
                        </div>
                        <div class="card-body p-0">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Platform</th>
                                        <th>URL</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($links as $link)
                                        <tr class="align-middle">
                                            <td>{{ $loop->iteration }}</td>
                                            <td>{{ $link->platform }}</td>
                                            <td>
                                                <a href="{{ $link->url }}" target="_blank">{{ $link->url }}</a>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <a href="{{ route('social-media-links.edit', $link->id) }}"
                                                        class="btn btn-warning mb-2">Edit</a>

                                                    <form action="{{ route('social-media-links.destroy', $link->id) }}"
                                                        method="POST" class="d-inline"
                                                        onsubmit="return confirm('Are you sure you want to delete this link?');">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit"
                                                            class="btn btn-danger mb-2">Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                
                    <div>{{ $links->links() }}</div>
            
                </div>
            </div>
        </div>
    </div>
    @include('sweetalert::alert')
</x-admin>
