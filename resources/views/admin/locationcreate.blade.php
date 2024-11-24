<x-app>
<div class="container">
    <h1>Add locaions</h1>
    <form action="{{ route('locations.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input type="text" name="city" id="city" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">location Name</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">save</button>
    </form>
</div>
</x-app>