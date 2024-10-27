import React from 'react';
import { Battery as BatteryIcon } from 'lucide-react';

export function Battery() {
  return (
    <div className="flex items-center text-gray-700">
      <BatteryIcon className="w-4 h-4" />
      <span className="ml-1 text-xs">100%</span>
    </div>
  );
}
