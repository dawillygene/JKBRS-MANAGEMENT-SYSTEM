<x-app>

    <style>
        .bg-success {
            background-color: #4CAF50 !important;
            /* Natural green color */
        }

        .text-white-50 {
            color: rgba(255, 255, 255, 0.7);
        }

        .btn-success {
            background-color: #4CAF50;
            border-color: #4CAF50;
        }

        .btn-success:hover {
            background-color: #45A049;
            border-color: #45A049;
        }
    </style>




    {{-- <div class="py-0">
        <div class="container">
            <div class="row align-items-center g-4 pb-lg-5">
                <div class="col-lg-6 col-12 pb-lg-5 pe-lg-5">
                    <div class="text-white text-center text-md-start py-5" data-aos="fade-right" data-aos-duration="1000">
                        <div class="mb-5">
                            <h6 class="fw-light text-white-50 mb-0">NATURAL HERBAL SOLUTIONS</h6>
                            <!-- Main Heading -->
                            <h1 class="fw-bold display-2 py-2">Embrace Nature’s Power for Health</h1>
                            <!-- Description -->
                            <p class="lead pe-lg-5">Discover JKBRS’s range of herbal remedies, crafted from natural and
                                organic materials to support wellness and healing naturally.</p>

                        </div>
                        <a href="#products" class="btn btn-success btn-lg rounded-pill">Discover Products</a>
                    </div>
                </div>
                <div class="col-lg-6 col-12 pb-lg-5">
                    <img src="{{ asset('assets/img/product/banner.png') }}" alt="header-img"
                        class="img-fluid d-block mx-auto" data-aos="fade-left" data-aos-duration="1000">
                </div>
            </div>
        </div>
    </div> --}}
    <div class="py-0">
        <div class="container">
            <div class="row align-items-center g-4 pb-lg-5">
                <!-- Text Section -->
                <div class="col-lg-6 col-12 pb-lg-5 pe-lg-5">
                    <div class="text-white text-center text-md-start py-5" data-aos="fade-right"
                        data-aos-duration="1000">
                        <div class="mb-5">
                            <!-- Subheading -->
                            <h6 class="fw-light text-white-50 mb-0">SULUHU ZA KIASILI ZA MIMEA</h6>
                            <!-- Main Heading -->
                            <h1 class="fw-bold display-2 py-2">Kumbatia Nguvu za Asili kwa Afya</h1>
                            <!-- Description -->
                            <p class="lead pe-lg-5">Gundua bidhaa za JKBRS zilizotengenezwa kwa mimea na malighafi
                                asilia ili kusaidia ustawi na uponyaji wa mwili kwa njia ya kiasili.</p>
                        </div>
                        <!-- Call to Action Button -->
                        <a href="#products" class="btn btn-success btn-lg rounded-pill">Gundua Bidhaa</a>
                    </div>
                </div>
                <!-- Image Section -->
                <div class="col-lg-6 col-12 pb-lg-5">
                    <img src="{{ asset('assets/img/product/banner.png') }}" alt="Picha ya Kichwa"
                        class="img-fluid d-block mx-auto" data-aos="fade-left" data-aos-duration="1000">
                </div>
            </div>
        </div>
    </div>
    </div>


    



    <!-- Promotional Section -->
    <div class="mt-n6">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="bg-success text-white p-5 rounded-5">
                    <div class="row align-items-center justify-content-center g-4">
                        <div class="col-lg-1 col-12">
                            <div class="text-center text-md-start"><i class="ri-leaf-line display-3"></i></div>
                        </div>
                        <div class="col-lg-7">
                            <div class="text-center text-md-start">
                                <h4 class="fw-bold">Pata Punguzo la 10% kwa Oda Yako ya Kwanza ya Bidhaa za Asili!</h4>
                                <p class="mb-0 text-white-50">Pata nguvu ya uponyaji wa kiasili na JKBRS. Salama, asilia, na imetengenezwa maalum kwa ajili yako.</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="text-center text-md-end">
                                <a href="#discount" class="btn btn-light btn-lg rounded-pill">Dai Punguzo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>







    <!-- Category Section -->
    <div class="py-5 bg-light">
        <div class="container py-4">
            <!-- Section Header -->
            <div data-aos="fade-up" data-aos-duration="500" class="row mb-5">
                <div class="col-6 mx-auto">
                    <div class="text-center">
                        <p class="text-secondary-emphasis mb-2 fw-normal text-uppercase">Tiba za Asili za Mimea</p>
                        <h1 class="fw-bold display-5">Kategoria Zetu</h1>
                        <p class="text-muted mb-3">Gundua aina mbalimbali za bidhaa za kiasili zilizotengenezwa kusaidia afya na kuzuia magonjwa kwa nguvu ya asili.</p>
                        <span class="bg-success px-5 mx-auto d-flex pb-2 justify-content-center col-1 rounded-pill"></span>
                    </div>
                </div>
            </div>
    
            <!-- Category Cards -->
            <div class="row g-4 category">
                <!-- Immune Boosters -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card border-0 shadow rounded-5 text-center h-100 p-5" data-aos="zoom-in" data-aos-duration="1000">
                        <div class="card-body">
                            <i class="ri-shield-cross-line display-1 text-success"></i>
                            <h4 class="card-title fw-bold py-3 mb-0">
                                Kinga ya Mwili
                            </h4>
                            <p class="mb-0 small text-muted">Ongeza ulinzi wa mwili wako kwa bidhaa zetu za kiasili za kuimarisha kinga.</p>
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
                <!-- Hormonal Balance -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card border-0 shadow rounded-5 text-center h-100 p-5" data-aos="zoom-in" data-aos-duration="1000">
                        <div class="card-body">
                            <i class="ri-heart-pulse-line display-1 text-success"></i>
                            <h4 class="card-title fw-bold py-3 mb-0">
                                Usawa wa Homoni
                            </h4>
                            <p class="mb-0 small text-muted">Msaada kwa afya ya homoni na uzazi kupitia viungo vya kiasili.</p>
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
                <!-- Skin Care -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card border-0 shadow rounded-5 text-center h-100 p-5" data-aos="zoom-in" data-aos-duration="1000">
                        <div class="card-body">
                            <i class="ri-pantone-line display-1 text-success"></i>
                            <h4 class="card-title fw-bold py-3 mb-0">
                                Huduma ya Ngozi
                            </h4>
                            <p class="mb-0 small text-muted">Suluhu za kiasili kwa ngozi yenye afya na mng’ao, bila kemikali kali.</p>
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
                <!-- Anti-Cancer Support -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card border-0 shadow rounded-5 text-center h-100 p-5" data-aos="zoom-in" data-aos-duration="1000">
                        <div class="card-body">
                            <i class="ri-plant-line display-1 text-success"></i>
                            <h4 class="card-title fw-bold py-3 mb-0">
                                Msaada Dhidi ya Saratani
                            </h4>
                            <p class="mb-0 small text-muted">Tiba za mimea zinazosaidia mwili kupambana na saratani kwa njia ya kiasili.</p>
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  
    <div class="py-5">
        <div class="container py-4">
            <!-- Section Header -->
            <div data-aos="fade-up" data-aos-duration="500" class="row mb-5">
                <div class="col-6 mx-auto">
                    <div class="text-center">
                        <p class="text-secondary-emphasis mb-2 fw-normal text-uppercase">Tiba Zinazopendwa Zaidi</p>
                        <h1 class="fw-bold display-5">Bidhaa Zinazouzwa Zaidi</h1>
                        <span class="bg-success px-5 mx-auto d-flex pb-2 justify-content-center col-1 rounded-pill"></span>
                    </div>
                </div>
            </div>
    
            <!-- Product Cards -->
            <div class="row g-4 g-md-5">
                <!-- Product 1: Kinga ya Mwili -->
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <div class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/best-seller/product-1.jpg') }}"
                                class="card-img-top rounded-5" alt="Kinga ya Mwili">
                        </div>
                        <div class="card-body">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">Kinga ya Mwili</h5>
                            </a>
                            <p class="card-text fw-semibold text-success mb-1">TSh 25,000</p>
                            <small class="card-text">Msaada wa kiasili kwa kinga ya mwili na ustawi wa afya.</small>
                        </div>
                        <div class="card-footer bg-transparent border-0"><a href="#"
                                class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                    </div>
                </div>
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
        </div>
    </div>
    

    <!-- Clients Testimonials -->
    <div class="bg-new-products text-white py-5">
        <div class="container py-4">
            <!-- Section Header -->
            <div data-aos="fade-up" data-aos-duration="500" class="row mb-5">
                <div class="col-6 mx-auto">
                    <div class="text-center">
                        <p class="text-white-50 mb-2 fw-normal text-uppercase">MAONI YA WATEJA WETU</p>
                        <h1 class="fw-bold display-5">Maoni ya Wateja</h1>
                        <span class="bg-success px-5 mx-auto d-flex pb-2 justify-content-center col-1 rounded-pill"></span>
                    </div>
                </div>
            </div>
    
            <!-- Testimonials Cards -->
            <div class="row g-4">
                <!-- Testimonial 1 -->
                <div class="col-lg-4 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center p-4 h-100" data-aos="fade-up"
                        data-aos-duration="1300">
                        <img src="{{ asset('assets/img/testimonials/client-1.jpg') }}" alt="testimonial"
                            class="img-fluid rounded-circle d-block mx-auto testimonial-img">
                        <div class="card-body mt-3">
                            <p class="card-title lead">"Baada ya kutumia JOY kwa usawa wa homoni, najisikia kuwa na afya njema zaidi na mwili wangu kuwa sawa. Uzoefu wa kubadilisha maisha kabisa!"</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <p class="text-success mb-0">Maria N., Dar es Salaam</p>
                        </div>
                    </div>
                </div>
    
                <!-- Testimonial 2 -->
                <div class="col-lg-4 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center p-4 h-100" data-aos="fade-up"
                        data-aos-duration="1300">
                        <img src="{{ asset('assets/img/testimonials/client-2.jpg') }}" alt="testimonial"
                            class="img-fluid rounded-circle d-block mx-auto testimonial-img">
                        <div class="card-body mt-3">
                            <p class="card-title lead">"ALLERGEX imenisaidia kudhibiti mzio wangu kiasili. Nashukuru sana kwa suluhisho hili la mimea linalotegemewa!"</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <p class="text-success mb-0">John D., Arusha</p>
                        </div>
                    </div>
                </div>
    
                <!-- Testimonial 3 -->
                <div class="col-lg-4 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center p-4 h-100" data-aos="fade-up"
                        data-aos-duration="1300">
                        <img src="{{ asset('assets/img/testimonials/client-3.jpg') }}" alt="testimonial"
                            class="img-fluid rounded-circle d-block mx-auto testimonial-img">
                        <div class="card-body mt-3">
                            <p class="card-title lead">"Kidonge cha TANZAX kwa Afya ya Figo kimeboresha afya yangu sana. Ninapendekeza sana bidhaa za JKBRS!"</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <p class="text-success mb-0">Fatma H., Zanzibar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <!-- Popular articles about pets -->
    <div class="py-5 bg-light">
        <div class="container py-4">
            <!-- Section Header -->
            <div data-aos="fade-up" data-aos-duration="500" class="row mb-5">
                <div class="col-6 mx-auto">
                    <div class="text-center">
                        <p class="text-secondary-emphasis mb-2 fw-normal text-uppercase">AFYA NA USTAWI</p>
                        <h1 class="fw-bold display-5">Makala Maarufu</h1>
                        <span class="bg-success px-5 mx-auto d-flex pb-2 justify-content-center col-1 rounded-pill"></span>
                    </div>
                </div>
            </div>
    
            <!-- Articles Cards -->
            <div class="row g-4">
                <!-- Article 1 -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-5 zoom-img overflow-hidden" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <a href="#" class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/articles/herbal-benefits.jpg') }}"
                                class="card-img-top rounded-5" alt="Faida za Tiba za Asili">
                        </a>
                        <div class="card-body px-0">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">Faida 10 za Juu za Tiba za Mimea</h5>
                            </a>
                            <p class="card-text"><small class="text-secondary">NOVEMBA 20, 2024</small></p>
                        </div>
                    </div>
                </div>
                <!-- Article 2 -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-5 zoom-img overflow-hidden" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <a href="#" class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/articles/hormonal-balance.jpg') }}"
                                class="card-img-top rounded-5" alt="Usawa wa Homoni">
                        </a>
                        <div class="card-body px-0">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">Kufikia Usawa wa Homoni Kiasili</h5>
                            </a>
                            <p class="card-text"><small class="text-secondary">NOVEMBA 12, 2024</small></p>
                        </div>
                    </div>
                </div>
                <!-- Article 3 -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-5 zoom-img overflow-hidden" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <a href="#" class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/articles/immune-support.jpg') }}"
                                class="card-img-top rounded-5" alt="Msaada kwa Kinga ya Mwili">
                        </a>
                        <div class="card-body px-0">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">Jinsi Virutubisho vya Mimea Vinavyosaidia Kinga</h5>
                            </a>
                            <p class="card-text"><small class="text-secondary">NOVEMBA 5, 2024</small></p>
                        </div>
                    </div>
                </div>
                <!-- Article 4 -->
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-5 zoom-img overflow-hidden" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <a href="#" class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/articles/detox-benefits.jpg') }}"
                                class="card-img-top rounded-5" alt="Faida za Detox">
                        </a>
                        <div class="card-body px-0">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">Nguvu ya Detox: Kusafisha Mwili Kiasili</h5>
                            </a>
                            <p class="card-text"><small class="text-secondary">OKTOBA 28, 2024</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    


    <!-- New Products Arrival Section -->
    <div class="py-5">
        <div class="container py-4">
            <!-- Section Header -->
            <div data-aos="fade-up" data-aos-duration="500" class="row mb-5">
                <div class="col-6 mx-auto">
                    <div class="text-center">
                        <p class="text-secondary-emphasis mb-2 fw-normal text-uppercase">Suluhisho Mpya za Mimea</p>
                        <h1 class="fw-bold display-5">Bidhaa Mpya Zilizowasili</h1>
                        <span class="bg-success px-5 mx-auto d-flex pb-2 justify-content-center col-1 rounded-pill"></span>
                    </div>
                </div>
            </div>
    
            <!-- Product Cards -->
            <div class="row g-4">
                <!-- Product 1: WOUNDEX -->
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <a href="#" class="position-relative">
                            <div class="overflow-hidden rounded-5">
                                <img src="{{ asset('assets/img/new-products/woundex.jpg') }}"
                                    class="card-img-top rounded-5" alt="WOUNDEX Bidhaa ya Mimea">
                                <span class="badge text-bg-success rounded-pill p-2 m-3 position-absolute start-0">MPYA</span>
                            </div>
                        </a>
                        <div class="card-body">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">WOUNDEX - Huduma ya Majeraha</h5>
                            </a>
                            <p class="card-text fw-semibold text-success mb-1">TSh 20,000</p>
                            <small class="card-text">Kwa Majeraha na Mikwamo</small>
                        </div>
                        <div class="card-footer bg-transparent border-0"><a href="#"
                                class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                    </div>
                </div>
    
                <!-- Product 2: TIPHOX -->
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <div class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/new-products/tiphox.jpg') }}"
                                class="card-img-top rounded-5" alt="TIPHOX Bidhaa ya Mimea">
                        </div>
                        <div class="card-body">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">TIPHOX - Tiba ya Typhoid</h5>
                            </a>
                            <p class="card-text fw-semibold text-success mb-1">TSh 25,000</p>
                            <small class="card-text">Matibabu ya Typhoid</small>
                        </div>
                        <div class="card-footer bg-transparent border-0"><a href="#"
                                class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                    </div>
                </div>
    
                <!-- Product 3: GOTEX -->
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card bg-transparent border-0 rounded-0 text-center zoom-img" data-aos="zoom-in"
                        data-aos-duration="1000">
                        <div class="overflow-hidden rounded-5">
                            <img src="{{ asset('assets/img/new-products/gotex.jpg') }}"
                                class="card-img-top rounded-5" alt="GOTEX Bidhaa ya Mimea">
                        </div>
                        <div class="card-body">
                            <a href="#">
                                <h5 class="card-title fw-bold pb-2">GOTEX - Tiba ya Arthritis</h5>
                            </a>
                            <p class="card-text fw-semibold text-success mb-1">TSh 30,000</p>
                            <small class="card-text">Kwa Arthritis & Gout</small>
                        </div>
                        <div class="card-footer bg-transparent border-0"><a href="#"
                                class="btn btn-success rounded-pill py-2 px-4">Ongeza kwenye Kikapu</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Newsletter Updates Section -->
    <div class="py-0 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="py-5" data-aos="fade-up" data-aos-duration="1000">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-lg-6 col-12">
                                <div class="text-center text-md-start">
                                    <div class="mb-4">
                                        <h1 class="fw-bold text-dark">Pata Habari Kuhusu Afya ya Kiasili</h1>
                                        <p>Jiandikishe kwenye jarida letu kwa taarifa kuhusu bidhaa mpya, vidokezo vya afya, na faida za uponyaji wa asili.</p>
                                    </div>
                                    <form class="d-grid d-md-flex gap-3">
                                        <input class="form-control rounded-pill py-3 px-4 shadow-none border-0"
                                            type="text" placeholder="Barua pepe" aria-label="email">
                                        <button class="btn btn-success rounded-pill py-2 px-5">Jiandikishe</button>
                                    </form>
                                    <p class="text-secondary pt-3 mb-0">Tunaheshimu faragha yako na tutakutumia taarifa za afya tu.</p>
                                </div>
                            </div>
                            <div class="col-lg-5 col-12 d-none d-lg-block">
                                <img src="{{ asset('assets/img/product/image2.png') }}" width="50%"
                                    alt="Jarida la Afya ya Kiasili" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

</x-app>
