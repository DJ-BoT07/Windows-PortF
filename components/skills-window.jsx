import React, { useState } from 'react';
import { BaseWindow } from './base-window';
import { motion } from 'framer-motion';
import { ChevronRight, Code, Layout, Database, Monitor, GitBranch, Brain, Terminal, ChevronDown } from 'lucide-react';

export function SkillsWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const skills = {
    'Languages': [
      { name: 'C++', level: 90, icon: <Code size={16} /> },
      { name: 'Java', level: 85, icon: <Code size={16} /> },
      { name: 'Python', level: 80, icon: <Code size={16} /> },
    ],
    'Technologies and Frameworks': [
      { name: 'HTML/CSS', level: 90, icon: <Layout size={16} /> },
      { name: 'Tailwind', level: 85, icon: <Layout size={16} /> },
      { name: 'ReactJS', level: 90, icon: <Layout size={16} /> },
      { name: 'NextJS', level: 85, icon: <Layout size={16} /> },
      { name: 'NodeJS', level: 80, icon: <Database size={16} /> },
      { name: 'ExpressJS', level: 75, icon: <Database size={16} /> },
      { name: 'Firebase', level: 90, icon: <Database size={16} /> },
      { name: 'MongoDB', level: 80, icon: <Database size={16} /> },
    ],
    'AI & ML Tools': [
      { name: 'Gemini', level: 85, icon: <Brain size={16} /> },
      { name: 'Hugging Face', level: 80, icon: <Brain size={16} /> },
    ],
    'Deployment & Version Control': [
      { name: 'Git', level: 90, icon: <GitBranch size={16} /> },
      { name: 'Netlify', level: 85, icon: <Terminal size={16} /> },
      { name: 'Vercel', level: 85, icon: <Terminal size={16} /> },
    ],
    'Competitive Programming': [
      { name: 'HackerRank', level: 85, icon: <Code size={16} /> },
      { name: 'LeetCode (200+ Problems)', level: 90, icon: <Code size={16} /> },
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <BaseWindow
      title="Skills and Experience"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="flex h-full bg-[#ECE9D8]">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#ECE9D8] border-r border-[#ACA899] p-2">
          <div className="bg-gradient-to-r from-[#0054E3] to-[#2E81EF] text-white px-3 py-2 rounded-t flex items-center">
            <Monitor size={16} className="mr-2" />
            <span className="text-sm font-bold">System Skills</span>
          </div>
          <div className="border border-[#ACA899] border-t-0 bg-white rounded-b p-1">
            {Object.keys(skills).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-1 last:mb-0"
              >
                <div 
                  className={`flex items-center px-2 py-1.5 ${
                    selectedCategory === category 
                      ? 'bg-[#316AC5] text-white' 
                      : 'bg-white hover:bg-[#E5F1FB] hover:text-[#1B57AA]'
                  } cursor-pointer rounded`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {expandedCategory === category ? (
                    <ChevronDown size={12} className="mr-2" />
                  ) : (
                    <ChevronRight size={12} className="mr-2" />
                  )}
                  <span className="text-sm">{category}</span>
                </div>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 mt-1 space-y-1"
                  >
                    {skills[category].map((skill, idx) => (
                      <div 
                        key={skill.name}
                        className="flex items-center text-xs py-1 px-2 hover:bg-[#E5F1FB] rounded cursor-pointer"
                      >
                        <div className="w-4 h-4 mr-2 flex items-center justify-center">
                          {skill.icon}
                        </div>
                        {skill.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* System Details */}
          <div className="mt-4">
            <div className="bg-[#4B6FBA] text-white px-3 py-1.5 text-sm font-bold">
              Details
            </div>
            <div className="bg-[#EBF3FE] border border-[#ACA899] border-t-0 p-2">
              <div className="text-xs space-y-1">
                <p>Total Skills: {Object.values(skills).flat().length}</p>
                <p>Categories: {Object.keys(skills).length}</p>
                <p>Last Updated: 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <div className="bg-[#EBF4FD] border-b-2 border-[#84B4E3] mb-3 p-2">
                <h2 className="text-[#1B57AA] font-bold">{category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {skillList.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="bg-[#F5F5F5] border border-[#D4D0C8] rounded p-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-[#D1E6F9] rounded flex items-center justify-center mr-2">
                          {skill.icon}
                        </div>
                        <span className="font-medium text-[#1B57AA]">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[#1B57AA] font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-4 bg-[#ECE9D8] border border-[#ACA899] rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#2582EA] to-[#84B4E3]"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <div className="w-full h-full opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQYV2NkQAX/GZH4/xkYGBhhAmAOSBJEwDkgAQCCrgQEjpMcPgAAAABJRU5ErkJggg==')]" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseWindow>
  );
}
