import React from 'react';

export function DesktopContextMenu({ x, y, onClose }) {
  return (
    <div 
      className="absolute bg-white border border-gray-300 shadow-md rounded-md overflow-hidden"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <ul className="py-1">
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">View</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Sort By</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Refresh</li>
        <li className="border-t border-gray-300"></li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Paste</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Paste Shortcut</li>
        <li className="border-t border-gray-300"></li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">New</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Properties</li>
      </ul>
    </div>
  );
}