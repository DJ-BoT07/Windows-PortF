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

export function DesktopIcons({ addWindow, removeWindow, toggleMinimize, toggleMaximize, focusWindow, windows, iconPositions, updateIconPosition }) {
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
    <div className="flex-1 p-4 grid grid-cols-1 gap-6 w-fit">
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
        />
      ))}
    </div>
  )
}

function DesktopIcon({ name, icon, isSelected, position, onClick, onDoubleClick, onContextMenu, onMouseDown }) {
  return (
    <div 
      className={`absolute flex flex-col items-center w-24 cursor-default group ${
        isSelected ? 'bg-blue-500/30 rounded-lg' : ''
      }`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
    >
      <div className="mb-1 p-2 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-200">
        {typeof icon === 'string' ? (
          <div className="text-4xl">{icon}</div>
        ) : (
          <Image src={icon} alt={name} width={48} height={48} />
        )}
      </div>
      <div className={`px-2 py-1 rounded-md text-center ${
        isSelected ? 'bg-blue-500 text-white' : 'text-white group-hover:bg-blue-500/20'
      }`}>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  )
}

function getIconForName(name) {
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
