import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info } from 'lucide-react';

export function StartMenu({ closeStartMenu, addWindow }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [dialog, setDialog] = useState(null);

  const openBrowser = () => {
    // Open Google in a new tab/window
    window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
    
    // Close the start menu after opening the link
    closeStartMenu();
  };

  const handleTurnOff = () => {
    setDialog({
      type: 'shutdown',
      title: 'Windows',
      message: 'Are you sure you want to shut down the computer?',
      onConfirm: () => {
        setDialog(null);
        closeStartMenu();
        
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center';
        
        const windowsLogo = document.createElement('img');
        windowsLogo.src = '/images/image.svg';
        windowsLogo.className = 'w-64 h-64 mb-8 animate-pulse scale-150';
        overlay.appendChild(windowsLogo);
        
        const text = document.createElement('div');
        text.className = 'text-white text-2xl';
        text.innerText = 'Shutting down...';
        overlay.appendChild(text);

        document.body.appendChild(overlay);

        setTimeout(() => {
          window.top.close();
          window.location.href = 'https://www.google.com';
        }, 3000);
      }
    });
  };

  const handleRestart = () => {
    setDialog({
      type: 'restart',
      title: 'Windows',
      message: 'Are you sure you want to restart the computer?',
      onConfirm: () => {
        setDialog(null);
        closeStartMenu();
        
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center';
        
        const windowsLogo = document.createElement('img');
        windowsLogo.src = '/images/image.svg';
        windowsLogo.className = 'w-64 h-64 mb-8 animate-pulse scale-150';
        overlay.appendChild(windowsLogo);
        
        const text = document.createElement('div');
        text.className = 'text-white text-2xl';
        text.innerText = 'Restarting...';
        overlay.appendChild(text);

        document.body.appendChild(overlay);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  };

  const openSpotifyPlaylist = () => {
    window.open('https://open.spotify.com/playlist/2RTj7euo4HVrC64ftJz3Ec?si=976003e370044036', '_blank', 'noopener,noreferrer');
    closeStartMenu();
  };

  return (
    <>
      <motion.div 
        className="absolute left-0 bottom-0 w-80 bg-[#4282d6] border-2 border-[#3169c6] shadow-lg rounded-tr-lg overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-16 bg-gradient-to-b from-[#1c3e8b] to-[#3165ca] flex items-center px-4">
          <div className="w-12 h-12 rounded-full bg-[#3066bf] mr-4 flex items-center justify-center text-white font-bold text-2xl">
            U
          </div>
          <span className="text-white font-bold text-lg">User</span>
        </div>
        <div className="flex">
          <div className="w-48 bg-white p-2">
            <button
              className="w-full text-left"
              onClick={openBrowser}
            >
              <MenuItem 
                icon="🌐" 
                name="Internet" 
                highlight={true} 
              />
            </button>
              <button
                className="w-full text-left"
                onClick={() => {
                  window.location.href = "mailto:djmangaonkar7@gmail.com";
                  closeStartMenu();
                }}
              >
              <MenuItem icon="📧" name="E-mail" />
            </button>
            <div className="border-t border-gray-300 my-2"></div>
            <button
              className="w-full text-left"
              onClick={() => {
                addWindow('My Projects', '💻');
                closeStartMenu();
              }}
            >
              <MenuItem icon="💻" name="My Projects" />
            </button>
            <button
              className="w-full text-left"
              onClick={() => {
                addWindow('My Projects', '💻');
                closeStartMenu();
              }}
            >
              <MenuItem icon="📁" name="My Documents" />
            </button>
            <button
              className="w-full text-left"
              onClick={() => {
                addWindow('My Pictures', '🖼️');
                closeStartMenu();
              }}
            >
              <MenuItem icon="🖼️" name="My Pictures" />
            </button>
            <button
              className="w-full text-left"
              onClick={openSpotifyPlaylist}
            >
              <MenuItem icon="🎵" name="My Music" />
            </button>
            <MenuItem 
              icon="📂" 
              name="All Programs" 
              hasSubmenu={true}
              onMouseEnter={() => setActiveSubmenu('allPrograms')}
              onMouseLeave={() => setActiveSubmenu(null)}
            />
            <div className="border-t border-gray-300 my-2"></div>
            <button
              className="w-full text-left"
              onClick={handleTurnOff}
            >
              <MenuItem 
                icon="⭕" 
                name="Turn Off Computer" 
              />
            </button>
            <button
              className="w-full text-left"
              onClick={handleRestart}
            >
              <MenuItem 
                icon="🔄" 
                name="Restart" 
              />
            </button>
          </div>
          <div className="w-32 bg-[#d3e5fa] p-2">
            <SmallMenuItem icon="📊" name="My Recent Documents" />
            <button
              className="w-full text-left"
              onClick={() => {
                addWindow('My Pictures', '🖼️');
                closeStartMenu();
              }}
            >
              <SmallMenuItem icon="🖥️" name="My Pictures" />
            </button>
            <button
              className="w-full text-left"
              onClick={openSpotifyPlaylist}
            >
              <SmallMenuItem 
                icon="🎵" 
                name="My Music"
                onClick={openSpotifyPlaylist}
              />
            </button>
            <SmallMenuItem icon="💻" name="My Computer" />
            <SmallMenuItem icon="🔧" name="Control Panel" />
          </div>
        </div>
        <div className="h-10 bg-[#3169c6] flex items-center justify-between px-4">
          <input 
            type="text" 
            placeholder="Search programs"
          />
        </div>
      </motion.div>

      {/* Windows XP Dialog Box */}
      <AnimatePresence>
        {dialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#ECE9D8] border-2 border-[#0054E3] rounded-lg shadow-xl w-[400px]"
            >
              {/* Dialog Header */}
              <div className="bg-gradient-to-r from-[#0054E3] to-[#2E81EF] px-3 py-1.5 flex items-center justify-between">
                <span className="text-white font-bold">{dialog.title}</span>
                <button 
                  onClick={() => setDialog(null)}
                  className="text-white hover:bg-white/20 px-2 rounded"
                >
                  ✕
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {dialog.type === 'shutdown' ? (
                    <AlertTriangle className="text-red-500 w-10 h-10 flex-shrink-0" />
                  ) : (
                    <Info className="text-blue-500 w-10 h-10 flex-shrink-0" />
                  )}
                  <p className="text-[#1F1F1F] mt-1">{dialog.message}</p>
                </div>

                {/* Dialog Buttons */}
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={dialog.onConfirm}
                    className="px-4 py-1 bg-[#ECE9D8] border border-[#888C8F] rounded hover:bg-[#DDD] active:bg-[#CCC] focus:outline-none focus:border-[#0054E3]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDialog(null)}
                    className="px-4 py-1 bg-[#ECE9D8] border border-[#888C8F] rounded hover:bg-[#DDD] active:bg-[#CCC] focus:outline-none focus:border-[#0054E3]"
                  >
                    No
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MenuItem({ icon, name, highlight = false }) {
  return (
    <div className={`flex items-center p-1 ${highlight ? 'bg-[#2f71cd] text-white' : 'hover:bg-[#2f71cd] hover:text-white'} cursor-pointer rounded`}>
      <span className="text-2xl mr-3">{icon}</span>
      <span className="text-sm">{name}</span>
    </div>
  )
}

function SmallMenuItem({ icon, name, onClick }) {
  return (
    <div 
      className="flex items-center p-1 hover:bg-[#5b9adb] hover:text-white cursor-pointer rounded w-full"
      onClick={onClick}
    >
      <span className="text-xl mr-2">{icon}</span>
      <span className="text-xs">{name}</span>
    </div>
  )
}
