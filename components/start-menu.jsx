import React, { useState } from 'react'

export function StartMenu({ closeStartMenu }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  return (
    <div className="absolute left-0 bottom-0 w-80 bg-[#4282d6] border-2 border-[#3169c6] shadow-lg rounded-tr-lg overflow-hidden">
      <div className="h-16 bg-gradient-to-b from-[#1c3e8b] to-[#3165ca] flex items-center px-4">
        <div className="w-12 h-12 rounded-full bg-[#3066bf] mr-4 flex items-center justify-center text-white font-bold text-2xl">
          U
        </div>
        <span className="text-white font-bold text-lg">User</span>
      </div>
      <div className="flex">
        <div className="w-48 bg-white p-2">
          <MenuItem icon="📄" name="Internet" highlight={true} />
          <MenuItem icon="📧" name="E-mail" />
          <div className="border-t border-gray-300 my-2"></div>
          <MenuItem icon="💻" name="My Computer" />
          <MenuItem icon="📁" name="My Documents" />
          <MenuItem icon="🎵" name="My Music" />
          <MenuItem icon="🖼️" name="My Pictures" />
          <MenuItem 
            icon="📂" 
            name="All Programs" 
            hasSubmenu={true}
            onMouseEnter={() => setActiveSubmenu('allPrograms')}
            onMouseLeave={() => setActiveSubmenu(null)}
          />
        </div>
        <div className="w-32 bg-[#d3e5fa] p-2">
          <SmallMenuItem icon="📊" name="My Recent Documents" />
          <SmallMenuItem icon="🖥️" name="My Pictures" />
          <SmallMenuItem icon="🎵" name="My Music" />
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
    </div>
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

function SmallMenuItem({ icon, name }) {
  return (
    <div className="flex items-center p-1 hover:bg-[#5b9adb] hover:text-white cursor-pointer rounded">
      <span className="text-xl mr-2">{icon}</span>
      <span className="text-xs">{name}</span>
    </div>
  )
}