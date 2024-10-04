import React from 'react';

export function IconContextMenu({ x, y, iconName, onClose, onOpen }) {
  return (
    <div 
      className="absolute bg-white border border-gray-300 shadow-md rounded-md overflow-hidden"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <ul className="py-1">
        <li 
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => {
            onOpen();
            onClose();
          }}
        >
          Open
        </li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Rename</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Delete</li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Properties</li>
      </ul>
    </div>
  );
}