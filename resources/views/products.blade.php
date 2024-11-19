<x-app>

    </div>
<style>
    .card{
  margin: 5% 0%;
}

.card-body{
  margin: 0% 0% 0% 3%;
  padding: 6% 0%;
}

</style>













    <div class="container">

        
        <div class="row g-4 g-md-5">
            <!-- Product 1: Kinga ya Mwili -->
            
            
            @foreach ($product as $prod)
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <div class="overflow-hidden rounded-5">
                        <img src="{{ asset('storage/'.$prod->product_image) }}" alt="{{ $prod->product_name }}"
                            class="card-img-top rounded-5" alt="Kinga ya Mwili">
                    </div>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">{{ $prod->title }}</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">{{ $prod->price }}</p>
                        <small class="card-text">{{ $prod->description }}</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
            @endforeach
            




            <!-- Product 2: Tiba ya Mzio & Pumu -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <a href="#" class="position-relative">
                        <div class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                                class="card-img-top rounded-5" alt="Tiba ya Mzio & Pumu">
                            <span
                                class="badge text-bg-success rounded-pill p-2 m-3 position-absolute start-0">SALE</span>
                        </div>
                    </a>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">Tiba ya Mzio & Pumu</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">TSh 20,000 <del
                                class="small fw-normal text-secondary-emphasis">TSh 30,000</del></p>
                        <small class="card-text">Msaada kwa mzio na matatizo ya upumuaji.</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
            <!-- Product 3: Afya ya Ini -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <div class="overflow-hidden rounded-5">
                        <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                            class="card-img-top rounded-5" alt="Afya ya Ini">
                    </div>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">Afya ya Ini</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">TSh 18,000</p>
                        <small class="card-text">Mchanganyiko wa mimea kwa kusaidia ini na detox.</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
            <!-- Product 4: Usawa wa Homoni -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <div class="overflow-hidden rounded-5">
                        <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                            class="card-img-top rounded-5" alt="Usawa wa Homoni">
                    </div>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">Usawa wa Homoni</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">TSh 22,000</p>
                        <small class="card-text">Msaada wa kiasili kwa afya ya homoni.</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
            <!-- Product 5: Suluhisho la Ngozi -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <div class="overflow-hidden rounded-5">
                        <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                            class="card-img-top rounded-5" alt="Suluhisho la Ngozi">
                    </div>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">Suluhisho la Ngozi</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">TSh 19,000</p>
                        <small class="card-text">Tiba ya asili kwa ngozi yenye mng’ao.</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
            <!-- Product 6: Msaada wa Kiasili Dhidi ya Saratani -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                    data-aos-duration="1000">
                    <div class="overflow-hidden rounded-5">
                        <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                            class="card-img-top rounded-5" alt="Msaada Dhidi ya Saratani">
                    </div>
                    <div class="card-body">
                        <a href="#">
                            <h5 class="card-title fw-bold pb-2">Msaada Dhidi ya Saratani</h5>
                        </a>
                        <p class="card-text fw-semibold text-success mb-1">TSh 35,000</p>
                        <small class="card-text">Msaada wa kiasili kwa ulinzi wa mwili.</small>
                    </div>
                    <div class="card-footer bg-transparent border-0"><a href="#"
                            class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                </div>
            </div>
        </div>


        <!-- Card deck -->
        <div class="card-deck row">
        
          <div class="col-xs-12 col-sm-6 col-md-4">

            
          <!-- Card -->
          <div class="card">
        
            <!--Card image-->
            <div class="view overlay">
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">1 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">2 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">3 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">4 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">5 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">6 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
              <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <!--Card content-->
            <div class="card-body">
        
              <!--Title-->
              <h4 class="card-title">7 Card title</h4>
              <!--Text-->
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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