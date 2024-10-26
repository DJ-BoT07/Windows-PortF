import React, { useState } from 'react';
import { BaseWindow } from './base-window';

export function AboutMeWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [content, setContent] = useState(`About Me

👋 Hi there! I'm **Digvijay Mangaonkar**, a passionate 3rd-year Computer Engineering student at DYPCOE Pune, on a journey to explore the exciting world of technology and development. 🌟

🚀 Tech Stacks:
- **Leetcode** 🌟 200+
- **Hackerrank** | 🌟🌟🌟🌟🌟
- **Google Cloud Enthusiast** | ☁️
- **MERN Stack Developer** | 💻
- **Tech Enthusiast** | 🚀

🎓 Education:
- **D.Y. Patil College of Engineering, Akurdi, Pune, Maharashtra**
  - Bachelor of Engineering — SGPA: 9.50
- **New English School Patpanhale (English Medium), Guhagar, Maharashtra**
  - Secondary School Education (SSC) | 96.20%
- **Dnyandeep Vidhya Mandhir Bhadgaon, Khed, Maharashtra**
  - Higher Secondary Education (HSC) | 88.00%

📧 Contact:
- **Email**: djmangaonkar7@gmail.com
- **Phone**: (+91)8010174858
- **GitHub**: DJ-BoT07
- **Portfolio**: djport07.netlify.app

🏆 Achievements:
- **Winner** of the Website Building Competition hosted by GDSC DYPCOE
- **Winner** of the Avishkar Competition (SPPU) for Mental Health Assessment
- **Featured** in the College Newsletter multiple times
- **Certifications**: Generative AI Workshop, Google Cloud Skill Boost

🔫 Positions of Responsibility:
- **Web Lead** at GDGC DYPCOE
- **Cloud Mentor** at GDGC DYPCOE
- **ACES Tech Lead**
- **CPMC Gunner**

🛠️ Notable Projects:
- **Ivene 1.0**: Engineered a scalable mock interview platform utilizing Next.js and Google Generative AI, implementing real-time speech-to-text capabilities with React-Speech-Recognition.
- **Notation**: Architected a real-time document collaboration platform using Next.js and Gemini AI, optimizing with Cloudflare for security.
- **GDSC DYPCOE Website**: Part of the team that developed the official website for GDSC DYPCOE using React.js and Tailwind CSS.
- **AI Playground**: Created an interactive space where you can meet WebGPT and DALLE clones using React.js, OpenAI, and Tailwind CSS.
- **CryptoMon**: Developed a cryptocurrency app that provides daily insights using charts and live data with React.js and CoinGecko API.
- **Meta Verse**: An immersive MetaVerse project where you can interact with DigiMons using React Three Fiber and Three.js.
- **CodeX – Mental Health Assessment**: Worked as a Frontend Developer for a virtual 3D model communication project using ReactJS, React Three Fiber, and Tailwind CSS.

🌐 I'm always looking for opportunities to learn, grow, and collaborate. Let's connect and explore the endless possibilities in the world of technology! 🚀`);

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
