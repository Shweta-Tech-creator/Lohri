
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BonfireProps {
  intensity?: number;
  spirit?: number;
}

const Ember = ({ id }: { id: number }) => {
  const randomX = useMemo(() => (Math.random() - 0.5) * 60, []);
  const duration = useMemo(() => 2 + Math.random() * 3, []);
  const delay = useMemo(() => Math.random() * 5, []);
  const size = useMemo(() => 1 + Math.random() * 3, []);

  return (
    <motion.div
      initial={{ y: 0, x: randomX, opacity: 0, scale: 0 }}
      animate={{ 
        y: -180 - Math.random() * 120, 
        x: randomX + (Math.random() - 0.5) * 100,
        opacity: [0, 1, 0.7, 0],
        scale: [0, 1.2, 0.5, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay, 
        ease: "easeOut" 
      }}
      className="absolute bg-orange-400 rounded-full blur-[0.5px]"
      style={{ width: size, height: size, zIndex: 5 }}
    />
  );
};

export const Bonfire: React.FC<BonfireProps> = ({ intensity = 1, spirit = 1 }) => {
  const combinedIntensity = intensity * spirit;
  const embers = useMemo(() => [...Array(25)].map((_, i) => i), []);
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Cinematic Fire Glow */}
      <motion.div
        animate={{
          scale: [combinedIntensity, combinedIntensity * 1.4, combinedIntensity],
          opacity: [0.15, 0.4 * combinedIntensity, 0.15],
        }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        className="absolute w-[450px] h-[450px] bg-orange-600/20 rounded-full blur-[100px] -top-32 pointer-events-none"
      />

      {/* Embers drifting up */}
      <div className="absolute bottom-10 pointer-events-none">
        {embers.map(id => <Ember key={id} id={id} />)}
      </div>

      {/* Realistic Flame SVG */}
      <motion.svg
        width={130 * combinedIntensity}
        height={180 * combinedIntensity}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_0_30px_rgba(255,80,0,0.9)]"
      >
        <motion.path
          d="M50 110C75 110 90 85 90 60C90 35 60 0 50 0C40 0 10 35 10 60C10 85 25 110 50 110Z"
          fill="url(#redFlame)"
          animate={{
            d: [
              "M50 110C75 110 90 85 90 60C90 35 60 0 50 0C40 0 10 35 10 60C10 85 25 110 50 110Z",
              "M50 115C82 115 100 90 100 65C100 40 70 -5 50 5C30 -5 0 40 0 65C0 90 18 115 50 115Z",
              "M50 110C75 110 90 85 90 60C90 35 60 0 50 0C40 0 10 35 10 60C10 85 25 110 50 110Z"
            ],
          }}
          transition={{ duration: 0.5 / spirit, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M50 110C68 110 80 90 80 70C80 50 60 20 50 20C40 20 20 50 20 70C20 90 32 110 50 110Z"
          fill="url(#orangeFlame)"
          animate={{
            d: [
              "M50 110C68 110 80 90 80 70C80 50 60 20 50 20C40 20 20 50 20 70C20 90 32 110 50 110Z",
              "M50 110C76 110 88 95 88 75C88 55 65 15 50 28C35 15 12 55 12 75C12 95 24 110 50 110Z",
              "M50 110C68 110 80 90 80 70C80 50 60 20 50 20C40 20 20 50 20 70C20 90 32 110 50 110Z"
            ],
          }}
          transition={{ duration: 0.35 / spirit, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        />

        <defs>
          <linearGradient id="redFlame" x1="50" y1="110" x2="50" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#991b1b" />
            <stop offset="0.5" stopColor="#dc2626" />
            <stop offset="1" stopColor="#fca5a5" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="orangeFlame" x1="50" y1="110" x2="50" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="0.6" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#fffbeb" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Wood Logs */}
      <div className="relative mt-[-20px] z-20 pointer-events-none">
        <div className="flex gap-1 relative z-10">
          <div className="w-12 h-5 bg-[#2d1b0d] rounded-full rotate-[28deg] shadow-2xl border-b-2 border-black/40" />
          <div className="w-12 h-5 bg-[#2d1b0d] rounded-full -rotate-[28deg] shadow-2xl border-b-2 border-black/40 -ml-6" />
        </div>
      </div>
    </div>
  );
};
