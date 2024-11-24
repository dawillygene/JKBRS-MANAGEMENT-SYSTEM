<x-app>
    </div>
<div class="container">
    <h1>Locations</h1>
    <a href="{{ route('locations.create') }}" class="btn btn-primary mb-3">Add New locations</a>
    <div class="row">
        @foreach($locations as $loc)
        <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">{{ $loc->city }}</h5>
                    <p class="card-text">
                        <strong>{{ $loc->name }}</strong><br>
                        {{ $loc->description }}
                    </p>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
</x-app>
