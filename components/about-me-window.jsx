import React, { useState } from 'react';
import { BaseWindow } from './base-window';

export function AboutMeWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [content, setContent] = useState(`About Me

Hi, I'm [Your Name]. I'm a passionate web developer with a love for creating intuitive and visually appealing user interfaces. My experience spans across various technologies, and I'm always eager to learn more.

I specialize in front-end development, with a strong focus on React and its ecosystem. I also have experience with back-end technologies, allowing me to work on full-stack projects.

When I'm not coding, you can find me [Your Hobbies/Interests].

Skills:
- Front-end: React, Next.js, HTML5, CSS3, JavaScript (ES6+)
- Back-end: Node.js, Express, Python, Django
- Databases: MongoDB, PostgreSQL, MySQL
- Other: Git, Docker, AWS, Agile methodologies

Feel free to reach out if you'd like to collaborate on a project or just chat about tech!`);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <BaseWindow 
      title="About Me - Notepad" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="flex flex-col h-full">
        <div className="bg-[#ECE9D8] border-b border-[#ACA899] p-1">
          <div className="flex space-x-2">
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm">File</button>
           
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm">Edit</button>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm" onClick={toggleEdit}>
              {isEditing ? 'Save' : 'Format'}
            </button>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm">View</button>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm">Help</button>
          </div>
        </div>
        <textarea 
          className="flex-1 p-2 resize-none outline-none font-mono text-sm"
          value={content}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <div className="bg-[#ECE9D8] border-t border-[#ACA899] p-1 text-xs">
          Ln 1, Col 1
        </div>
      </div>
    </BaseWindow>
  );
}