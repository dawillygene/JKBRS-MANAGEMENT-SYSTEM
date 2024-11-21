<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
   
    public function index()
    {
        return view('admin.article');
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image_path' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'publish_date' => 'required|date',
        ]);

       
        $imagePath = $request->file('image_path')->store('articles', 'public');

     
        Article::create([
            'title' => $request->title,
            'image_path' => $imagePath,
            'description' => $request->description,
            'publish_date' => $request->publish_date,
        ]);
        toast('Article added successfully','success');
        return redirect()->route('articles.index')->with('success', 'Article added successfully.');
    }
}
