import React from 'react';
import { BaseWindow } from './base-window';

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
      <h2 className="text-xl font-bold mb-4">My Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Front-end</h3>
          <ul className="list-disc pl-6">
            <li>HTML5, CSS3, JavaScript (ES6+)</li>
            <li>React, Next.js</li>
            <li>Tailwind CSS, Styled Components</li>
            <li>Redux, Context API</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Back-end</h3>
          <ul className="list-disc pl-6">
            <li>Node.js, Express</li>
            <li>Python, Django</li>
            <li>RESTful APIs</li>
            <li>GraphQL</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Databases</h3>
          <ul className="list-disc pl-6">
            <li>MongoDB</li>
            <li>PostgreSQL</li>
            <li>MySQL</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Tools & Others</h3>
          <ul className="list-disc pl-6">
            <li>Git, GitHub</li>
            <li>Docker</li>
            <li>AWS, Heroku</li>
            <li>Agile methodologies</li>
          </ul>
        </div>
      </div>
    </BaseWindow>
  );
}