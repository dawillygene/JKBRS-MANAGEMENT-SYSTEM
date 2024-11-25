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
        <link rel="icon" href="{{ asset("assets/css/remixicon.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/style.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/common.css") }}">
        @stack('css')
    </head>
    <body>
        <!-- Page loading spinner -->
        <div class="page-loading active">
            <div class="page-loading-inner">
                <div class="page-spinner"></div>
                <span>Loading...</span>
            </div>
        </div>
        <div class="homepage">
            <!-- navbar -->
            <nav class="navbar osahan-main-nav navbar-expand pets-nav p-0">
                <div class="container-fluid bg-success py-lg-0 py-3">
                    <div class="position-relative d-flex align-items-center gap-2 site-brand">
                        <i class="ri-baidu-line fs-2 lh-1 text-danger"></i>
                        <div class="lh-1">
                            {{-- <img src="{{ asset('assets/img/logo.jpeg') }}" width="20px" alt=""> --}}
                            <h5 class="fw-bold m-0 text-white">JKBRS INTERNATIONAL</h5>
                            <small class="text-white-50">Jkbrs</small>
                        </div>
                        <a class="stretched-link" href="{{ route('home') }}"></a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto gap-4 m-none">
                            <li class="nav-item">
                                <a class="nav-link active" href="{{ route("home") }}"><i class="ri-apps-2-line"></i>Home</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="{{ route("product") }}">Products</a></li>
                            <li class="nav-item"><a class="nav-link" href="{{ route("about") }}">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="{{ route("contact") }}">Contact</a></li>
                        </ul>
                        <div class="d-flex align-items-center gap-4 ms-auto ms-lg-0 ps-4">
                            <a href="#" class="link-light d-none d-lg-block">(+255) 753 185 543</a>
                            <a href="#" class="link-light d-none d-lg-block"><i class="ri-account-circle-line ri-lg"></i></a>
                            <a href="#" class="link-light"><i class="ri-shopping-bag-3-line ri-lg"></i></a>
                            <a href="#" class="link-light d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar"><i class="ri-menu-3-line ri-lg"></i></a>
                        </div>
                    </div>
                </div>
            </nav>
        
                  

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
