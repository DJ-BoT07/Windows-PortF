import React, { useState } from 'react';
import { BaseWindow } from './base-window';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, Grid3X3, List, FolderOpen } from 'lucide-react';

export function PicturesWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const imagePaths = {
    ACES: [
      '/club_images/ACES/aces1.jpg',
      '/club_images/ACES/aces2.jpg',
      '/club_images/ACES/aces3.jpg',
      '/club_images/ACES/aces4.jpg',
      '/club_images/ACES/aces5.jpg',
    ],
    GDSC: [
      '/club_images/GDSC/gdsc1.jpg',
      '/club_images/GDSC/gdsc2.jpg',
      '/club_images/GDSC/gdsc3.jpg',
      '/club_images/GDSC/gdsc4.jpg',
      '/club_images/GDSC/gdsc5.jpg',
      '/club_images/GDSC/gdsc6.jpg',
      '/club_images/GDSC/gdsc7.jpg',
    ]
  };

  const getDisplayImages = () => {
    if (selectedFolder === 'all') {
      return [...imagePaths.ACES, ...imagePaths.GDSC];
    }
    return imagePaths[selectedFolder] || [];
  };

  return (
    <>
      <BaseWindow
        title="My Pictures"
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
        zIndex={zIndex}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Toolbar */}
          <div className="bg-[#f0f0f0] p-2 border-b border-gray-300">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-1 rounded hover:bg-blue-100">
                <FolderOpen className="w-4 h-4 mr-2" />
                File
              </button>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <button
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-[#ECF4FE] border-b border-gray-300 p-2 flex items-center">
            <span className="text-gray-600 mr-2">Folders:</span>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-1 rounded-md ${
                  selectedFolder === 'all' 
                    ? 'bg-[#CCE8FF] border-[#99D1FF] border text-black' 
                    : 'hover:bg-[#E5F3FF] text-blue-600'
                }`}
                onClick={() => setSelectedFolder('all')}
              >
                All Pictures
              </button>
              <button
                className={`px-4 py-1 rounded-md ${
                  selectedFolder === 'ACES' 
                    ? 'bg-[#CCE8FF] border-[#99D1FF] border text-black' 
                    : 'hover:bg-[#E5F3FF] text-blue-600'
                }`}
                onClick={() => setSelectedFolder('ACES')}
              >
                ACES
              </button>
              <button
                className={`px-4 py-1 rounded-md ${
                  selectedFolder === 'GDSC' 
                    ? 'bg-[#CCE8FF] border-[#99D1FF] border text-black' 
                    : 'hover:bg-[#E5F3FF] text-blue-600'
                }`}
                onClick={() => setSelectedFolder('GDSC')}
              >
                GDSC
              </button>
            </div>
          </div>

          {/* Image Grid/List */}
          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-4 p-4">
                {getDisplayImages().map((imagePath, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(imagePath)}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        src={imagePath}
                        alt={`Gallery image ${index + 1}`}
                        width={400}
                        height={300}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium">
                        {imagePath.split('/').pop().replace('.jpg', '')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {getDisplayImages().map((imagePath, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-2 hover:bg-[#E8F1FC] cursor-pointer rounded-md"
                    onClick={() => setSelectedImage(imagePath)}
                  >
                    <div className="w-12 h-12 relative mr-3">
                      <Image
                        src={imagePath}
                        alt={`Gallery image ${index + 1}`}
                        width={48}
                        height={48}
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {imagePath.split('/').pop().replace('.jpg', '')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedFolder} Image
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="bg-[#f0f0f0] border-t border-gray-300 p-2 text-sm text-gray-600 flex justify-between items-center">
            <span>{getDisplayImages().length} items</span>
            <span>{selectedFolder === 'all' ? 'All Pictures' : `${selectedFolder} Folder`}</span>
          </div>
        </div>
      </BaseWindow>

      {/* Full-size Image Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size image"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 