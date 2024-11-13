<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="" type="image/png">
        <title>jkbrs Interntional</title>

        <link rel="stylesheet" href="{{ asset("assets/css/bootstrap.min.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/icofont.min.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/aos.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/remixicon.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/style.css") }}">
        <link rel="stylesheet" href="{{ asset("assets/css/common.css") }}">

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
                <div class="container py-lg-0 py-3">
                    <div class="position-relative d-flex align-items-center gap-2 site-brand">
                        <i class="ri-baidu-line fs-2 lh-1 text-danger"></i>
                        <div class="lh-1">
                            <h5 class="fw-bold m-0 text-white">JKBRS INTERNATIONAL</h5>
                            <small class="text-white-50">Jkbrs</small>
                        </div>
                        <a class="stretched-link" href="index.html"></a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto gap-4 m-none">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" data-bs-toggle="offcanvas" href="#" role="button" aria-controls=""><i class="ri-apps-2-line"></i> All Demos</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                        </ul>
                        <div class="d-flex align-items-center gap-4 ms-auto ms-lg-0 ps-4">
                            <a href="#" class="link-danger d-none d-lg-block">(+255) 753 185 543</a>
                            <a href="#" class="link-light d-none d-lg-block"><i class="ri-account-circle-line ri-lg"></i></a>
                            <a href="#" class="link-light"><i class="ri-shopping-bag-3-line ri-lg"></i></a>
                            <a href="#" class="link-light d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar"><i class="ri-menu-3-line ri-lg"></i></a>
                        </div>
                    </div>
                </div>
            </nav>
            <!-- Header -->          

            {{ $slot }}


        <!-- footer -->
        <footer class="bg-footer text-white">
            <div class="container py-5 top-footer">
                <div class="row g-4 py-4">
                    <div class="col-lg-3">
                        <h5 class="fw-bold pb-3">Categories</h5>
                        <ul class="list-unstyled d-grid gap-2 text-white-50">
                            <li class="text-secondary-emphasis"><a href="#">Costumers</a> (5)</li>
                            <li class="text-secondary-emphasis"><a href="#">Food</a> (3)</li>
                            <li class="text-secondary-emphasis"><a href="#">Toys</a> (3)</li>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-6">
                        <h5 class="fw-bold pb-3">Contacts</h5>
                        <ul class="list-unstyled d-grid gap-2 text-white-50">
                            <li>Phone: (+255) 753 185 543 / 0742 700 700</li>
                            <li>P.O.BOX: 32284 , Dar es saalam</li>
                            <li>Email: <a href="#" class="__cf_email__">info@jkbrstanzania.co.tz</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-12">
                        <h5 class="fw-bold pb-3">Opening Hours</h5>
                        <ul class="list-unstyled d-grid gap-2 text-white-50">
                            <li>Mon - Fri: 10am - 8pm</li>
                            <li>Sat: 10am - 4pm</li>
                            <li>Sun: 10am - 6pm</li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-12 ps-lg-5">
                        <div class="mb-4">
                            <h5 class="fw-bold pb-3">Sign up for our newsletter</h5>
                            <p class="text-white-50">Get the latest deals and offers right to your inbox.</p>
                        </div>
                        <form class="d-flex overflow-hidden rounded-pill">
                            <input class="form-control border-0 rounded-0 py-2 px-4" type="text" placeholder="Enter Email Address" aria-label="subscribe"> <button class="btn btn-danger rounded-0 py-2 px-4" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="border-white border-top border-opacity-25 py-4 footer-app">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-auto">
                            <div class="d-flex align-items-center gap-3">
                                <p class="m-0 text-white-50 small pe-2">Payment Partners</p>
                                <div class="d-flex align-items-center gap-3">
                                    <i class="ri-paypal-line"></i> <i class="ri-visa-line fs-3"></i> <i class="ri-mastercard-line"></i> <i class="ri-bit-coin-line"></i> <i class="ri-bank-card-line"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="d-flex align-items-center justify-content-end gap-2">
                                <p class="m-0 text-white-50 small pe-2">Get deliveries with App</p>
                                <div class="d-flex align-items-center gap-3">
                                    <a class="text-white" href="#"><i class="ri-apple-line"></i></a> <a class="text-white" href="#"><i class="ri-google-play-line"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-light py-4 footer-copyright">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-auto">
                            <p class="text-center text-muted m-0">Copyright © <a href="#" class="text-black">Jkbrs Interntional</a> 2024</p>
                        </div>
                        <div class="col-auto">
                            <div class="d-flex align-items-center gap-3 social-links">
                                <p class="m-0 text-muted pe-1">Follow us</p>
                                <a href="#" class="link-secondary"><i class="ri-facebook-circle-fill"></i></a> <a href="#" class="link-secondary"><i class="ri-twitter-fill"></i></a>
                                <a href="#" class="link-secondary"><i class="ri-instagram-fill"></i></a> <a href="#" class="link-secondary"><i class="ri-mail-fill"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <script data-cfasync="true" src="{{ asset("assets/js/email-decode.min.js") }}"></script>
        <script src="{{ asset("assets/js/bootstrap.bundle.min.js") }}"></script>
        <script src="{{ asset("assets/js/jquery-3.6.4.min.js") }}"></script>
        <script src="{{ asset("assets/js/aos.js") }}"></script>
        <script src="{{ asset("assets/js/script.js") }}"></script>
    </body>
</html>
