<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function showPaymentForm($id)
    {
        $prod = \App\Models\Product::findOrFail($id);
        return view('payment.payment', compact('prod'));
    }

    public function processPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'phone' => 'required|string',
        ]);

        $response = Http::post('https://api.selcom.com/v1/payments', [
            'amount' => $request->amount,
            'phone' => $request->phone,
            'api_key' => env('SELCOM_API_KEY'),
            // Add other required parameters as per Selcom API documentation
        ]);

        if ($response->successful()) {
            // Handle successful payment
            return redirect()->route('payment.success');
        } else {
            // Handle payment failure
            return redirect()->route('payment.failure');
        }
    }
}