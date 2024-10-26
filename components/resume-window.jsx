import React from 'react';
import { BaseWindow } from './base-window';
import { PDFViewer } from './PDFViewer';

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
      <div className="h-full w-full">
        <PDFViewer file="/images/resume.pdf" />
      </div>
    </BaseWindow>
  );
}
