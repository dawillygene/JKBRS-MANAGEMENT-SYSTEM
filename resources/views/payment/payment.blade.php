<x-app>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Payment Details</h3>
                    </div>
                    <div class="card-body">
                        <form id="payment-form" action="{{ route('process.payment') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="amount">Amount</label>
                                <input type="text" class="form-control" id="amount" name="amount" value="{{ $prod->price }}" readonly>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="text" class="form-control" id="phone" name="phone" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Pay Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app>