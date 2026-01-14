import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-0 left-0 w-full p-4 flex justify-center items-center z-[100] pointer-events-none"
    >
      <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
        <p className="text-orange-200/80 font-medium tracking-wider text-sm sm:text-base">
          <span className="text-orange-500 mr-1">@</span>
          copyright Riddhi Sweta Ragini Sakshi
        </p>
      </div>
    </motion.footer>
  );
};
