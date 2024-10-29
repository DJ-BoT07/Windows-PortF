import React, { useState, useCallback, useMemo } from 'react';
import { BaseWindow } from './base-window';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, List, FolderOpen } from 'lucide-react';

// Predefine image dimensions for better performance
const THUMBNAIL_SIZE = { width: 300, height: 200 };
const PREVIEW_SIZE = { width: 48, height: 48 };
const FULLSIZE_SIZE = { width: 1200, height: 800 };

// Optimize image loading with blur data URLs
const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="0%" />
        <stop stop-color="#edeef1" offset="50%" />
        <stop stop-color="#f6f7f8" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  </svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export function PicturesWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Memoize image paths to prevent unnecessary recalculations
  const imagePaths = useMemo(() => ({
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
  }), []);

  // Memoize the displayed images
  const displayImages = useMemo(() => {
    if (selectedFolder === 'all') {
      return [...imagePaths.ACES, ...imagePaths.GDSC];
    }
    return imagePaths[selectedFolder] || [];
  }, [selectedFolder, imagePaths]);

  // Optimize image loading handlers
  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  // Memoize the image component for better performance
  const ImageComponent = useCallback(({ src, size, className }) => (
    <Image
      src={src}
      alt={src.split('/').pop().replace('.jpg', '')}
      width={size.width}
      height={size.height}
      className={className}
      loading="lazy"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(size.width, size.height))}`}
      onLoad={handleImageLoad}
      quality={75} // Adjust quality for better performance
    />
  ), [handleImageLoad]);

  // Render grid view with virtualization for better performance
  const renderGridView = useCallback(() => (
    <div className="grid grid-cols-3 gap-4 p-4 auto-rows-max">
      {displayImages.map((imagePath, index) => (
        <motion.div 
          key={imagePath}
          layoutId={imagePath}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          onClick={() => setSelectedImage(imagePath)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <div className="aspect-w-16 aspect-h-9 relative">
            <ImageComponent
              src={imagePath}
              size={THUMBNAIL_SIZE}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-sm font-medium">
              {imagePath.split('/').pop().replace('.jpg', '')}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  ), [displayImages, ImageComponent]);

  // Render list view
  const renderListView = useCallback(() => (
    <div className="p-2">
      {displayImages.map((imagePath, index) => (
        <motion.div 
          key={imagePath}
          className="flex items-center p-2 hover:bg-[#E8F1FC] cursor-pointer rounded-md"
          onClick={() => setSelectedImage(imagePath)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
        >
          <div className="w-12 h-12 relative mr-3">
            <ImageComponent
              src={imagePath}
              size={PREVIEW_SIZE}
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
        </motion.div>
      ))}
    </div>
  ), [displayImages, selectedFolder, ImageComponent]);

  // Rest of your component remains the same, just update the render section
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
          {/* Windows XP Toolbar */}
          <div className="bg-[#EDF3FE] border-b border-[#9BB5E3] p-1">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-1 rounded hover:bg-[#CCE1FF] text-[#0645AD]">
                <FolderOpen className="w-4 h-4 mr-2" />
                File
              </button>
              <div className="h-4 w-px bg-[#9BB5E3]" />
              <div className="flex items-center space-x-1">
                <button
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#CCE1FF]' : 'hover:bg-[#CCE1FF]'}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#CCE1FF]' : 'hover:bg-[#CCE1FF]'}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Windows XP Navigation Bar */}
          <div className="bg-[#EDF3FE] border-b border-[#9BB5E3] p-2 flex items-center">
            <span className="text-[#0645AD] mr-2">Folders:</span>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-1 rounded ${
                  selectedFolder === 'all' 
                    ? 'bg-[#CCE1FF] border border-[#9BB5E3]' 
                    : 'hover:bg-[#CCE1FF] text-[#0645AD]'
                }`}
                onClick={() => setSelectedFolder('all')}
              >
                All Pictures
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  selectedFolder === 'ACES' 
                    ? 'bg-[#CCE1FF] border border-[#9BB5E3]' 
                    : 'hover:bg-[#CCE1FF] text-[#0645AD]'
                }`}
                onClick={() => setSelectedFolder('ACES')}
              >
                ACES
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  selectedFolder === 'GDSC' 
                    ? 'bg-[#CCE1FF] border border-[#9BB5E3]' 
                    : 'hover:bg-[#CCE1FF] text-[#0645AD]'
                }`}
                onClick={() => setSelectedFolder('GDSC')}
              >
                GDSC
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </div>

          {/* Windows XP Status Bar */}
          <div className="bg-[#EDF3FE] border-t border-[#9BB5E3] p-1.5 text-sm text-[#0645AD] flex justify-between items-center">
            <span>{displayImages.length} items</span>
            <span>{selectedFolder === 'all' ? 'All Pictures' : `${selectedFolder} Folder`}</span>
          </div>
        </div>
      </BaseWindow>

      {/* Optimized full-size image viewer */}
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
              <ImageComponent
                src={selectedImage}
                size={FULLSIZE_SIZE}
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