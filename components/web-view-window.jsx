import React from 'react';
import { BaseWindow } from './base-window';

export function WebViewWindow({ title, url, onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  return (
    <BaseWindow
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="w-full h-full bg-white">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </BaseWindow>
  );
} 