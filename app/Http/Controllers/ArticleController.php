<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;

class ArticleController extends Controller
{
   
    public function index()
    {
        return view('admin.articles.index');
    }


    public function store(Request $request)
    {

        try{
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
        return redirect()->route('articles.create')->with('success', 'Article added successfully.');
    }catch(Exception $e){
     toast($e->getMessage(),'error');
     return redirect()->back()->with('error', 'Something went wrong');
    }
    }


    public function getArticle(){
        $article = Article::paginate(2);

        $article->getCollection()->transform(function ($article) {
            $article->encrypted_id = Crypt::encrypt($article->id);
            return $article;
        });
        return view('admin.articles.list',compact('article'));
    }

    public function edit($id){
        $art = Article::decrypt($id);
        $article = Article::findOrFail($art);
        return view('admin.articles.edit',compact('article','id'));
    }

public function update(Request $request,  $id){
    try{
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'publish_date' => 'required|date',
        ]);

        $art = Article::decrypt($id);
        $article = Article::findOrFail($art);
        $article->update($request->all());
        toast('Article updated successfully','success');
        return redirect()->route('articles.getArticle', $id)->with('success', 'Article updated successfully.');
    }catch(Exception $e){
     toast($e->getMessage(),'error');
     return redirect()->back()->with('error', 'Something went wrong');
    }
    }
    

    public function destroy($id)
    {
        try {
            $decryptedId = Article::decrypt($id);
            $article = Article::findOrFail($decryptedId);
            $article->delete();
            toast('Article deleted successfully!', 'success');
            return redirect()->back()->with('success', 'Article deleted successfully!');
        } catch (Exception $exception) {
            toast('Failed to delete the article: ' . $exception->getMessage(), 'error');
            return redirect()->back()->with('error', 'Failed to delete the article.');
        }
    }

}
