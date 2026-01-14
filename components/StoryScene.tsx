
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bonfire } from './Bonfire';
import { Dancer } from './Dancer';

// --- RICH SVG ASSETS ---
const WheatIcon = ({ scale = 1.5 }) => (
  <svg width={60 * scale} height={120 * scale} viewBox="0 0 60 120" fill="none">
    <motion.path 
      d="M30 120V20" 
      stroke="#d4af37" 
      strokeWidth="3" 
      animate={{ d: ["M30 120V20", "M30 120Q35 60 40 20", "M30 120V20"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    {[...Array(6)].map((_, i) => (
      <motion.circle 
        key={i} 
        cx={i % 2 === 0 ? 22 : 38} 
        cy={30 + i * 12} 
        r="6" 
        fill="#f3ce5a" 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </svg>
);

const RewriSVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="35" fill="#fdf5e6" stroke="#d2b48c" strokeWidth="2" />
    <circle cx="40" cy="40" r="3" fill="#8b4513" />
    <circle cx="60" cy="45" r="3" fill="#8b4513" />
    <circle cx="45" cy="65" r="3" fill="#8b4513" />
    <circle cx="65" cy="60" r="3" fill="#8b4513" />
    <circle cx="52" cy="52" r="3" fill="#8b4513" />
    <circle cx="35" cy="55" r="3" fill="#8b4513" />
  </svg>
);

const GajakSVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <rect x="20" y="30" width="60" height="40" rx="4" fill="#deb887" stroke="#8b4513" strokeWidth="2" />
    <circle cx="35" cy="40" r="4" fill="#fff" opacity="0.6" />
    <circle cx="65" cy="55" r="5" fill="#fff" opacity="0.6" />
    <circle cx="50" cy="45" r="3" fill="#fff" opacity="0.6" />
    <path d="M25 45L75 45" stroke="#8b4513" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
  </svg>
);

const PopcornSVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <circle cx="40" cy="40" r="18" fill="#fff" />
    <circle cx="60" cy="45" r="20" fill="#fff" />
    <circle cx="50" cy="65" r="22" fill="#fff" />
    <circle cx="50" cy="35" r="12" fill="#fffce0" />
    <path d="M45 42 Q50 38 55 42" stroke="#f0e68c" strokeWidth="2" fill="none" />
  </svg>
);

const DholSVG = () => (
  <svg width="120" height="120" viewBox="0 0 100 100">
    <ellipse cx="50" cy="50" rx="40" ry="25" fill="#5d4037" stroke="#3e2723" strokeWidth="3" />
    <ellipse cx="15" cy="50" rx="10" ry="25" fill="#3e2723" />
    <ellipse cx="85" cy="50" rx="10" ry="25" fill="#3e2723" />
    <path d="M20 30L80 30" stroke="#ffeb3b" strokeWidth="2" opacity="0.5" />
    <path d="M20 70L80 70" stroke="#ffeb3b" strokeWidth="2" opacity="0.5" />
    <path d="M50 25L50 75" stroke="#ff5722" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// --- KITE ASSETS ---
const KiteIcon = ({ color = "#ff5722", scale = 1 }) => (
  <motion.svg 
    width={60 * scale} height={60 * scale} viewBox="0 0 100 100" fill="none" 
    className="drop-shadow-lg cursor-pointer"
    whileHover={{ scale: 1.2, filter: "brightness(1.2)" }}
    whileTap={{ scale: 0.8 }}
  >
    <path d="M50 5L95 50L50 95L5 50L50 5Z" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
    <path d="M5 50H95" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
    <path d="M50 5V95" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
    <path d="M40 95L50 85L60 95H40Z" fill={color} />
    <motion.path 
      d="M50 95 Q60 110 50 130" 
      stroke="rgba(255,255,255,0.2)" 
      strokeWidth="1" 
      fill="none"
      animate={{ d: ["M50 95 Q60 110 50 130", "M50 95 Q40 115 50 130", "M50 95 Q60 110 50 130"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

const BackgroundKites = ({ onKiteClick }: { onKiteClick: (x: number, y: number) => void }) => {
  const kiteColors = ['#ff5722', '#ffeb3b', '#4caf50', '#e91e63', '#2196f3', '#ff9800'];
  const kites = useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    color: kiteColors[i % kiteColors.length],
    top: `${Math.random() * 90}%`, // Spreads across full background
    scale: 0.4 + Math.random() * 0.7,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden z-0 opacity-25">
      {kites.map((kite) => (
        <motion.div
          key={kite.id}
          initial={{ x: '-15vw', y: kite.top, rotate: -15 }}
          animate={{ 
            x: '115vw',
            y: [kite.top, `calc(${kite.top} - 10%)`, kite.top],
            rotate: [-15, 15, -15]
          }}
          transition={{ 
            x: { duration: kite.duration, repeat: Infinity, ease: "linear", delay: kite.delay },
            y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute"
          onClick={(e) => onKiteClick(e.clientX, e.clientY)}
        >
          <KiteIcon color={kite.color} scale={kite.scale} />
        </motion.div>
      ))}
    </div>
  );
};

const Sparkle = ({ x, y }: { x: number, y: number }) => (
  <motion.div
    initial={{ scale: 0, x, y, opacity: 1 }}
    animate={{ scale: [1, 2, 0], y: y - 100, x: x + (Math.random() - 0.5) * 100, opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed w-4 h-4 bg-yellow-400 rounded-full blur-sm z-[100] pointer-events-none"
  />
);

const STORY_SCENES = [
  {
    id: 'harvest',
    title: 'Harvest Gratitude',
    text: 'Lohri marks the harvest of winter crops like wheat and sugarcane. Farmers offer their first harvest to the fire, praying for abundance.',
    content: (
      <div className="relative flex items-end justify-center gap-12 h-64 md:h-80">
        <div className="flex gap-8">
          <WheatIcon scale={2} />
          <div className="scale-125 translate-y-4"><WheatIcon scale={2} /></div>
          <WheatIcon scale={2} />
        </div>
      </div>
    )
  },
  {
    id: 'bonfire',
    title: 'The Sacred Fire',
    text: 'The bonfire represents Agni, the God of Fire. We offer popcorn and rewari to the flames, asking for warmth and strength.',
    content: (
      <div className="scale-[1.5] md:scale-[1.8] translate-y-12 md:translate-y-24">
        <Bonfire intensity={1.6} />
      </div>
    )
  },
  {
    id: 'legend',
    title: 'The Hero Dulla Bhatti',
    text: 'Lohri is incomplete without folk tales of Dulla Bhatti. He rescued the oppressed and provided for the poor.',
    content: (
      <motion.div 
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center h-64 md:h-80"
      >
        <DholSVG />
      </motion.div>
    )
  },
  {
    id: 'culture',
    title: 'Unity in Dance',
    text: 'The village vibrates with the rhythm of the Dhol. Bhangra and Gidda celebrate the spirit of life and community.',
    content: (
      <div className="relative flex justify-center items-center w-full h-64 md:h-80 gap-12 md:gap-40">
           <div className="relative scale-[0.7] md:scale-100 flex items-center justify-center">
             <Dancer gender="male" side="left" delay={0} offset={0} />
           </div>
           <div className="relative scale-[0.7] md:scale-100 flex items-center justify-center">
             <Dancer gender="female" side="right" delay={0} offset={0} />
           </div>
      </div>
    )
  },
  {
    id: 'delicacies',
    title: 'Traditional Flavors',
    text: 'Sharing Lohri specialties—Rewri, Gajak, and Popcorn—is a ritual that spreads sweetness and bonds the community.',
    content: (
      <div className="flex flex-col items-center justify-center h-64 md:h-80">
           <div className="flex flex-wrap justify-center gap-6 md:gap-16 z-10 p-6">
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><RewriSVG /></motion.div>
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}><GajakSVG /></motion.div>
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}><PopcornSVG /></motion.div>
           </div>
      </div>
    )
  },
  {
    id: 'solar',
    title: 'Return of the Sun',
    text: 'Lohri celebrates the end of the winter solstice, welcoming the return of longer days and the sun’s journey North.',
    content: (
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute w-full h-full bg-orange-500 rounded-full blur-[80px] md:blur-[120px]" 
        />
        <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-tr from-yellow-300 via-orange-500 to-red-600 rounded-full shadow-[0_0_100px_rgba(251,191,36,0.8)]" />
      </div>
    )
  }
];

interface StorySceneProps {
  onFinish?: () => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({ onFinish }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number }[]>([]);

  useEffect(() => {
    if (!isPaused && !isFinished && currentScene < STORY_SCENES.length) {
      const timer = setTimeout(() => {
        if (currentScene < STORY_SCENES.length - 1) {
          setCurrentScene(prev => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [currentScene, isPaused, isFinished]);

  const addSparkle = useCallback((x: number, y: number) => {
    const id = Date.now();
    setSparkles(prev => [...prev, { id, x, y }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 1000);
  }, []);

  const next = () => {
    if (currentScene < STORY_SCENES.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const prev = () => {
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#05081a] overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <motion.div 
        animate={{ 
          background: isFinished 
            ? 'radial-gradient(circle at center, #1e1b4b 0%, #05081a 100%)' 
            : 'radial-gradient(circle at center, #1a0f05 0%, #02040a 100%)' 
        }}
        className="absolute inset-0 pointer-events-none transition-colors duration-2000"
      />

      {/* Background Kites - Flowing across entire screen */}
      <BackgroundKites onKiteClick={addSparkle} />
      
      {/* Interaction Sparkles */}
      {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentScene}
              initial={{ x: 500, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -500, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="flex flex-col items-center w-full max-w-6xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Rich Visual Content Area */}
              <div className="w-full flex items-center justify-center mb-10 h-64 md:h-80 relative">
                {STORY_SCENES[currentScene].content}
              </div>

              {/* Text Description Box */}
              <div className="bg-black/60 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] backdrop-blur-3xl border border-white/10 shadow-2xl relative max-w-4xl">
                <h3 className="text-white text-3xl md:text-6xl font-festive mb-4 md:mb-6 leading-tight drop-shadow-xl">
                  {STORY_SCENES[currentScene].title}
                </h3>
                <p className="text-orange-50/90 text-base md:text-2xl leading-relaxed font-light italic tracking-wide">
                  "{STORY_SCENES[currentScene].text}"
                </p>
              </div>

              {/* Navigation UI */}
              <div className="flex gap-10 mt-12 items-center">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  disabled={currentScene === 0}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-20 transition-all hover:bg-white/10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
                </motion.button>
                
                <div className="flex gap-3">
                  {STORY_SCENES.map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ 
                        width: i === currentScene ? 40 : 12,
                        backgroundColor: i === currentScene ? 'rgba(249, 115, 22, 1)' : 'rgba(255, 255, 255, 0.2)'
                      }}
                      className="h-3 rounded-full transition-all"
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="p-4 rounded-full bg-orange-600/20 border border-orange-500/40 text-orange-400 hover:bg-orange-600/30 transition-all shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "backOut" }}
              className="flex flex-col items-center max-w-5xl"
            >
              <div className="h-1 w-64 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-12 shadow-[0_0_30px_rgba(234,179,8,1)]" />
              <h1 className="text-white text-5xl md:text-8xl font-festive leading-tight mb-16 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                Lohri celebrates harvest, warmth, and new beginnings.
              </h1>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(251,146,60,0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onFinish}
                className="px-20 py-8 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full text-white font-bold text-2xl uppercase tracking-[0.2em] shadow-2xl relative group overflow-hidden"
              >
                <span className="relative z-10">Enter Village Celebration</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
