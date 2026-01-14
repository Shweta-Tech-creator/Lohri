
import React from 'react';
import { motion } from 'framer-motion';

export const FestiveText: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <motion.h1
        animate={{
          textShadow: [
            "0 0 20px rgba(255, 215, 0, 0.5)",
            "0 0 40px rgba(255, 215, 0, 0.8)",
            "0 0 20px rgba(255, 215, 0, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-6xl md:text-8xl font-festive text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-amber-700 font-bold drop-shadow-2xl"
      >
        Happy Lohri
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-orange-200 text-lg md:text-xl tracking-widest font-light"
      >
        MAY THE RADIANCE OF BONFIRE BRING JOY & WARMTH
      </motion.p>

      {/* Elegant Underline Decor */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 1, duration: 1 }}
        className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-2"
      />
    </motion.div>
  );
};
