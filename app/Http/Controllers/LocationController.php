<?php

namespace App\Http\Controllers;
use Exception;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class LocationController extends Controller
{
    public function index()
    {

        $location = Location::all()->map(function (Location $location) {
            $location->encrypted_id = Crypt::encrypt($location->id);
            return $location;
        });

        return view('admin.location.index', compact('location'));
    }
    public function create()
    {
        return view('admin.location.create');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'city' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);
            Location::create($request->all());
            toast('location added successfully!', 'success');
            return redirect()->route('locations.index')->with('success', 'Location created successfully!');
        } catch (Exception $e) {
            toast($e->getMessage(), 'error');
            return redirect()->back();
        }
    }


    public function show()
    {
        return view('locations.show', compact('supermarket'));
    }

    public function edit($id)
    {

        $loc = decrypt($id);
        $location = Location::findOrFail($loc);
        return view('admin.location.edit', compact('location', 'id'));
    }


    public function update(Request $request, $id)
    {
        try {

            $loc = decrypt($id);
            $location = Location::findOrFail($loc);

            $request->validate([
                'city' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $location->update($request->all());
            toast('Location updated successfully!', 'success');
            return redirect()->route('locations.index')->with('success', 'Location updated successfully!');
        } catch (Exception $e) {
            toast($e, 'error');
            return redirect()->back();
        }
    }


    public function destroy($id)
    {

        try {
            $loc = decrypt($id);
            $location = Location::findOrFail($loc);
            $location->delete();
            toast('Location deleted successfully!', 'success');
            return redirect()->route('locations.index');
        } catch (Exception $e) {
            toast('Failed to delete the location' . $e, 'error');
            return redirect()->back();
        }
    }
}
