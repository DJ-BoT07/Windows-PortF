'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { DesktopIcons } from './desktop-icons'
import { Taskbar } from './taskbar'
import { StartMenu } from './start-menu'
import { DesktopContextMenu } from './desktop-context-menu'
import { SkillsWindow } from './skills-window'
import { TerminalWindow } from './terminal-window'
import { MyProjectsWindow } from './my-projects-window'
import { AboutMeWindow } from './about-me-window'
import { ContactWindow } from './contact-window'
import { ResumeWindow } from './resume-window'
import { Battery } from 'lucide-react'
import { Wifi } from 'lucide-react'
import { Apple } from 'lucide-react'
import Image from 'next/image'

export function WindowsXpDesktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [windows, setWindows] = useState([])
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [nextZIndex, setNextZIndex] = useState(1)
  const [iconPositions, setIconPositions] = useState({
    'My Projects': { x: 20, y: 20 },
    'About Me': { x: 20, y: 100 },
    'Skills': { x: 20, y: 180 },
    'Contact': { x: 20, y: 260 },
    'Resume': { x: 20, y: 340 },
    'Terminal': { x: 20, y: 420 } // Add the Terminal icon position
  })
  const [isClient, setIsClient] = useState(false)
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true)
    // Load background image
    const img = new window.Image();
    img.src = 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-12--thumb.jpg';
    img.onload = () => setIsBackgroundLoaded(true);
  }, [])

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  const addWindow = (windowName, icon, position = { x: 100, y: 100 }) => {
    if (!windows.find(w => w.name === windowName)) {
      setWindows([...windows, { 
        name: windowName, 
        icon, 
        position,
        isMinimized: false, 
        isMaximized: false, 
        zIndex: nextZIndex 
      }]);
      setNextZIndex(nextZIndex + 1);
    }
  };

  const removeWindow = (windowName) => {
    setWindows(windows.filter(w => w.name !== windowName))
  }

  const toggleMinimize = (windowName) => {
    setWindows(windows.map(w => 
      w.name === windowName ? { ...w, isMinimized: !w.isMinimized } : w
    ))
  }

  const toggleMaximize = (windowName) => {
    setWindows(windows.map(w => 
      w.name === windowName ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }

  const focusWindow = (windowName) => {
    setWindows(windows.map(w => 
      w.name === windowName 
        ? { ...w, isMinimized: false, zIndex: nextZIndex } 
        : w
    ))
    setNextZIndex(nextZIndex + 1)
  }

  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const closeContextMenu = () => {
    setContextMenuPosition(null)
  }

  const updateIconPosition = (iconName, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [iconName]: newPosition
    }))
  }

  const getWindowComponent = (window) => {
    switch (window.name) {
      case 'My Projects':
        return <MyProjectsWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      case 'About Me':
        return <AboutMeWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      case 'Skills':
        return <SkillsWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      case 'Contact':
        return <ContactWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      case 'Resume':
        return <ResumeWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      case 'Terminal':
        return <TerminalWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
          addWindow={addWindow}
        />;
      default:
        return null;
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div
      className={`h-screen w-full overflow-hidden flex flex-col relative`}
      style={{
        background: 'linear-gradient(to bottom, #2c5364, #203a43, #0f2027)' // Fallback gradient
      }}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('https://512pixels.net/downloads/macos-wallpapers-thumbs/10-12--thumb.jpg')",
          opacity: isBackgroundLoaded ? 1 : 0,
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* macOS Menu Bar */}
        <div className="h-7 bg-black/20 backdrop-blur-xl flex items-center px-2 text-white">
          <div className="flex items-center space-x-5 text-sm">
            <button className="hover:bg-white/10 px-2 py-0.5 rounded">
              <Apple className="w-4 h-4" />
            </button>
            <span className="font-semibold">Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="flex-1 relative">
          <DesktopIcons 
            addWindow={addWindow}
            removeWindow={removeWindow}
            toggleMinimize={toggleMinimize}
            toggleMaximize={toggleMaximize}
            focusWindow={focusWindow}
            windows={windows}
            iconPositions={iconPositions}
            updateIconPosition={updateIconPosition}
          />
          
          {windows.map(window => (
            !window.isMinimized && (
              <div key={window.name} className="window-enter" style={{ zIndex: window.zIndex }}>
                {getWindowComponent(window)}
              </div>
            )
          ))}
        </div>

        {/* macOS Dock */}
        <Taskbar 
          windows={windows}
          focusWindow={focusWindow}
        />
      </div>
    </div>
  );
}
