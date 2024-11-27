<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="" type="image/png">
        <title>{{ config('app.name' , 'jkbrs Interntional') }}</title>
        <link rel="stylesheet" href="{{ asset("assets/css/bootstrap.min.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/icofont.min.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/aos.css") }}">
        <link rel="stylesheet" href="{{ asset('assets/css/remixicon.css') }}">
        <link rel="stylesheet" href="{{ asset("assets/css/style.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/common.css") }}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.css">
        <style>
.navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.9) !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
    color: #fff !important;
}

/* Mobile Styles */
@media (max-width: 991.98px) {
    .navbar-collapse {
        background: linear-gradient(
        135deg,
        #198754 0%,
        #25a065 25%,
        #989c97 75%,
        #bebbb8 100%
    );
        /* padding: 1rem; */
        position: absolute;
        top: 100%;
        text-align: center;
        left: 15%;
        right: 15%;
        border-radius: 0 0 10% 10%;
        z-index: 100;
    }

   
}

        </style>
        @stack('css')
    </head>
    <body>
       
        <div class="page-loading active">
            <div class="page-loading-inner">
                <div class="page-spinner"></div>
                <span>Loading...</span>
            </div>
        </div>

        <div class="homepage">
           
            <div class="sticky-top"> 
            <nav class="navbar osahan-main-nav navbar-expand-lg pets-nav p-0">
                <div class="container-fluid bg-success py-lg-0 py-3">
                    <div class="position-relative d-flex align-items-center gap-2 site-brand">
                        <i class="ri-baidu-line fs-2 lh-1 text-danger"></i>
                        <div class="lh-1">
                            <h5 class="fw-bold m-0 text-white">JKBRS INTERNATIONAL</h5>
                            <small class="text-white-50">Jkbrs</small>
                        </div>
                        <a class="stretched-link" href="{{ route('home') }}"></a>
                    </div>
                    <button class="navbar-toggler border-0 d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e8eaed"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarContent">
                        <ul class="navbar-nav ms-auto gap-4">
                            <li class="nav-item">
                                <a class="nav-link active text-white" href="{{ route('home') }}">
                                    <i class="ri-apps-2-line"></i> Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="{{ route('product') }}">Products</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="{{ route('about') }}">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="{{ route('contact') }}">Contact</a>
                            </li>
                        </ul>
                        <div class="d-flex align-items-center gap-4 ms-auto ms-lg-0 ps-4">
                            <a href="tel:+255753185543" class="link-light d-none d-lg-block">
                                (+255) 753 185 543
                            </a>
                            <a href="#" class="link-light d-none d-lg-block">
                                <i class="ri-account-circle-line ri-lg"></i>
                            </a>
                            <a href="#" class="link-light">
                                <i class="ri-shopping-bag-3-line ri-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div class="offcanvas offcanvas-end" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
                <div class="offcanvas-header bg-success">
                    <h5 class="offcanvas-title text-white" id="sidebarLabel">Menu</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="nav flex-column  gap-1">
                        <li class="nav-item">
                            <a class="nav-link bg-danger" href="{{ route('home') }}">
                               Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('product') }}">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('about') }}">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('contact') }}">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="tel:+255753185543">
                                <i class="ri-phone-line me-2"></i>(+255) 753 185 543
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            @if (Route::currentRouteName() === 'home')
            <div class="navbar osahan-main-nav navbar-expand pets-nav p-0 mb-0">
                <img src="{{ asset('assets/img/head-bgi.png') }}" alt="">
            </div>
        @endif
        
</div>           

            {{ $slot }}


       <x-footer />
       @include('sweetalert::alert')
        @stack('scripts')
        <script data-cfasync="true" src="{{ asset("assets/js/email-decode.min.js") }}"></script>
        <script src="{{ asset("assets/js/bootstrap.bundle.min.js") }}"></script>
        <script src="{{ asset("assets/js/jquery-3.6.4.min.js") }}"></script>
        <script src="{{ asset("assets/js/aos.js") }}"></script>
        <script src="{{ asset("assets/js/script.js") }}"></script>
    </body>
</html>
