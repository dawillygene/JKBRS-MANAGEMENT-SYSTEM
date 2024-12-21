<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\SocialMediaLink;
use Illuminate\Http\Request;

class SocialMediaLinkController extends Controller
{
    public function index()
    {
        // $links = SocialMediaLink::all();
        // return response()->json($links);

        $links = SocialMediaLink::paginate(10);
        return view('admin.SocialMedia.index', compact('links'));
    
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url',
        ]);

        $link = SocialMediaLink::create($validated);
        return response()->json($link, 201);
    }


public function edit($id){

    $link = SocialMediaLink::findOrFail($id);
    return view('admin.SocialMedia.edit',compact('link'));

}




    // public function update(Request $request, $id)
    // {
    //     $link = SocialMediaLink::findOrFail($id);

    //     $validated = $request->validate([
    //         'platform' => 'string|max:255',
    //         'url' => 'url',
    //     ]);

    //     $link->update($validated);
    //     return response()->json($link);
    // }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url',
        ]);
    
        $link = SocialMediaLink::findOrFail($id);
        $link->update($validated);
        toast($validated['platform'] . ' updated successfully!', 'success');
        return redirect()->route('social-media-links.index')
                         ->with('success', 'Social media link updated successfully!');
    }
    



    public function destroy($id)
    {
        $link = SocialMediaLink::findOrFail($id);
        $link->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
