<x-app>
    </div>
     
    <div class="py-2"></div>

    <div class="container">
        <div class="row g-4 g-md-5">
            @foreach ($product as $prod)
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <div class="overflow-hidden rounded-5">
                            <img src="{{ asset('storage/' . $prod->product_image) }}" alt="{{ $prod->product_name }}"
                                class="card-img-top rounded-5" alt="Kinga ya Mwili">
                        </div>
                        <div class="card-body">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">{{ $prod->title }}</h5>
                            </a>
                            <p class="card-text fw-semibold text-success mb-1">{{ $prod->price }} Tsh</p>
                            <small class="card-text">{{ $prod->description }}</small>
                        </div>
                        <div class="card-footer bg-transparent border-0"><a href="{{ route('productdetail', $prod->encrypted_id) }}"
                                class="btn btn-success rounded-pill py-2 px-4">Read More</a></div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

</x-app>
