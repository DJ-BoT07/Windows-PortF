import React, { useState, useEffect } from 'react';
import { BaseWindow } from './base-window';
import { ChevronRight, ChevronLeft, ArrowUp, Search, Folder, FileText, Github } from 'lucide-react';

export function MyProjectsWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [history, setHistory] = useState([null]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('icons'); // 'icons', 'list', 'details'

  const projects = [
    { 
      name: "Ivene 1.0", 
      readme: `Tech Stack: Next.js, Google Generative AI, Clerk, React Speech Hook, Drizzle ORM
      - Engineered a scalable mock interview platform utilizing Next.js and Google Generative AI, implementing real-time speech-to-text capabilities with React-Speech-Recognition, achieving a 40% increase in user performance metrics.
      - Integrated webcam functionality for immersive interview simulations and utilized Drizzle ORM with PostgreSQL to manage over 10,000 records, enhancing data retrieval speed.`,
      github: "https://i-vene-1-0.vercel.app/" 
    },
    { 
      name: "Notation", 
      readme: `Tech Stack: Next.js, Liveblock, Google Generative AI, Clerk, Firebase, Cloudflare
      - Architected a real-time document collaboration platform using Next.js and Gemini AI, optimizing with Cloudflare for security and increasing user engagement by 30%. Leveraged Firebase for scalable data storage.
      - Designed a Notion-style interface for enhanced document creation and editing, integrating Google Generative AI for real-time translation, achieving 90% accuracy for multilingual collaboration.`,
      github: "https://notation-seven.vercel.app/" 
    },
    { 
      name: "Old Portfolio", 
      readme: `Developed a personal portfolio website to showcase projects and skills.
      - Tech Stack: HTML, CSS, JavaScript, React.js`,
      github: "https://djport07.netlify.app/" 
    },
    { name: "GDSC DYPCOE Website", readme: "Part of the team that developed the official website for GDSC DYPCOE using React.js and Tailwind CSS.", github: ".https://dscdypcoe.web.app/" },
    { name: "AI Playground", readme: "Created an interactive space where you can meet WebGPT and DALLE clones using React.js, OpenAI, and Tailwind CSS.", github: "https://github.com/DJ-BoT07/DjAI-TOOLS" },
    { name: "CryptoVerse", readme: "Developed a cryptocurrency app that provides daily insights using charts and live data with React.js and CoinGecko API.", github: "https://github.com/DJ-BoT07/CryptoMon2" },
    { name: "Meta Verse", readme: "An immersive MetaVerse project where you can interact with DigiMons using React Three Fiber and Three.js.", github: "https://github.com/DJ-BoT07/Portals" },
    { name: "CodeX – Mental Health Assessment", readme: "Worked as a Frontend Developer for a virtual 3D model communication project using ReactJS, React Three Fiber, and Tailwind CSS.", github: "https://github.com/DJ-BoT07/"},
    { 
      name: "ACES DYPCOE Website", 
      readme: `Part of the team for the official website of ACES DYPCOE.
      - Tech Stack: React JS, Tailwind CSS, React Three Fiber, Node.js`,
      github: "https://aces-dypcoe.vercel.app/" 
    },
    { 
      name: "TechFest DYPCOE Website", 
      readme: `Part of the team for the official website for Advait 2k24, one of the biggest Tech-Fests in Pune by DYPCOE.
      - Tech Stack: React JS, Tailwind CSS, React Three Fiber, Node.js, Supabase.js`,
      github: "https://dypcoe-techfest.vercel.app/" 
    }
    
  ];

  useEffect(() => {
    setSelectedProject(history[historyIndex]);
  }, [historyIndex, history]); // Ensure 'history' is included in the dependency array

  const navigateTo = (project) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(project);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <BaseWindow 
      title="My Projects" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="flex flex-col h-full bg-[#ECE9D8]">
        <div className="bg-[#ECE9D8] border-b border-[#ACA899] p-1">
          <div className="flex items-center space-x-1">
            <button 
              className="p-1 bg-[#ECE9D8] border border-[#ACA899] rounded disabled:opacity-50"
              onClick={goBack} 
              disabled={historyIndex <= 0}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="p-1 bg-[#ECE9D8] border border-[#ACA899] rounded disabled:opacity-50"
              onClick={goForward} 
              disabled={historyIndex >= history.length - 1}
            >
              <ChevronRight size={16} />
            </button>
            <button className="p-1 bg-[#ECE9D8] border border-[#ACA899] rounded">
              <ArrowUp size={16} />
            </button>
            <div className="h-full border-l border-[#ACA899] mx-1"></div>
            <span className="text-sm">Address</span>
            <div className="flex-1 bg-white border border-[#7F9DB9] p-1">
              <div className="flex items-center">
                <Folder size={16} className="mr-2 text-[#16016A]" />
                <span className="text-sm">My Projects</span>
              </div>
            </div>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm">
              Go
            </button>
          </div>
        </div>
        <div className="bg-[#ECE9D8] border-b border-[#ACA899] p-1">
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm"
                    onClick={() => setViewMode('icons')}>
              Icons
            </button>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm"
                    onClick={() => setViewMode('list')}>
              List
            </button>
            <button className="px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded text-sm"
                    onClick={() => setViewMode('details')}>
              Details
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white p-2 overflow-auto">
          {selectedProject ? (
            <ProjectDetails project={selectedProject} onBack={() => navigateTo(null)} />
          ) : (
            <ProjectList projects={projects} viewMode={viewMode} onSelect={navigateTo} />
          )}
        </div>
        <div className="bg-[#ECE9D8] border-t border-[#ACA899] p-1 flex items-center">
          <span className="text-sm mr-2">{projects.length} objects</span>
          <div className="flex-1"></div>
          <div className="flex items-center bg-white border border-[#7F9DB9] p-1">
            <Search size={16} className="mr-2 text-[#16016A]" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </BaseWindow>
  );
}

function ProjectList({ projects, viewMode, onSelect }) {
  if (viewMode === 'icons') {
    return (
      <div className="grid grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <ProjectFolder key={index} name={project.name} onClick={() => onSelect(project)} />
        ))}
      </div>
    );
  } else if (viewMode === 'list') {
    return (
      <div className="space-y-1">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center hover:bg-[#316AC5] hover:text-white cursor-pointer p-1"
               onClick={() => onSelect(project)}>
            <Folder size={16} className="mr-2 text-[#FCD364]" />
            <span className="text-sm">{project.name}</span>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <table className="w-full">
        <thead>
          <tr className="bg-[#ECE9D8] text-left">
            <th className="p-1 text-sm font-normal">Name</th>
            <th className="p-1 text-sm font-normal">Type</th>
            <th className="p-1 text-sm font-normal">Size</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="hover:bg-[#316AC5] hover:text-white cursor-pointer"
                onClick={() => onSelect(project)}>
              <td className="p-1 text-sm flex items-center">
                <Folder size={16} className="mr-2 text-[#FCD364]" />
                {project.name}
              </td>
              <td className="p-1 text-sm">Folder</td>
              <td className="p-1 text-sm">--</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function ProjectFolder({ name, onClick }) {
  return (
    <div 
      className="flex flex-col items-center text-center cursor-pointer hover:bg-[#316AC5] hover:text-white p-2 rounded"
      onClick={onClick}
    >
      <Folder size={32} className="mb-1 text-[#FCD364]" />
      <span className="text-xs">{name}</span>
    </div>
  );
}

function ProjectDetails({ project, onBack }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to projects
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">{project.name}</h2>
      <div className="bg-gray-100 p-4 rounded mb-4 flex-1 overflow-auto">
        <h3 className="font-bold mb-2 flex items-center">
          <FileText size={18} className="mr-2" />
          README.txt
        </h3>
        <p className="text-sm whitespace-pre-wrap">{project.readme}</p>
      </div>
      <a 
        href={project.github} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        <Github size={18} className="mr-2" />
        View on GitHub or Link
      </a>
    </div>
  );
}
