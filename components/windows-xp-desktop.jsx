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
import { AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    setIsClient(true)
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
      className="h-screen w-full bg-[#3a6ea5] overflow-hidden flex flex-col relative"
      style={{
        backgroundImage: "url('https://i.imgur.com/Zk6TR5k.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
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
      <AnimatePresence>
        {isStartMenuOpen && (
          <div className="absolute bottom-12 left-0 z-50">
            <StartMenu closeStartMenu={() => setIsStartMenuOpen(false)} addWindow={addWindow} />
          </div>
        )}
      </AnimatePresence>
      {contextMenuPosition && (
        <DesktopContextMenu 
          x={contextMenuPosition.x} 
          y={contextMenuPosition.y} 
          onClose={closeContextMenu}
        />
      )}
      <Taskbar 
        toggleStartMenu={toggleStartMenu} 
        windows={windows}
        focusWindow={focusWindow}
      />
      <AnimatePresence>
        {windows.map(window => (
          !window.isMinimized && (
            <div key={window.name} style={{ zIndex: window.zIndex }}>
              {getWindowComponent(window)}
            </div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}
