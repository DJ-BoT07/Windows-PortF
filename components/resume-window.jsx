import React from 'react';
import { BaseWindow } from './base-window';
import Image from 'next/image';

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
      <div className="w-full h-full relative">
        <Image
          src="/images/resume.png"
          alt="Resume"
          className="object-contain"
          height={1000}
          width={1000}
          priority
        />
      </div>
    </BaseWindow>
  );
}
