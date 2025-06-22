<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Office;
use App\Models\User;

class OfficeUpdateSeeder extends Seeder
{
    public function run(): void
    {
        $offices = Office::all();
        
        foreach ($offices as $office) {
            if (!$office->office_code) {
                $office->update([
                    'office_code' => strtoupper(substr($office->name, 0, 3)) . str_pad($office->id, 3, '0', STR_PAD_LEFT),
                    'office_type' => $office->type ?? 'branch',
                    'location' => $office->address ?? ($office->name . ' Location'),
                    'contact_phone' => $office->phone ?? '+255 123 456 789',
                    'contact_email' => $office->email ?? strtolower(str_replace(' ', '.', $office->name)) . '@jkbrs.co.tz',
                    'status' => $office->is_active ? 'active' : 'inactive',
                    'budget_allocated' => rand(100000, 5000000),
                    'budget_spent' => rand(10000, 500000),
                    'description' => 'Auto-generated description for ' . $office->name,
                ]);
                
                echo "Updated office: {$office->name}\n";
            }
        }
        
        echo "Updated " . $offices->count() . " offices\n";
    }
}
