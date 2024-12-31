<footer class="bg-success text-white">
    <div class="container py-5 top-footer">
        <div class="row g-4 py-4">
            <div class="col-lg-3">
                <h5 class="fw-bold pb-3">Makundi</h5>
                <ul class="list-unstyled d-grid gap-2 text-white-50">
                    <li class="text-secondary-emphasis"><a href="#">Wateja</a> (5)</li>
                    <li class="text-secondary-emphasis"><a href="{{ route('dashboard') }}">Wafanyakazi</a> (3)</li>
                    <li class="text-secondary-emphasis"><a href="#">Wasambazaji</a> (3)</li>
                </ul>
            </div>
            <div class="col-lg-3 col-6">
                <h5 class="fw-bold pb-3">Mawasiliano</h5>
                <ul class="list-unstyled d-grid gap-2 text-white-50">
                    <li>Simu: (+255) 753 185 543 / 0742 700 700</li>
                    <li>P.O.BOX: 32284, Dar es Salaam</li>
                    <li>Barua Pepe: <a href="#" class="_cf_email_">info@jkbrstanzania.co.tz</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-12">
                <h5 class="fw-bold pb-3">Masaa ya Kufanya Kazi</h5>
                <ul class="list-unstyled d-grid gap-2 text-white-50">
                    <li>Jumatatu - Ijumaa: 10am - 8pm</li>
                    <li>Jumamosi: 10am - 4pm</li>
                    <li>Jumapili: 10am - 6pm</li>
                </ul>
            </div>
            <div class="col-lg-4 col-12 ps-lg-5">
                <div class="mb-4">
                    <h5 class="fw-bold pb-3">Jiandikishe kwa jarida letu la habari</h5>
                    <p class="text-white-50">Pata ofa na punguzo mpya moja kwa moja kwenye barua pepe yako.</p>
                </div>
                <form class="d-flex overflow-hidden rounded-pill">
                    <input class="form-control border-0 rounded-0 py-2 px-4" type="text"
                        placeholder="Ingiza Anwani ya Barua pepe" aria-label="subscribe">
                    <button class="btn btn-danger rounded-0 py-2 px-4" type="submit">Jiandikishe</button>
                </form>
            </div>
        </div>
    </div>
    <div class="border-white border-top border-opacity-25 py-4 footer-app">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-auto">
                    <div class="d-flex align-items-center gap-3">
                        <p class="m-0 text-white-50 small pe-2">Washirika wa Malipo</p>
                        <div class="d-flex align-items-center gap-3">
                            <i class="ri-paypal-line"></i>
                            <i class="ri-visa-line fs-3"></i>
                            <i class="ri-mastercard-line"></i>
                            <i class="ri-bit-coin-line"></i>
                            <i class="ri-bank-card-line"></i>
                        </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="d-flex align-items-center justify-content-end gap-2">
                        <p class="m-0 text-white-50 small pe-2">Pata usafirishaji kwa App</p>
                        <div class="d-flex align-items-center gap-3">
                            <a class="text-white" href="#"><i class="ri-apple-line"></i></a>
                            <a class="text-white" href="#"><i class="ri-google-play-line"></i></a>
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
                    <p class="text-center text-muted m-0">Hakimiliki © <a href="#" class="text-black">Jkbrs
                            International</a> 2024</p>
                </div>
                <div class="col-auto">
                    <div class="d-flex align-items-center gap-3 social-links">
                        <p class="m-0 text-muted pe-1">Tutafute</p>
                        <!-- Links will be injected here by JavaScript -->
                    </div>
                </div>

            </div>
        </div>
    </div>


    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const socialLinksContainer = document.querySelector(".social-links");


            fetch("{{ route('SocialMedia.index') }}")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
            
                    data.forEach(link => {
                        const platformIcon = getPlatformIcon(link.platform);
                        const anchor = document.createElement("a");
                        anchor.href = link.url;
                        anchor.classList.add("link-secondary");
                        anchor.innerHTML = `<i class="${platformIcon}"></i>`;
                        socialLinksContainer.appendChild(anchor);
                    });
                })
                .catch(error => {
                    console.error("Error fetching social media links:", error);
                });
        });

        function getPlatformIcon(platform) {
            const icons = {
                facebook: "ri-facebook-circle-fill",
                twitter: "ri-twitter-fill",
                instagram: "ri-instagram-fill",
                email: "ri-mail-fill",
            };
            return icons[platform.toLowerCase()] || "ri-link"; // Default icon
        }
    </script>



</footer>
