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
        }); //made product all
    
        return view('products', compact('product'));
    }

public function adminIndex() {

// Paginate the query before applying the map
$product = Product::Paginate(6);

// Use map after retrieving the paginated items
$product->getCollection()->transform(function ($product) {
    $product->encrypted_id = Crypt::encryptString($product->id);
    return $product;
});

return view('admin.products.index', compact('product'));

}


public function edit($id)
{
    $prod = Product::decryptId($id);
    $product = Product::find($prod);
    if($product){
        return view('admin.products.edit', compact('product','id'));;
    }else{
        abort(404);
    }
}


public function update(Request $request, $id)
{
    try {

        $decryptedId = Product::decryptId($id);
        $product = Product::findOrFail($decryptedId);

        $request->validate([
            'productName' => 'required|string|max:255',
            'productPrice' => 'required|numeric|min:0',
            'productDescription' => 'required|string',
            'productTitle' => 'required|string|max:255',
            'productImage' => 'nullable|image|max:2048',
        ]);


        $imagePath = $product->product_image; 
        if ($request->hasFile('productImage')) {
            $imagePath = $request->file('productImage')->store('products', 'public');
        }

        $product->update([
            'product_name' => $request->input('productName'),
            'price' => $request->input('productPrice'),
            'description' => $request->input('productDescription'),
            'title' => $request->input('productTitle'),
            'product_image' => $imagePath,
        ]);

        toast('Product updated successfully!', 'success');
       return redirect()->route('admin.productslist');
    } catch (Exception $exception) {

        toast($exception->getMessage(), 'error');
        return redirect()->back()->with('error', 'Error: ' . $exception->getMessage());
    }
}


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

  
    public function store(Request $request)
    {

        try {
        $request->validate([
            'productName' => 'required|string|max:255',
            'productPrice' => 'required|numeric|min:0',
            'productDescription' => 'required|string',
            'productTitle' => 'required|string|max:255',
            'productImage' => 'required|image|max:2048', 
        ]);

        $imagePath = $request->file('productImage')->store('products', 'public');

   
      Product::create([
            'product_name' => $request->input('productName'),
            'price' => $request->input('productPrice'),
            'description' => $request->input('productDescription'),
            'title' => $request->input('productTitle'),
            'category' => "home",
            'quantity_in_stock' => "300",
            'product_image' => $imagePath,
        ]);

        toast('Product added successfully!','success');
        return redirect()->back()->with('success', 'Product added successfully!');


    }catch(Exception $exception){
        toast($exception->getMessage(),'error');
        return redirect()->back()->with('error', 'Validation Error: '. $exception->getMessage());
    }
       
       
    }


    public function destroy($id)
    {
        try {
            $decryptedId = Product::decryptId($id);
            $prod = Product::findOrFail($decryptedId);
            $prod->delete();
            toast('Product deleted successfully!', 'success');
            return redirect()->back()->with('success', 'Product deleted successfully!');
        } catch (Exception $exception) {
            toast('Failed to delete the product: ' . $exception->getMessage(), 'error');
            return redirect()->back()->with('error', 'Failed to delete the product.');
        }
    }
    




}
