import React, { useState, useEffect } from 'react';
import { BaseWindow } from './base-window';
import { AlertCircle, ExternalLink } from 'lucide-react';

export function WebViewWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex, url, title }) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Try to detect if the website blocks iframe loading
    const checkIframeLoad = () => {
      try {
        const iframe = document.querySelector(`iframe[data-url="${url}"]`);
        if (iframe) {
          // If we can't access the iframe content, it's likely blocked
          if (!iframe.contentWindow || !iframe.contentDocument) {
            setLoadError(true);
          }
        }
      } catch (error) {
        setLoadError(true);
      }
    };

    // Check after a short delay to allow for potential loading
    const timer = setTimeout(checkIframeLoad, 500);
    return () => clearTimeout(timer);
  }, [url]);

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
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Cannot Display Website</h3>
            <p className="text-gray-600 mb-4">
              This website cannot be displayed in a window due to security restrictions.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Open in New Tab <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        ) : (
          <iframe
            src={url}
            className="w-full h-full border-none"
            title={title}
            data-url={url}
            sandbox="allow-scripts allow-same-origin allow-forms"
            onError={() => setLoadError(true)}
          />
        )}
      </div>
    </BaseWindow>
  );
} 