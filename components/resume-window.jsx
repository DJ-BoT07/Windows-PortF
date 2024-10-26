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
      <div className="w-full h-full">
        <iframe
          src="/images/resume.pdf"
          className="w-full h-full"
          title="Resume PDF"
        />
      </div>
    </BaseWindow>
  );
}
