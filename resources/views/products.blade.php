<x-app>

    </div>
    <style>
        .card {
            margin: 5% 0%;
        }

        .card-body {
            margin: 0% 0% 0% 3%;
            padding: 6% 0%;
        }
    </style>













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
                        <div class="card-footer bg-transparent border-0"><a href="#"
                                class="btn btn-success rounded-pill py-2 px-4">Read More</a></div>
                    </div>
                </div>
            @endforeach
        </div>


        <!-- Card deck -->
        <div class="card-deck row">


            @foreach ($product as $prod)
            <div class="col-xs-12 col-sm-6 col-md-4">

             


                    <div class="card">

                        <!--Card image-->
                        <div class="view overlay">
                            <img class="card-img-top" src="{{ asset('storage/' . $prod->product_image) }}"
                                alt="Card image cap">
                            <a href="#!">
                                <div class="mask rgba-white-slight"></div>
                            </a>
                        </div>

                        <!--Card content-->
                        <div class="card-body">

                            <!--Title-->
                            <h4 class="card-title">{{ $prod->title }}</h4>
                            <!--Text-->
                            <p class="card-text">{{ $prod->description }}</p>
                            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                            <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                        </div>

                    </div>
                  
                    <!-- Card -->
            </div>
            @endforeach

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card mb-4">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">2 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
                <!-- Card -->
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card mb-4">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">3 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
                <!-- Card -->
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">4 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
               
             
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card mb-4">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">5 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
                <!-- Card -->
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card mb-4">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">6 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
                <!-- Card -->
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
                <!-- Card -->
                <div class="card mb-4">

                    <!--Card image-->
                    <div class="view overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
                            alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!--Card content-->
                    <div class="card-body">

                        <!--Title-->
                        <h4 class="card-title">7 Card title</h4>
                        <!--Text-->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                        <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                    </div>

                </div>
                <!-- Card -->
            </div>


        </div>
        <!-- Card deck -->

    </div>





</x-app>
