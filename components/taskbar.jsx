import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Taskbar({ windows, focusWindow }) {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
      <motion.div 
        className="h-16 px-2 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center h-full space-x-1">
          {windows.map((window) => (
            <DockIcon
              key={window.name}
              icon={getIconForWindow(window.name)}
              name={window.name}
              isActive={!window.isMinimized}
              onClick={() => focusWindow(window.name)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DockIcon({ icon, name, isActive, onClick }) {
  return (
    <motion.button
      className="group relative flex items-center justify-center w-12 h-12"
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
    >
      <div className={`absolute inset-0 rounded-xl ${
        isActive ? 'bg-white/20' : 'group-hover:bg-white/10'
      } transition-all duration-200`} />
      
      <span className="text-3xl relative z-10 transition-all duration-200 group-hover:scale-110">
        {icon}
      </span>

      {isActive && (
        <motion.div 
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-white"
          layoutId="dot"
        />
      )}
      
      <motion.div 
        className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={{ scale: 0.6, y: 10 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="px-3 py-1 bg-[#1D1D1F]/80 backdrop-blur-md rounded-lg text-white text-sm whitespace-nowrap">
          {name}
        </div>
      </motion.div>
    </motion.button>
  );
}

function getIconForWindow(name) {
  // Temporarily use emojis instead of images until we have proper icons
  switch (name) {
    case 'My Projects':
      return '📂';
    case 'About Me':
      return '👤';
    case 'Skills':
      return '🛠️';
    case 'Contact':
      return '📧';
    case 'Resume':
      return '📄';
    case 'Terminal':
      return '⌨️';
    default:
      return '📁';
  }
}
