import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Minus, Square } from 'lucide-react';

export function BaseWindow({ children, title, onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
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

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  }, []); // No dependencies needed

  const drag = useCallback((e) => {
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
  }, [isDragging, isResizing, dragOffset, size, position, resizeDirection]);

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
  }, [drag, stopDragging]); // Updated dependencies

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
      className={`absolute bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden flex flex-col shadow-2xl border border-white/20 transition-all duration-200 ${
        isMaximized ? 'scale-100' : 'scale-100 hover:scale-[1.001]'
      }`}
      style={windowStyle}
    >
      <div
        className="h-7 bg-[#E7E7E7] flex items-center px-2 cursor-move relative"
        onMouseDown={startDragging}
      >
        {/* Window Controls */}
        <div className="absolute left-2 flex space-x-2 z-10">
          <button 
            onClick={onClose} 
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/90 group flex items-center justify-center"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-50" />
          </button>
          <button 
            onClick={onMinimize} 
            className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/90 group flex items-center justify-center"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-50" />
          </button>
          <button 
            onClick={onMaximize} 
            className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/90 group flex items-center justify-center"
          >
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-50" />
          </button>
        </div>
        
        {/* Window Title */}
        <span className="flex-1 text-center text-sm font-medium text-[#4A4A4A]">{title}</span>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={() => startResizing('se')} />
        </>
      )}
    </div>
  );
}
