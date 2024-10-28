import React, { useState } from 'react'
import { MyProjectsWindow } from './my-projects-window'
import { AboutMeWindow } from './about-me-window'
import { SkillsWindow } from './skills-window'; // Named import
import { ContactWindow } from './contact-window'
import { ResumeWindow } from './resume-window'
import { TerminalWindow } from './terminal-window' // Import the TerminalWindow
import { IconContextMenu } from './icon-context-menu'
import Image from 'next/image'; // Add this import
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export function DesktopIcons({ addWindow, removeWindow, toggleMinimize, toggleMaximize, focusWindow, windows, iconPositions, updateIconPosition, iconView }) {
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [draggingIcon, setDraggingIcon] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const toggleWindow = (windowName, icon, position = { x: 100, y: 100 }) => {
    const existingWindow = windows.find(w => w.name === windowName);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        toggleMinimize(windowName);
      } else {
        focusWindow(windowName);
      }
    } else {
      addWindow(windowName, icon, position);
    }
  };

  const handleIconClick = (name, e) => {
    e.stopPropagation()
    setSelectedIcon(name)
  }

  const handleIconDoubleClick = (name, icon) => {
    const position = { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 };
    toggleWindow(name, icon, position);
  }

  const handleIconContextMenu = (e, name) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenuPosition({ x: e.clientX, y: e.clientY, iconName: name })
  }

  const closeContextMenu = () => {
    setContextMenuPosition(null)
  }

  const startDragging = (e, name) => {
    setDraggingIcon(name)
    const iconPos = iconPositions[name]
    setDragOffset({
      x: e.clientX - iconPos.x,
      y: e.clientY - iconPos.y
    })
  }

  const onDrag = (e) => {
    if (draggingIcon) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      }
      updateIconPosition(draggingIcon, newPosition)
    }
  }

  const stopDragging = () => {
    setDraggingIcon(null)
  }

  return (
    <>
      <div 
        className="flex-1 p-4" 
        onClick={() => setSelectedIcon(null)}
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {Object.entries(iconPositions).map(([name, position]) => (
          <DesktopIcon 
            key={name}
            name={name} 
            icon={getIconForName(name)} 
            isSelected={selectedIcon === name}
            position={position}
            onClick={(e) => handleIconClick(name, e)}
            onDoubleClick={() => handleIconDoubleClick(name, getIconForName(name))}
            onContextMenu={(e) => handleIconContextMenu(e, name)}
            onMouseDown={(e) => startDragging(e, name)}
            iconView={iconView} // Pass the iconView prop
          />
        ))}
      </div>
      {contextMenuPosition && (
        <IconContextMenu 
          x={contextMenuPosition.x} 
          y={contextMenuPosition.y} 
          iconName={contextMenuPosition.iconName}
          onClose={closeContextMenu}
          onOpen={() => handleIconDoubleClick(contextMenuPosition.iconName, getIconForName(contextMenuPosition.iconName))}
        />
      )}
    </>
  )
}

function DesktopIcon({ name, icon, isSelected, position, onClick, onDoubleClick, onContextMenu, onMouseDown, iconView }) {
  const viewStyles = {
    large: {
      container: 'w-28',
      icon: 'text-5xl w-20 h-20',
      text: 'text-sm'
    },
    medium: {
      container: 'w-20',
      icon: 'text-4xl w-12 h-12',
      text: 'text-xs'
    },
    small: {
      container: 'w-16',
      icon: 'text-3xl w-10 h-10',
      text: 'text-xs'
    },
    list: {
      container: 'w-full h-10 flex items-center px-2',
      icon: 'text-2xl w-8 h-8',
      text: 'text-sm ml-2'
    }
  };

  const style = viewStyles[iconView] || viewStyles.medium;

  return (
    <motion.div 
      className={`absolute flex ${iconView === 'list' ? 'flex-row' : 'flex-col'} items-center ${style.container} cursor-pointer group ${isSelected ? 'bg-blue-500 bg-opacity-50' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`${iconView !== 'list' && 'mb-1'} relative`}>
        <div className={`${style.icon} flex items-center justify-center`}>{icon}</div>
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className={`text-center text-white text-shadow px-1 py-0.5 ${style.text} ${isSelected ? 'bg-blue-700 bg-opacity-70' : 'bg-transparent group-hover:bg-blue-700 group-hover:bg-opacity-70'}`}>
        <span className="leading-tight">{name}</span>
      </div>
    </motion.div>
  );
}

function getIconForName(name) {
  switch (name) {
    case 'My Projects': 
      return <Image src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Computer-icon.png" alt="My Projects" width={55} height={55} />;
    case 'About Me': 
      return <Image src="https://icons.iconarchive.com/icons/chrisbanks2/gCons/128/WhatsApp-icon.png" alt="About Me" width={55} height={55} />;
    case 'Skills': 
      return <Image src="https://icons.iconarchive.com/icons/limpa/curriculum-vitae/128/language-skills-icon.png" alt="Skills" width={55} height={55} />;
    case 'Contact': 
      return <Image src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Gmail-icon.png" alt="Contact" width={55} height={55} />;
    case 'Resume': 
      return <Image src="https://icons.iconarchive.com/icons/untergunter/leaf-mimes/128/text-x-bak-icon.png" alt="Resume" width={55} height={55} />;
    case 'Terminal': 
      return <Terminal size={55} />;
    default: return '';
  }
}

function getWindowComponent(name) {
  switch (name) {
    case 'My Projects': return MyProjectsWindow;
    case 'About Me': return AboutMeWindow;
    case 'Skills': return SkillsWindow;
    case 'Contact': return ContactWindow;
    case 'Resume': return ResumeWindow;
    case 'Terminal': return TerminalWindow;
    default: return null;
  }
}
