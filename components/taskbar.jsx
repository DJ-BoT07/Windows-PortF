import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Clock, Clock1, Volume, Volume1Icon, Wifi } from "lucide-react"
import Image from 'next/image'; // Add this import

export function Taskbar({ toggleStartMenu, windows, focusWindow }) {
  return (
    <div className="h-12 bg-gradient-to-r from-[#245edb] via-[#3a6ee8] to-[#245edb] flex items-center px-1 shadow-md">
      <Button
        variant="ghost"
        className="h-10 px-2 rounded-sm bg-gradient-to-r from-[#378a4c] via-[#5eb06d] to-[#378a4c] text-white font-bold hover:bg-[#74b2ff] hover:text-white focus:bg-[#74b2ff] focus:text-white border-r border-[#2d7345] shadow-inner flex items-center tansition transform-gpu"
        onClick={toggleStartMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="12 -12 48 48" className="mr-2 hover:scale-110">
          <path fill="#03a9f4" d="M34.807,12.511l-3.488,12.077c-3.03-2.052-6.327-3.744-13.318-0.83l3.408-11.945l0.041-0.019C28.414,8.908,31.787,10.447,34.807,12.511z"></path>
          <path fill="#ffc107" d="M36.633,13.68l-3.447,11.943c3.028,2.069,6.383,3.718,13.365,0.805l3.324-11.643C42.76,17.24,39.66,15.731,36.633,13.68z"></path>
          <path fill="#ff5722" d="M35.387,10.337l3.441-11.964C35.8-3.688,32.442-5.344,25.454-2.424L22.011,9.59c2.775-1.153,4.969-1.682,6.806-1.666C31.604,7.942,33.563,9.102,35.387,10.337z"></path>
          <path fill="#7cb342" d="M40.643-0.369l-3.44,12.033c3.018,2.063,6.669,3.752,13.359,0.738L54,0.415C47.021,3.317,43.665,1.688,40.643-0.369z"></path>
        </svg>
        <p className="hover:scale-105">Start</p>
      </Button>
      <div className="flex-1 flex items-center space-x-1 px-1 overflow-x-auto">
        {windows.map((window, index) => (
          <TaskbarButton
            key={window.name}
            name={window.name}
            icon={window.icon} // Use the stored icon
            isActive={!window.isMinimized}
            onClick={() => focusWindow(window.name)}
          />
        ))}
      </div>
      <SystemTray />
    </div>
  )
}

function TaskbarButton({ name, icon, isActive, onClick }) {
  return (
    <Button
      variant="ghost"
      className={`h-10 px-2 min-w-[120px] max-w-[200px] rounded-none ${
        isActive ? 'bg-[#74b2ff]' : 'bg-gradient-to-r from-[#3a6ee8] to-[#245edb]'
      } text-white font-bold hover:bg-[#74b2ff] hover:text-white focus:bg-[#74b2ff] focus:text-white shadow-inner flex items-center justify-start overflow-hidden`}
      onClick={onClick}
    >
      <span className="text-2xl mr-2 flex items-center justify-center w-10 h-10">{icon}</span>
      <span className="truncate">{name}</span>
    </Button>
  )
}

function SystemTray() {
  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(getFormattedTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getFormattedTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  }

  return (
    <div className="bg-[#0c60e8] text-white px-2 py-1 flex items-center flex-row space-x-1">
      <div className="flex space-x-2 items-center hover:border border-border p-2 rounded transition-all" >
        <Volume1Icon className="w-5 h-5 hover:scale-110" />
        <Wifi className="w-5 h-5 hover:scale-110" />
        <Clock1 className="w-4 h-4 hover:scale-110" />
      </div>
      <div className="flex items-center hover:border border-border p-2 py-[0.35rem] rounded transition-all">
        {time}
      </div>
    </div>
  )
}

function getIconForName(name) {
  switch (name) {
    case 'My Projects': return '💼';
    case 'About Me': return '👤';
    case 'Skills': return '🛠️';
    case 'Contact': return '📞';
    case 'Resume': return '📄';
    default: return '📁';
  }
}
