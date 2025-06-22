import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Test component to verify Select behavior
export default function SelectTest() {
  const [selectedValue, setSelectedValue] = useState('all');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select Component Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Test Select (should work):</label>
          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            Current value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedValue}</span>
          </p>
        </div>
        
        <div>
          <p className="text-sm text-green-600">
            ✅ If you can see this without errors, the Select fix is working!
          </p>
        </div>
      </div>
    </div>
  );
}
