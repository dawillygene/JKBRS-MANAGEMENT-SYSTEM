<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{



 public function index()
 {
     $locations = Location::all();
     return view('admin.locationIndex', compact('locations'));
 }


 public function create()
 {
     return view('admin.locationcreate');
 }


 public function store(Request $request)
 {
     $request->validate([
         'city' => 'required|string|max:255',
         'name' => 'required|string|max:255',
         'description' => 'nullable|string',
     ]);

    Location::create($request->all());
  
    toast('location added successfully!','success');
     return redirect()->route('locations.index')->with('success', 'Location created successfully!');
 }


 public function show(Location $supermarket)
 {
     return view('locations.show', compact('supermarket'));
 }

 public function edit(Location $supermarket)
 {
     return view('locations.edit', compact('supermarket'));
 }


 public function update(Request $request, Location $supermarket)
 {
     $request->validate([
         'city' => 'required|string|max:255',
         'name' => 'required|string|max:255',
         'description' => 'nullable|string',
     ]);

     $supermarket->update($request->all());
     return redirect()->route('locations.index')->with('success', 'Location updated successfully!');
 }


 public function destroy(Location $supermarket)
 {
     $supermarket->delete();
     return redirect()->route('locations.index')->with('success', 'Location deleted successfully!');
 }

}
