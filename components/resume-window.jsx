import React from 'react';
import { BaseWindow } from './base-window';

export function ResumeWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  return (
    <BaseWindow 
      title="Resume" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <h2 className="text-xl font-bold mb-4">Resume</h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-bold">Education</h3>
          <p><strong>Bachelor of Science in Computer Science</strong></p>
          <p>University Name, Graduation Year</p>
        </section>
        <section>
          <h3 className="text-lg font-bold">Work Experience</h3>
          <div className="mb-4">
            <p><strong>Senior Web Developer</strong> | Company Name</p>
            <p>Start Date - Present</p>
            <ul className="list-disc pl-6">
              <li>Developed and maintained multiple web applications using React and Node.js</li>
              <li>Led a team of 5 developers in implementing new features and optimizing existing codebase</li>
              <li>Improved application performance by 40% through code refactoring and optimization</li>
            </ul>
          </div>
          <div>
            <p><strong>Junior Web Developer</strong> | Another Company</p>
            <p>Start Date - End Date</p>
            <ul className="list-disc pl-6">
              <li>Assisted in the development of responsive web designs using HTML, CSS, and JavaScript</li>
              <li>Collaborated with the design team to implement user interface improvements</li>
              <li>Participated in code reviews and contributed to the company's internal component library</li>
            </ul>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-bold">Skills</h3>
          <p>React, Node.js, JavaScript, HTML, CSS, Git, Agile methodologies, RESTful APIs, MongoDB, PostgreSQL</p>
        </section>
        <section>
          <h3 className="text-lg font-bold">Certifications</h3>
          <ul className="list-disc pl-6">
            <li>AWS Certified Developer - Associate</li>
            <li>Google Cloud Certified - Professional Cloud Developer</li>
          </ul>
        </section>
      </div>
    </BaseWindow>
  );
}