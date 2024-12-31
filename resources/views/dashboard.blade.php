<x-admin>
    <x-slot:heading>
        Dashboard Overview
    </x-slot:heading>

    <style>
        .card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
            overflow: hidden; 
            position: relative;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .transition-all {
            transition: all 0.3s ease-in-out;
        }

        .shadow-lg {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .hover-shadow-lg:hover {
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }

        .card-body {
            position: relative;
            padding: 30px;
        }

        .card-body .d-flex {
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
        }

        .number-container {
            font-size: 10rem; 
            font-weight: bold;
            color: gray;
            font-family: 'Arial', sans-serif;
            letter-spacing: 5px;
            position: absolute;
            bottom: 20px;
            right: 20px;
            z-index: 1;
        }

        .number-container h3 {
            text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3); 
        }

      
        .card-body i {
            font-size: 3rem;
            position: absolute;
            top: 15px;
            right: 20px;
            opacity: 0.6;
        }

        .card-body p {
            font-size: 1rem;
            color: #6c757d;
        }

   
        .bg-light-gray {
            background-color: #f8f9fa !important;
        }
    </style>

    <div class="container-fluid">
        <div class="row g-4">
       
            <div class="col-md-4">
                <div class="card border-warning shadow-lg hover-shadow-lg transition-all">
                    <div class="card-body bg-light-gray">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-dark">Total Products</h5>
                        </div>
                        <i class="bi bi-box-fill text-dark"></i>
                        <div class="number-container">
                            <h3>{{ $productCount }}</h3>
                        </div>
                        <p class="card-text">Total number of products available.</p>
                        <a href="{{ route('admin.productslist') }}" class="btn btn-outline-dark btn-sm">View Products</a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-warning shadow-lg hover-shadow-lg transition-all">
                    <div class="card-body bg-light-gray">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-dark">Total Articles</h5>
                        </div>
                        <i class="bi bi-newspaper text-dark"></i>
                        <div class="number-container">
                            <h3>{{ $articleCount }}</h3>
                        </div>
                        <p class="card-text">Total number of articles published.</p>
                        <a href="{{ route('articles.getArticle') }}" class="btn btn-outline-dark btn-sm">View Articles</a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-warning shadow-lg hover-shadow-lg transition-all">
                    <div class="card-body bg-light-gray">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-dark">Total Messages</h5>
                        </div>
                        <i class="bi bi-chat-square-text-fill text-dark"></i>
                        <div class="number-container">
                            <h3>{{ $messageCount }}</h3>
                        </div>
                        <p class="card-text">Total number of messages received.</p>
                        <a href="{{ route('messages.index') }}" class="btn btn-outline-dark btn-sm">View Messages</a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-warning shadow-lg hover-shadow-lg transition-all">
                    <div class="card-body bg-light-gray">
                        <div class="d-flex justify-content-between align-items-center">
                             <h5 class="card-title text-dark">Total Locations</h5>
                        </div>
                        <i class="bi bi-geo-alt-fill text-dark"></i>
                        <div class="number-container">
                            <h3>{{ $locationCount }}</h3>
                        </div>
                        <p class="card-text">Total number of locations available.</p>
                        <a href="{{ route('locations.index') }}" class="btn btn-outline-dark btn-sm">View Locations</a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-warning shadow-lg hover-shadow-lg transition-all">
                    <div class="card-body bg-light-gray">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-dark">Website Visitors</h5>
                        </div>
                        <i class="bi bi-person-fill text-dark"></i>
                        <div class="number-container">
                            <h3>{{ $visitorCount }}</h3>
                        </div>
                        <p class="card-text">Total number of visitors on the website.</p>
                        <a href="{{ route('dashboard') }}" class="btn btn-outline-dark btn-sm">View Visitors</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-admin>
