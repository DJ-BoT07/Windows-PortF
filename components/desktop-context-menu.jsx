import React from 'react';

export function DesktopContextMenu({ x, y, onClose }) {
  const handleMenuClick = (action) => {
    switch (action) {
      case 'view':
        // Implement view logic here
        alert('View action triggered');
        break;
      case 'sort':
        // Implement sort logic here
        alert('Sort action triggered');
        break;
      case 'refresh':
        // Implement refresh logic here
        window.location.reload(); // Example: refresh the page
        break;
      case 'paste':
        // Implement paste logic here
        alert('Paste action triggered');
        break;
      case 'pasteShortcut':
        // Implement paste shortcut logic here
        alert('Paste Shortcut action triggered');
        break;
      case 'new':
        // Implement new item logic here
        alert('New action triggered');
        break;
      case 'properties':
        // Implement properties logic here
        alert('Properties action triggered');
        break;
      default:
        break;
    }
    onClose(); // Close the menu after an action is performed
  };

  return (
    <div 
      className="absolute bg-white border border-gray-300 shadow-md rounded-md overflow-hidden"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <ul className="py-1">
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('view')}>View</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('sort')}>Sort By</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('refresh')}>Refresh</li>
        <li className="border-t border-gray-300"></li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('paste')}>Paste</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('pasteShortcut')}>Paste Shortcut</li>
        <li className="border-t border-gray-300"></li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('new')}>New</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('properties')}>Properties</li>
      </ul>
    </div>
  );
}
