import React, { useState } from 'react';
import { BaseWindow } from './base-window';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Github, Globe, Trophy, Book, Star, Briefcase, Code, ChevronRight, FileText, Folder, ExternalLink } from 'lucide-react';

export function AboutMeWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [hoveredLink, setHoveredLink] = useState(null);

  const tabs = {
    profile: {
      icon: <User size={16} />,
      title: 'Profile',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-gradient-to-r from-[#E3EFFD] to-[#F4F9FE] p-6 rounded-lg border border-[#B6D5F3]">
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-[#2E81EF] to-[#1B57AA] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              D
            </motion.div>
            <div>
              <motion.h2 
                className="text-xl font-bold text-[#1B57AA]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Digvijay Mangaonkar
              </motion.h2>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                3rd Year Computer Engineering Student
              </motion.p>
              <motion.p 
                className="text-[#1B57AA]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                DYPCOE Pune
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ContactInfo setHoveredLink={setHoveredLink} />
            <EducationInfo />
          </div>
        </div>
      )
    },
    achievements: {
      icon: <Trophy size={16} />,
      title: 'Achievements',
      content: <AchievementsSection />
    },
    positions: {
      icon: <Briefcase size={16} />,
      title: 'Positions',
      content: <PositionsSection />
    },
    skills: {
      icon: <Code size={16} />,
      title: 'Technical Skills',
      content: <TechnicalSkillsSection />
    }
  };

  return (
    <BaseWindow
      title="About Me - Windows Profile"
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
            <Folder size={16} className="mr-2" />
            <span className="text-sm font-bold">Navigation Panel</span>
          </div>
          <div className="border border-[#ACA899] border-t-0 bg-white rounded-b">
            {Object.entries(tabs).map(([key, { icon, title }]) => (
              <motion.div
                key={key}
                className={`flex items-center px-3 py-2 cursor-pointer ${
                  activeTab === key 
                    ? 'bg-[#316AC5] text-white' 
                    : 'hover:bg-[#E5F1FB] text-[#1B57AA]'
                }`}
                onClick={() => setActiveTab(key)}
                whileHover={{ x: activeTab === key ? 0 : 2 }}
              >
                {icon}
                <span className="ml-2 text-sm">{title}</span>
                <ChevronRight size={12} className="ml-auto" />
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-4">
            <div className="bg-[#4B6FBA] text-white px-3 py-1.5 text-sm font-bold">
              Quick Links
            </div>
            <div className="bg-[#EBF3FE] border border-[#ACA899] border-t-0 p-2 space-y-2">
              <motion.a 
                href="https://github.com/DJ-BoT07" 
                target="_blank"
                className="flex items-center text-[#0645AD] hover:underline text-xs"
                whileHover={{ x: 2 }}
              >
                <Github size={12} className="mr-2" />
                GitHub Profile
                <ExternalLink size={10} className="ml-1" />
              </motion.a>
              <motion.a 
                href="https://djport07.netlify.app/" 
                target="_blank"
                className="flex items-center text-[#0645AD] hover:underline text-xs"
                whileHover={{ x: 2 }}
              >
                <Globe size={12} className="mr-2" />
                Portfolio Website
                <ExternalLink size={10} className="ml-1" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-white overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {tabs[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#ECE9D8] border-t border-[#ACA899] px-2 py-1 text-xs">
          {hoveredLink ? (
            <span className="text-[#0645AD]">{hoveredLink}</span>
          ) : (
            <span>Ready</span>
          )}
        </div>
      </div>
    </BaseWindow>
  );
}

function ContactInfo({ setHoveredLink }) {
  return (
    <div className="bg-white border border-[#ACA899] rounded p-4">
      <h3 className="text-[#1B57AA] font-bold mb-3 flex items-center">
        <Mail className="mr-2" size={16} />
        Contact Information
      </h3>
      <div className="space-y-2 text-sm">
        <p className="flex items-center">
          <Mail size={14} className="mr-2 text-gray-500" />
          djmangaonkar7@gmail.com
        </p>
        <p className="flex items-center">
          <Phone size={14} className="mr-2 text-gray-500" />
          (+91) 8010174858
        </p>
        <p className="flex items-center">
          <Github size={14} className="mr-2 text-gray-500" />
          DJ-BoT07
        </p>
        <p className="flex items-center">
          <Globe size={14} className="mr-2 text-gray-500" />
          djport07.netlify.app
        </p>
      </div>
    </div>
  );
}

function EducationInfo() {
  return (
    <div className="bg-white border border-[#ACA899] rounded p-4">
      <h3 className="text-[#1B57AA] font-bold mb-3 flex items-center">
        <Book className="mr-2" size={16} />
        Education
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium">D.Y. Patil College of Engineering</p>
          <p className="text-gray-600">Bachelor of Engineering</p>
          <p className="text-[#1B57AA]">SGPA: 9.50</p>
        </div>
        <div>
          <p className="font-medium">New English School Patpanhale</p>
          <p className="text-gray-600">SSC</p>
          <p className="text-[#1B57AA]">96.20%</p>
        </div>
        <div>
          <p className="font-medium">Dnyandeep Vidhya Mandhir</p>
          <p className="text-gray-600">HSC</p>
          <p className="text-[#1B57AA]">88.00%</p>
        </div>
      </div>
    </div>
  );
}

function AchievementsSection() {
  const achievements = [
    "Winner of Website Building Competition by GDSC DYPCOE",
    "Winner of Avishkar Competition (SPPU) for Mental Health Assessment",
    "Featured in College Newsletter multiple times",
    "Generative AI Workshop Certification",
    "Google Cloud Skill Boost Certification"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[#1B57AA] font-bold flex items-center">
        <Trophy size={16} className="mr-2" />
        Achievements & Certifications
      </h3>
      <div className="grid gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="bg-[#F5F5F5] border border-[#D4D0C8] rounded p-3 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Star size={16} className="mr-3 text-[#1B57AA]" />
            <span className="text-sm">{achievement}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PositionsSection() {
  const positions = [
    { title: "Web Lead", org: "GDGC DYPCOE" },
    { title: "Cloud Mentor", org: "GDGC DYPCOE" },
    { title: "ACES Tech Lead", org: "ACES DYPCOE" },
    { title: "CPMC Gunner", org: "DYPCOE" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[#1B57AA] font-bold flex items-center">
        <Briefcase size={16} className="mr-2" />
        Positions of Responsibility
      </h3>
      <div className="grid gap-3">
        {positions.map((position, index) => (
          <motion.div
            key={index}
            className="bg-[#F5F5F5] border border-[#D4D0C8] rounded p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="font-medium text-[#1B57AA]">{position.title}</div>
            <div className="text-sm text-gray-600">{position.org}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TechnicalSkillsSection() {
  const technicalSkills = {
    'Programming Languages': [
      'C++', 'Java', 'Python', 'JavaScript'
    ],
    'Web Technologies': [
      'HTML5', 'CSS3', 'Tailwind CSS', 'React.js', 'Next.js'
    ],
    'Backend & Databases': [
      'Node.js', 'Express.js', 'MongoDB', 'Firebase'
    ],
    'Tools & Platforms': [
      'Git', 'GitHub', 'VS Code', 'Netlify', 'Vercel'
    ],
    'AI & ML': [
      'Gemini', 'Hugging Face', 'TensorFlow'
    ]
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[#1B57AA] font-bold flex items-center">
        <Code size={16} className="mr-2" />
        Technical Expertise
      </h3>
      
      {Object.entries(technicalSkills).map(([category, skills], categoryIndex) => (
        <motion.div
          key={category}
          className="bg-[#F5F5F5] border border-[#D4D0C8] rounded p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h4 className="text-[#1B57AA] font-medium mb-3">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="bg-[#E5F1FB] text-[#1B57AA] px-3 py-1 rounded-full text-sm border border-[#B6D5F3]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#CCE1FF'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Additional Info */}
      <motion.div
        className="mt-4 bg-[#EBF4FD] border border-[#B6D5F3] rounded p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-[#1B57AA] font-medium mb-2">Competitive Programming</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            <span>LeetCode: 200+ Problems Solved</span>
          </div>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            <span>HackerRank: 5 Star Rating</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
