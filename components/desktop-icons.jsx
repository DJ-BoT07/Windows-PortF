import React, { useState } from 'react'
import { MyProjectsWindow } from './my-projects-window'
import { AboutMeWindow } from './about-me-window'
import { SkillsWindow } from './skills-window'; // Named import
import { ContactWindow } from './contact-window'
import { ResumeWindow } from './resume-window'
import { IconContextMenu } from './icon-context-menu'
import Image from 'next/image'; // Add this import

export function DesktopIcons({ addWindow, removeWindow, toggleMinimize, toggleMaximize, focusWindow, windows, iconPositions, updateIconPosition }) {
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [draggingIcon, setDraggingIcon] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const toggleWindow = (windowName, icon) => {
    const existingWindow = windows.find(w => w.name === windowName);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        toggleMinimize(windowName);
      } else {
        focusWindow(windowName);
      }
    } else {
      addWindow(windowName, icon);
    }
  };

  const handleIconClick = (name, e) => {
    e.stopPropagation()
    setSelectedIcon(name)
  }

  const handleIconDoubleClick = (name, icon) => {
    toggleWindow(name, icon)
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
          />
        ))}
      </div>
      {windows.map(window => {
        const WindowComponent = getWindowComponent(window.name);
        return (
          WindowComponent && !window.isMinimized && (
            <WindowComponent 
              key={window.name}
              onClose={() => removeWindow(window.name)}
              onMinimize={() => toggleMinimize(window.name)}
              onMaximize={() => toggleMaximize(window.name)}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
            />
          )
        );
      })}
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

function DesktopIcon({ name, icon, isSelected, position, onClick, onDoubleClick, onContextMenu, onMouseDown }) {
  return (
    <div 
      className={`absolute flex flex-col items-center w-20 cursor-pointer group ${isSelected ? 'bg-blue-500 bg-opacity-50' : ''}`} 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
    >
      <div className="mb-1 relative">
        <div className="text-4xl w-12 h-12 flex items-center justify-center">{icon}</div>
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className={`text-center text-white text-shadow px-1 py-0.5 ${isSelected ? 'bg-blue-700 bg-opacity-70' : 'bg-transparent group-hover:bg-blue-700 group-hover:bg-opacity-70'}`}>
        <span className="text-xs leading-tight">{name}</span>
      </div>
    </div>
  )
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
    default: return '📁';
  }
}

function getWindowComponent(name) {
  switch (name) {
    case 'My Projects': return MyProjectsWindow;
    case 'About Me': return AboutMeWindow;
    case 'Skills': return SkillsWindow;
    case 'Contact': return ContactWindow;
    case 'Resume': return ResumeWindow;
    default: return null;
  }
}