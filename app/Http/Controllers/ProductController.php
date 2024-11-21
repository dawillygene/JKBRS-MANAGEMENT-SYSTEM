<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class ProductController extends Controller
{
    
    public function index()
    {
        $product = Product::all()->map(function ($product) {
            $product->encrypted_id = Crypt::encryptString($product->id);
            return $product;
        });
    
        return view('products', compact('product'));
    }

    // public function show($encryptedId)
    // {
    //     $id = Product::decryptId($encryptedId);
    //     $product = Product::findOrFail($id);
    
    //     return view('products.show', compact('product'));
    // }




    public function show($encryptedId)
    {
        $id = Product::decryptId($encryptedId);
        $prod = Product::find($id);
        if($prod){
            return view('productdetail', compact('prod'));
        }else{
            abort(404);
        }
        
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {

        try {
      $test =  $request->validate([
            'productName' => 'required|string|max:255',
            'productPrice' => 'required|numeric|min:0',
            'productDescription' => 'required|string',
            'productTitle' => 'required|string|max:255',
            'productCategory' => 'required|string',
            'stockQuantity' => 'required|integer|min:0',
            'productImage' => 'required|image|max:2048', 
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

        toast('Product added successfully!','success');
        return redirect()->back()->with('success', 'Product added successfully!');


    }catch(Exception $exception){
        toast('Validation Error: ','error');

        return redirect()->back()->with('error', 'Validation Error: '. $exception->getMessage());
    }
       
       
    }
}
