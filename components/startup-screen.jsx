import { motion } from 'framer-motion';
import Image from 'next/image';

export function StartupScreen({ onStartupComplete }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 4 }}
      onAnimationComplete={onStartupComplete}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Windows XP Logo */}
        <motion.div 
          className="relative w-[500px] h-[400px] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/images/image.svg"
            alt="Windows XP"
            layout="fill"
            objectFit="contain"
            priority
            className="scale-150" // Makes the image 50% larger
          />
        </motion.div>

        {/* Classic XP Loading Bar */}
        <div className="w-[280px] h-[22px] bg-[#000033] border border-[#000066] relative overflow-hidden">
          {/* Loading Bar Segments */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-[90px] bg-gradient-to-r from-[#0066CC] via-[#1E90FF] to-[#0066CC]"
              initial={{ x: -90 }}
              animate={{ x: 280 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
                delay: i * 0.3
              }}
              style={{
                boxShadow: "0 0 5px rgba(0, 102, 204, 0.5)"
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <motion.div
          className="text-white text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Starting Windows...
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="fixed bottom-8 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          <div className="text-white text-xs space-y-1">
            <p>Microsoft Windows XP</p>
            <p>Professional</p>
            <p className="mt-2">Copyright © Microsoft Corporation</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
