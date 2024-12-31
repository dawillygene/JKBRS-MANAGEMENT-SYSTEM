<x-admin>
    <x-slot:heading>
        View All Messages
    </x-slot:heading>
    <div class="app-content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-md-12">
                    <div class="card card-info card-outline mb-4">
                        <div class="card-header">
                            <div class="card-title">Messages List</div>
                        </div>
                        <div class="card-body">
                            @if($messages->isEmpty())
                                <div class="alert alert-info">No messages have been sent to the system.</div>
                            @else
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Date Sent</th>
                                            <th>Actions</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($messages as $message)
                                            <tr>
                                                <td>{{ $loop->iteration }}</td>
                                                <td>{{ $message->name }}</td>
                                                <td>{{ $message->email }}</td>
                                                <td>{{ $message->subject }}</td>
                                                <td>{{ $message->message }}</td>
                                                <td>{{ $message->created_at->format('d-m-Y H:i') }}</td>
                                                <td>
                                                    <form action="{{ route('messages.destroy', $message->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this message?');">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <div class="mt-3">
                                    {{ $messages->links() }}
                                </div>
                            @endif
                        </div>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
    @include('sweetalert::alert')
</x-admin>
