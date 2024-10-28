import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DesktopContextMenu({ x, y, onClose, onViewChange, currentView, onSortChange, currentSort }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const handleViewClick = (viewMode) => {
    onViewChange(viewMode);
    onClose();
  };

  const handleSortClick = (sortMode) => {
    onSortChange(sortMode);
    onClose();
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'paste':
        alert('Paste action triggered');
        break;
      case 'pasteShortcut':
        alert('Paste Shortcut action triggered');
        break;
      case 'new':
        alert('New action triggered');
        break;
      case 'properties':
        alert('Properties action triggered');
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <div 
      className="fixed z-50"
      style={{ left: `${x}px`, top: `${y}px` }}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="bg-white border border-gray-300 shadow-md rounded-md overflow-visible w-48"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <ul className="py-1">
          <li 
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center relative group"
            onMouseEnter={() => handleMouseEnter('view')}
          >
            <span>View</span>
            <span>▶</span>
            {activeSubmenu === 'view' && (
              <motion.div 
                className="absolute left-full top-0 bg-white border border-gray-300 shadow-md rounded-md w-48 z-50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ 
                  marginLeft: '0px',
                }}
              >
                <div className="absolute h-full w-3 bg-transparent -left-3 top-0" />
                <ul className="py-1 relative">
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentView === 'large' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleViewClick('large')}
                  >
                    Large Icons
                  </li>
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentView === 'medium' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleViewClick('medium')}
                  >
                    Medium Icons
                  </li>
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentView === 'small' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleViewClick('small')}
                  >
                    Small Icons
                  </li>
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentView === 'list' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleViewClick('list')}
                  >
                    List
                  </li>
                </ul>
              </motion.div>
            )}
          </li>
          <li 
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center relative group"
            onMouseEnter={() => handleMouseEnter('sort')}
          >
            <span>Sort By</span>
            <span>▶</span>
            {activeSubmenu === 'sort' && (
              <motion.div 
                className="absolute left-full top-0 bg-white border border-gray-300 shadow-md rounded-md w-48 z-50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ 
                  marginLeft: '0px',
                }}
              >
                <div className="absolute h-full w-3 bg-transparent -left-3 top-0" />
                <ul className="py-1 relative">
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentSort === 'name' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSortClick('name')}
                  >
                    Name
                  </li>
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentSort === 'type' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSortClick('type')}
                  >
                    Type
                  </li>
                  <li 
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${currentSort === 'date' ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSortClick('date')}
                  >
                    Date Modified
                  </li>
                </ul>
              </motion.div>
            )}
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('refresh')}>Refresh</li>
          <li className="border-t border-gray-300"></li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('paste')}>Paste</li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('pasteShortcut')}>Paste Shortcut</li>
          <li className="border-t border-gray-300"></li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('new')}>New</li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={() => handleMenuClick('properties')}>Properties</li>
        </ul>
      </motion.div>
    </div>
  );
}
