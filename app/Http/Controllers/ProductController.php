<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ProductController extends Controller
{
    
    public function index()
    {

       $product = Product::all();
        return view('products', compact('product'));
    }



    public function create()
    {
        return view('products.create');
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        // Validate the incoming request data
      $test =  $request->validate([
            'productName' => 'required|string|max:255',
            'productPrice' => 'required|numeric|min:0',
            'productDescription' => 'required|string',
            'productTitle' => 'required|string|max:255',
            'productCategory' => 'required|string',
            'stockQuantity' => 'required|integer|min:0',
            'productImage' => 'required|image|max:2048', // Max size 2MB
        ]);

       
        $imagePath = $request->file('productImage')->store('products', 'public');

   
        $product = Product::create([
            'product_name' => $request->input('productName'),
            'price' => $request->input('productPrice'),
            'description' => $request->input('productDescription'),
            'title' => $request->input('productTitle'),
            'category' => $request->input('productCategory'),
            'quantity_in_stock' => $request->input('stockQuantity'),
            'product_image' => $imagePath,
        ]);

        echo "its done!";
        // Redirect with success message
        // return redirect()->back()->with('success', 'Product added successfully!');
    }
}
