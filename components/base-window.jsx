import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

export function BaseWindow({ title, children, onClose, onMinimize, onMaximize, isMaximized, zIndex, initialPosition = { x: 100, y: 100 }, initialSize = { width: 600, height: 400 } }) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const startDragging = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  };

  const drag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
    if (isResizing) {
      const newSize = { ...size };
      const newPosition = { ...position };

      if (resizeDirection.includes('w')) {
        const dx = e.clientX - position.x;
        newSize.width = Math.max(200, size.width - dx);
        newPosition.x = e.clientX;
      }
      if (resizeDirection.includes('n')) {
        const dy = e.clientY - position.y;
        newSize.height = Math.max(100, size.height - dy);
        newPosition.y = e.clientY;
      }
      if (resizeDirection.includes('e')) {
        newSize.width = Math.max(200, e.clientX - position.x);
      }
      if (resizeDirection.includes('s')) {
        newSize.height = Math.max(100, e.clientY - position.y);
      }

      setSize(newSize);
      setPosition(newPosition);
    }
  };

  const startResizing = (direction) => {
    if (!isMaximized) {
      setIsResizing(true);
      setResizeDirection(direction);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, isResizing, resizeDirection]);

  const windowStyle = isMaximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 40px)', zIndex }
    : { 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        width: `${size.width}px`, 
        height: `${size.height}px`,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      className="absolute bg-[#ECE9D8] border-2 border-[#0054E3] shadow-lg rounded-t-lg overflow-hidden flex flex-col"
      style={windowStyle}
    >
      <div
        className="h-8 bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#3A8EE6] flex items-center justify-between px-2 cursor-move"
        onMouseDown={startDragging}
      >
        <span className="text-white font-bold">{title}</span>
        <div className="flex space-x-1">
          <button onClick={onMinimize} className="w-5 h-5 bg-[#ECE9D8] border border-[#0054E3] flex items-center justify-center hover:bg-[#FFFFFF]">
            <Minus size={10} className="text-black" />
          </button>
          <button onClick={onMaximize} className="w-5 h-5 bg-[#ECE9D8] border border-[#0054E3] flex items-center justify-center hover:bg-[#FFFFFF]">
            <Square size={10} className="text-black" />
          </button>
          <button onClick={onClose} className="w-5 h-5 bg-[#ECE9D8] border border-[#0054E3] flex items-center justify-center hover:bg-[#FFFFFF]">
            <X size={10} className="text-black" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 bg-white">
        {children}
      </div>
      {!isMaximized && (
        <>
          <div className="absolute top-0 left-0 w-1 h-full cursor-w-resize" onMouseDown={() => startResizing('w')}></div>
          <div className="absolute top-0 right-0 w-1 h-full cursor-e-resize" onMouseDown={() => startResizing('e')}></div>
          <div className="absolute top-0 left-0 w-full h-1 cursor-n-resize" onMouseDown={() => startResizing('n')}></div>
          <div className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize" onMouseDown={() => startResizing('s')}></div>
          <div className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize" onMouseDown={() => startResizing('nw')}></div>
          <div className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize" onMouseDown={() => startResizing('ne')}></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize" onMouseDown={() => startResizing('sw')}></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize" onMouseDown={() => startResizing('se')}></div>
        </>
      )}
    </div>
  );
}