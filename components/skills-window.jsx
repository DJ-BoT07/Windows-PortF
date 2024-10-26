import React from 'react';
import { BaseWindow } from './base-window';

const SkillCategory = ({ title, icon, skills }) => (
  <div className="bg-white border border-gray-400 rounded-lg p-3 shadow-md">
    <h3 className="font-bold mb-2 text-blue-700 border-b border-gray-400 pb-1 flex items-center">
      <span className="mr-2">{icon}</span>
      {title}
    </h3>
    <ul className="list-disc pl-6 text-sm">
      {skills.map((skill, index) => (
        <li key={index} className="mb-1">{skill}</li>
      ))}
    </ul>
  </div>
);

export function SkillsWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  return (
    <BaseWindow 
      title="Skills" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="p-4 bg-gray-100 border-t border-blue-700">
        <h2 className="text-xl font-bold mb-4 text-white px-2 py-1 bg-blue-500 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg">
          Technologies (June 2023– May 2024)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <SkillCategory 
            title="Languages" 
            
            icon={<span role="img" aria-label="code">👨‍💻</span>}
            skills={[
              "C++",
              "Java",
              "Python"
            ]} 
          />
          <SkillCategory 
            title="Technologies and Frameworks" 
            icon={<span role="img" aria-label="framework">⚡</span>}
            skills={[
              "HTML, Tailwind",
              "ReactJS, NextJS",
              "NodeJS, ExpressJS",
              "Firebase, MongoDB",
              "Gemini, Hugging Face"
            ]} 
          />
          <SkillCategory 
            title="Deployment and Version Control" 
            icon={<span role="img" aria-label="deploy">🚀</span>}
            skills={[
              "Git",
              "Netlify",
              "Vercel"
            ]} 
          />
          <SkillCategory 
            title="Competitive Programming" 
            icon={<span role="img" aria-label="competitive">🏆</span>}
            skills={[
              "HackerRank",
              "LeetCode 200+"
            ]} 
          />
        </div>
      </div>
    </BaseWindow>
  );
}
