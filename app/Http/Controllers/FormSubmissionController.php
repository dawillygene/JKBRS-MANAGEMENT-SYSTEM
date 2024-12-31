<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\ToSweetAlert;

class FormSubmissionController extends Controller
{
 


    public function index()
    {
        $messages = FormSubmission::orderBy('created_at', 'desc')->paginate(10);
        return view('admin.messages.index', compact(  'messages'));
    }
    
   

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        FormSubmission::create($validated);
        toast('Ujumbe wako umetumwa kwa mafanikio!','success');
        return redirect()->back()->with('success', 'Ujumbe wako umetumwa kwa mafanikio!');
    }




    public function destroy($id)
    {
        $message = FormSubmission::findOrFail($id);
        $message->delete();
    
        return redirect()->route('messages.index')->with('success', 'Message deleted successfully.');
    }
    




}

