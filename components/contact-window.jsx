import React from 'react';
import { BaseWindow } from './base-window';

export function ContactWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  return (
    <BaseWindow 
      title="Contact" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <h2 className="text-xl font-bold mb-4">Contact Me</h2>
      <div className="space-y-4">
        <p>
          <span className="font-bold">Email:</span> <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">your.email@example.com</a>
        </p>
        <p>
          <span className="font-bold">LinkedIn:</span> <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/yourprofile</a>
        </p>
        <p>
          <span className="font-bold">GitHub:</span> <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/yourusername</a>
        </p>
        <p>
          <span className="font-bold">Twitter:</span> <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@yourhandle</a>
        </p>
      </div>
      <div className="mt-8">
        <h3 className="font-bold mb-2">Send me a message:</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded px-2 py-1" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-2 py-1" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Message:</label>
            <textarea id="message" name="message" rows="4" className="w-full border border-gray-300 rounded px-2 py-1"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
        </form>
      </div>
    </BaseWindow>
  );
}