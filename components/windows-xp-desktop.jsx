'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { DesktopIcons } from './desktop-icons'
import { Taskbar } from './taskbar'
import { StartMenu } from './start-menu'
import { DesktopContextMenu } from './desktop-context-menu'
import { StartupScreen } from './startup-screen'
import { motion, AnimatePresence } from 'framer-motion'
import { MyProjectsWindow } from './my-projects-window'
import { AboutMeWindow } from './about-me-window'
import { SkillsWindow } from './skills-window'
import { ContactWindow } from './contact-window'
import { ResumeWindow } from './resume-window'
import { TerminalWindow } from './terminal-window'
import { WebViewWindow } from './web-view-window'
import { PicturesWindow } from './pictures-window'

export function WindowsXpDesktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [windows, setWindows] = useState([])
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [nextZIndex, setNextZIndex] = useState(1)
  const [isClient, setIsClient] = useState(false)
  const [isStarting, setIsStarting] = useState(true)
  const [iconPositions, setIconPositions] = useState({
    'My Projects': { x: 20, y: 20 },
    'About Me': { x: 20, y: 100 },
    'Skills': { x: 20, y: 180 },
    'Contact': { x: 20, y: 260 },
    'Resume': { x: 20, y: 340 },
    'Terminal': { x: 20, y: 420 }
  })
  const [iconView, setIconView] = useState('medium'); // 'large', 'medium', 'small', 'list'
  const [iconSort, setIconSort] = useState('name'); // 'name', 'type', 'date'
  const [webViews, setWebViews] = useState([]);

  // Move getNextZIndex before useEffect and memoize it
  const getNextZIndex = useCallback(() => {
    // Get the highest z-index from both windows and webViews
    const highestWindowZIndex = Math.max(0, ...windows.map(w => w.zIndex));
    const highestWebViewZIndex = Math.max(0, ...webViews.map(w => w.zIndex));
    const currentHighest = Math.max(highestWindowZIndex, highestWebViewZIndex, nextZIndex);
    return currentHighest + 1;
  }, [windows, webViews, nextZIndex]);

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleOpenWebView = (event) => {
      const { url, title } = event.detail;
      const newWebView = {
        id: `webview-${Date.now()}`,
        url,
        title,
        type: 'webview',
        isMinimized: false,
        isMaximized: false,
        zIndex: getNextZIndex()
      };
      setWebViews(prev => [...prev, newWebView]);
    };

    window.addEventListener('openWebView', handleOpenWebView);
    return () => window.removeEventListener('openWebView', handleOpenWebView);
  }, [getNextZIndex]); // Only depend on getNextZIndex

  const handleStartupComplete = () => {
    setIsStarting(false)
  }

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

  function getWindowComponent(window) {
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
      case 'My Pictures':
        return <PicturesWindow 
          onClose={() => removeWindow(window.name)}
          onMinimize={() => toggleMinimize(window.name)}
          onMaximize={() => toggleMaximize(window.name)}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
        />;
      default:
        return null;
    }
  }

  const getIconContainerStyle = () => {
    switch (iconView) {
      case 'large':
        return 'grid grid-cols-4 gap-8';
      case 'medium':
        return 'grid grid-cols-6 gap-6';
      case 'small':
        return 'grid grid-cols-8 gap-4';
      case 'list':
        return 'flex flex-col gap-2';
      default:
        return 'grid grid-cols-6 gap-6';
    }
  };

  const getSortedIcons = () => {
    const icons = [...Object.entries(iconPositions)];
    switch (iconSort) {
      case 'name':
        return icons.sort((a, b) => a[0].localeCompare(b[0]));
      case 'type':
        // You can implement custom type sorting logic here
        return icons;
      case 'date':
        // You can implement date sorting logic here
        return icons;
      default:
        return icons;
    }
  };

  const iconSizes = {
    large: 'w-32 h-32',
    medium: 'w-20 h-20',
    small: 'w-16 h-16',
    list: 'w-full h-12 flex items-center px-2',
  };

  const iconTextSizes = {
    large: 'text-lg',
    medium: 'text-sm',
    small: 'text-xs',
    list: 'text-sm ml-2',
  };

  const closeWebView = (id) => {
    setWebViews(prev => prev.filter(view => view.id !== id));
  };

  const minimizeWebView = (id) => {
    setWebViews(prev => prev.map(view => 
      view.id === id ? { ...view, isMinimized: !view.isMinimized } : view
    ));
  };

  const maximizeWebView = (id) => {
    setWebViews(prev => prev.map(view => 
      view.id === id ? { ...view, isMaximized: !view.isMaximized } : view
    ));
  };

  if (!isClient) {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {isStarting && <StartupScreen onStartupComplete={handleStartupComplete} />}
      </AnimatePresence>
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
          iconView={iconView}
          iconSort={iconSort}
          getIconContainerStyle={getIconContainerStyle}
          getSortedIcons={getSortedIcons}
          iconSizes={iconSizes}
          iconTextSizes={iconTextSizes}
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
            onViewChange={setIconView}
            currentView={iconView}
            onSortChange={setIconSort}
            currentSort={iconSort}
          />
        )}
        <Taskbar 
          toggleStartMenu={toggleStartMenu} 
          windows={[
            ...windows,
            ...webViews.map(view => ({
              name: view.title,
              isMinimized: view.isMinimized,
              icon: '🌐'
            }))
          ]}
          focusWindow={(name) => {
            // Handle focusing both regular windows and web views
            const webView = webViews.find(v => v.title === name);
            if (webView) {
              setWebViews(prev => prev.map(v => 
                v.id === webView.id ? { ...v, isMinimized: false, zIndex: getNextZIndex() } : v
              ));
            } else {
              focusWindow(name);
            }
          }}
        />
        {windows.map(window => (
          !window.isMinimized && (
            <div key={window.name} style={{ zIndex: window.zIndex }}>
              {getWindowComponent(window)}
            </div>
          )
        ))}
        {/* Web View Windows */}
        {webViews.map((webView) => (
          <WebViewWindow
            key={webView.id}
            title={webView.title}
            url={webView.url}
            onClose={() => closeWebView(webView.id)}
            onMinimize={() => minimizeWebView(webView.id)}
            onMaximize={() => maximizeWebView(webView.id)}
            isMaximized={webView.isMaximized}
            zIndex={webView.zIndex}
          />
        ))}
      </div>
    </>
  )
}
