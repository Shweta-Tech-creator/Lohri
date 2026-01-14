
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bonfire } from './Bonfire';
import { Dancer } from './Dancer';
import { FestiveText } from './FestiveText';

const Starfield = () => {
  const stars = useMemo(() => [...Array(80)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map(star => (
        <motion.div
          key={star.id}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          className="absolute bg-white rounded-full"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`, 
            width: star.size, 
            height: star.size,
          }}
        />
      ))}
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const [showDancers, setShowDancers] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const dancerTimer = setTimeout(() => setShowDancers(true), 1200);
    const textTimer = setTimeout(() => setShowText(true), 3200);
    return () => {
      clearTimeout(dancerTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#02040a] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#05081a] to-[#0f0a05]" />
      <Starfield />
      
      {/* Village Silhouettes */}
      <div className="absolute bottom-[40%] w-full flex items-end justify-between px-20 md:px-48 opacity-10 z-0 pointer-events-none">
        <div className="w-56 h-40 bg-[#000] rounded-t-xl" />
        <div className="w-64 h-32 bg-[#000] rounded-t-xl" />
      </div>

      <div className="absolute bottom-0 w-full h-[40%] bg-[#080502] border-t border-white/5" />
      
      {/* Flickering Light Refection */}
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="absolute bottom-0 w-full h-1/2 bg-orange-900/10 blur-[100px]"
      />

      {/* Bonfire */}
      <div className="z-10 relative scale-75 md:scale-90 translate-y-12">
        <Bonfire intensity={0.9} />
      </div>

      {/* Dancers */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none translate-y-24">
        <AnimatePresence>
          {showDancers && (
            <>
              <Dancer gender="male" side="left" delay={0.2} offset={340} />
              <Dancer gender="female" side="right" delay={0.8} offset={340} />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Greeting */}
      <div className="absolute top-[12%] z-50 w-full text-center pointer-events-none">
        <AnimatePresence>
          {showText && <FestiveText />}
        </AnimatePresence>
      </div>
    </div>
  );
};
