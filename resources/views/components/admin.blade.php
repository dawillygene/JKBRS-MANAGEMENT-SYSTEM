<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ config('app.name', 'jkbrs Interntional') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="{{ config('app.name', 'jkbrs Interntional') }}">
    <meta name="author" content="dawilly gene">
    <meta name="description" content="{{ config('app.name', 'jkbrs Interntional') }}">
    <meta name="keywords" content="{{ config('app.name', 'jkbrs Interntional') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.min.css"
        integrity="sha256-Qsx5lrStHZyR9REqhUF8iQt73X06c8LGIUPzpOhwRrI=" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('admin/assets/css/adminlte.css') }}">
    <link rel="icon" href="{{ asset('assets/img/logo.png') }}" type="image/png">
</head>

<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
    <div class="app-wrapper">
        <nav class="app-header navbar navbar-expand bg-body">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item"> <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                            <i class="bi bi-list"></i> </a> </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"> <a class="nav-link" href="#" data-lte-toggle="fullscreen"> <i
                                data-lte-icon="maximize" class="bi bi-arrows-fullscreen"></i> <i
                                data-lte-icon="minimize" class="bi bi-fullscreen-exit" style="display: none;"></i>
                        </a> </li>
                    <li class="user-footer">
                        <a href="{{ route('profile.edit') }}" class="btn btn-default btn-flat">Profile</a>
                        <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                            @csrf
                            <button type="submit" class="btn btn-default btn-flat">Sign out</button>
                        </form>
                    </li>

                </ul>
                </li>
                </ul>
            </div>
        </nav>
        <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
            <div class="sidebar-brand"> <a href="{{ route('dashboard') }}" class="brand-link">
                    <img src="{{ asset('assets/img/logo.png') }}" alt="JKBRS" class="brand-image opacity-75 shadow"><span
                        class="brand-text fw-light">JKBRS</span></a>
            </div>
            <div class="sidebar-wrapper">
                <nav class="mt-2">
                    <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu"
                        data-accordion="false">
                        <li class="nav-item">

                        <li class="nav-item"> <a href="{{ route('dashboard') }}" class="nav-link"> <i
                                    class="nav-icon bi bi-speedometer"></i>
                                <p>Dashboard</p>
                            </a> </li>
                        </li>

                        <li class="nav-item"> <a href="#" class="nav-link"> <i
                                    class="nav-icon bi bi-box-seam-fill"></i>
                                <p>
                                    Products
                                    <i class="nav-arrow bi bi-chevron-right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ route('admin.addproduct') }}"
                                        class="nav-link {{ Route::is('admin.addproduct') ? 'active' : '' }}">
                                        <i class="nav-icon bi bi-circle"></i>
                                        <p>add product</p>
                                    </a>
                                </li>

                                <li class="nav-item"> <a href="{{ route('admin.productslist') }}" class="nav-link"> <i
                                            class="nav-icon bi bi-circle"></i>
                                        <p>List all product</p>
                                    </a> </li>
                            </ul>
                        </li>
                        <li class="nav-item"> <a href="#" class="nav-link"> <i
                                    class="nav-icon bi bi-box-seam-fill"></i>
                                <p>
                                    Articles
                                    <i class="nav-arrow bi bi-chevron-right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ route('articles.create') }}"
                                        class="nav-link {{ Route::is('articles.create') ? 'active' : '' }}">
                                        <i class="nav-icon bi bi-circle"></i>
                                        <p>add article</p>
                                    </a>
                                </li>

                                <li class="nav-item"> <a href="{{ route('articles.getArticle') }}" class="nav-link"> <i
                                            class="nav-icon bi bi-circle"></i>
                                        <p>List all articles</p>
                                    </a> </li>
                            </ul>
                        </li>
                        <li class="nav-item"> <a href="#" class="nav-link"> <i
                                    class="nav-icon bi bi-box-seam-fill"></i>
                                <p>
                                    Locations
                                    <i class="nav-arrow bi bi-chevron-right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ route('locations.create') }}"
                                        class="nav-link {{ Route::is('articles.create') ? 'active' : '' }}">
                                        <i class="nav-icon bi bi-circle"></i>
                                        <p>add locations</p>
                                    </a>
                                </li>

                                <li class="nav-item"> <a href="{{ route('locations.index') }}" class="nav-link"> <i
                                            class="nav-icon bi bi-circle"></i>
                                        <p>List all locations</p>
                                    </a> </li>
                            </ul>
                        </li>
                        <li class="nav-item"> <a href="{{ route('social-media-links.index') }}" class="nav-link"> <i
                                    class="nav-icon bi bi-circle text-info"></i>
                                <p>Social Media</p>
                            </a> </li>
                        <li class="nav-header">EXAMPLES</li>
                        <li class="nav-item"> <a href="#" class="nav-link"> <i
                                    class="nav-icon bi bi-circle text-info"></i>
                                <p>Informational</p>
                            </a> </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <main class="app-main">
            <div class="app-content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 class="mb-0">Dashboard</h3>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-end">
                                <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    {{ $heading }}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {{ $slot }}
        </main>
        <footer class="app-footer">
            <div class="float-end d-none d-sm-inline">Anything you want</div><strong>
                Copyright &copy; 2014-2024&nbsp;
                {{-- <a href="{{  }}" class="text-decoration-none">AdminLTE.io</a>. --}}
            </strong>
            All rights reserved.

        </footer>
    </div>
    <script src="{{ asset('admin/assets/js/adminlte.js') }}"></script>
</body>
</html>
