

<x-app>

</div>

<div class="container mt-5">
    <h2 class="mb-4">Add New Article</h2>
    <form action="{{ route('articles.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
            <label for="title" class="form-label">Article Title</label>
            <input type="text" class="form-control" id="title" name="title" placeholder="Enter article title" required>
        </div>
        <div class="mb-3">
            <label for="image_path" class="form-label">Article Image</label>
            <input type="file" class="form-control" id="image_path" name="image_path" accept="image/*" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" rows="4" placeholder="Enter article description"></textarea>
        </div>
        <div class="mb-3">
            <label for="publish_date" class="form-label">Publish Date</label>
            <input type="date" class="form-control" id="publish_date" name="publish_date" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Article</button>
    </form>
</div>
</x-app>