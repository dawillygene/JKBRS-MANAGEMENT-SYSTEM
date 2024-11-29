    <x-app>
</div>
 @push('css')
<style>
.text-bold {
    font-weight: 800;
}

text-color {
    color: #0093c4;
}

/* Main image - left */
.main-img img {
    width: 100%;
}

/* Preview images */
.previews img {
    width: 100%;
    height: 140px;
}

.main-description .category {
    text-transform: uppercase;
    color: #0093c4;
}

.main-description .product-title {
    font-size: 2.5rem;
}

.old-price-discount {
    font-weight: 600;
}

.new-price {
    font-size: 2rem;
}

.details-title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.2rem;
    color: #757575;
}

.buttons .block {
    margin-right: 5px;
}

.quantity input {
    border-radius: 0;
    height: 40px;

}


.custom-btn {
    text-transform: capitalize;
    background-color: #0093c4;
    color: white;
    width: 150px;
    height: 40px;
    border-radius: 0;
}

.custom-btn:hover {
    background-color: #0093c4 !important;
    font-size: 18px;
    color: white !important;
}

.similar-product img {
    height: 400px;
}

.similar-product {
    text-align: left;
}

.similar-product .title {
    margin: 17px 0px 4px 0px;
}

.similar-product .price {
    font-weight: bold;
}

.questions .icon i {
    font-size: 2rem;
}

.questions-icon {
    font-size: 2rem;
    color: #0093c4;
}


/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {

    /* Make preview images responsive  */
    .previews img {
        width: 100%;
        height: auto;
    }

}
</style>
@endpush

    <div class="container my-5">
        <div class="row">
            <div class="col-md-5">
                <div class="main-img">
                    <img class="img-fluid" src="{{ asset('storage/' . $prod->product_image) }}" alt="ProductS">
                    <div class="row my-3 previews">
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="main-description px-2">
                    <div class="category text-bold">
                        {{ $prod->category }}
                    </div>
                    <div class="product-title text-bold my-3">
                        {{ $prod->title }}
                    </div>


                    <div class="price-area my-4">
                        <p class="old-price mb-1"><del>{{ $prod->price }} </del> <span class="old-price-discount text-danger">(20% off)</span></p>
                        <p class="new-price text-bold mb-1">{{ $prod->price }} </p>
                        <p class="text-secondary mb-1">(Kodi ya ziada inaweza kutumika wakati wa malipo)</p>

                    </div>


                    {{-- <div class="buttons d-flex my-5">
                        <div class="block">
                            <a href="#" class="shadow btn custom-btn ">Wishlist</a>
                        </div>
                        <div class="block">
                            <button class="shadow btn custom-btn">Add to cart</button>
                        </div>

                        <div class="block quantity">
                            <input type="number" class="form-control" id="cart_quantity" value="1" min="0" max="5" placeholder="Enter email" name="cart_quantity">
                        </div>
                    </div> --}}




                </div>

                <div class="product-details my-4">
                    <p class="details-title text-color mb-1">Product Details</p>
                    <p class="description">{{ $prod->description }}</p>
                </div>
              
                         <div class="row questions bg-light p-3">
                    <div class="col-md-1 icon">
                        <i class="fa-brands fa-rocketchat questions-icon"></i>
                    </div>
                    <div class="col-md-11 text">
                        Una swali kuhusu bidhaa zetu kwenye E-Store? Usisite kuwasiliana na wawakilishi wetu kupitia mazungumzo ya moja kwa moja au barua pepe.
                    </div>                    
                </div>

                {{-- <div class="delivery my-4">
                    <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-truck"></i></span> <b>Delivery done in 3 days from date of purchase</b> </p>
                    <p class="text-secondary">Order now to get this product delivery</p>
                </div> --}}
                {{-- <div class="delivery-options my-4">
                    <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-filter"></i></span> <b>Delivery options</b> </p>
                    <p class="text-secondary">View delivery options here</p>
                </div> --}}
                
            </div>
        </div>
    </div>


    </div>


    
</x-app>
