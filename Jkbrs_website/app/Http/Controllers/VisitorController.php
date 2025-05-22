<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitor;

class VisitorController extends Controller
{
    public function incrementVisitorCount()
    {
        // Increment the visitor count by 1
        $visitor = Visitor::first(); // Assuming only one row
        $visitor->count += 1;
        $visitor->save();

        return response()->json(['message' => 'Visitor count incremented']);
    }

    public function getVisitorCount()
    {
        // Get the current visitor count
        $visitor = Visitor::first(); // Assuming only one row
        return response()->json(['visitorCount' => $visitor->count]);
    }
}

