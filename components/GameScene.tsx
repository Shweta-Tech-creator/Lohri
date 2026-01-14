
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bonfire } from './Bonfire';

// --- STARFIELD COMPONENT ---
const Starfield = () => {
  const stars = useMemo(() => [...Array(120)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 2,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          className="absolute bg-white rounded-full shadow-[0_0_8px_white]"
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

// --- MIST COMPONENT ---
const GroundMist = () => (
  <motion.div
    initial={{ x: '-10%', opacity: 0 }}
    animate={{ x: '10%', opacity: 0.12 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
    className="absolute bottom-0 w-[150%] h-[30%] bg-gradient-to-t from-blue-900/40 via-orange-900/10 to-transparent pointer-events-none z-0 blur-3xl"
  />
);

// --- ASSET SVG WRAPPERS ---
const VillageHouse = () => (
  <svg width="180" height="180" viewBox="0 0 100 100" className="drop-shadow-2xl">
    <path d="M10 90V45L50 10L90 45V90H10Z" fill="#1c0f08" stroke="#000" strokeWidth="2" />
    <path d="M5 45L50 5L95 45H5Z" fill="#2d1b0d" stroke="#000" strokeWidth="2" />
    <rect x="38" y="65" width="24" height="25" fill="#000" />
    <motion.rect 
      x="18" y="55" width="10" height="10" fill="#fef3c7" 
      animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
    />
  </svg>
);

const MelaStall = () => (
  <svg width="150" height="150" viewBox="0 0 100 100">
    <rect x="10" y="65" width="80" height="25" fill="#3e2723" />
    <path d="M5 65L20 30H80L95 65H5Z" fill="#991b1b" stroke="#000" strokeWidth="2" />
    <path d="M15 65V90M85 65V90" stroke="#1a0f05" strokeWidth="3" />
  </svg>
);

const ImprovedRangoliSVG = () => (
  <svg width="180" height="160" viewBox="0 0 120 100" className="drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
    {/* High-quality Mandala Base */}
    <circle cx="60" cy="50" r="48" fill="#500724" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="60" cy="50" r="38" fill="#9d174d" stroke="#fcd34d" strokeWidth="1" />
    <circle cx="60" cy="50" r="30" fill="#be123c" opacity="0.8" />
    
    {/* Geometric Petal Patterns */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <g key={angle} transform={`rotate(${angle}, 60, 50)`}>
        <path d="M60 10 Q70 25 60 40 Q50 25 60 10" fill="#166534" opacity="0.9" />
        <circle cx="60" cy="15" r="2.5" fill="#fbbf24" />
      </g>
    ))}
    
    {/* Vibrant Inner Star */}
    <path 
      d="M60 25 L68 42 L88 42 L72 52 L78 72 L60 60 L42 72 L48 52 L32 42 L52 42 Z" 
      fill="#fbbf24" 
      className="drop-shadow-md"
    />
    
    {/* Central Glowing Oil Lamp (Diya) */}
    <ellipse cx="60" cy="55" rx="12" ry="6" fill="#7f1d1d" />
    <motion.path 
      d="M60 52 Q66 40 60 30 Q54 40 60 52" 
      fill="#f59e0b"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.8],
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
      }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
    <motion.circle 
      cx="60" cy="45" r="5" fill="#fbbf24" 
      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className="blur-sm"
    />
  </svg>
);

const SugarcaneSVG = () => (
  <svg width="100" height="200" viewBox="0 0 60 120" className="drop-shadow-2xl">
    {/* Realistic Bundle of Sugarcane stalks */}
    {[18, 28, 38].map((x, i) => (
      <g key={x}>
        <motion.path 
          d={`M${x} 120 V25`} 
          stroke={i === 1 ? "#064e3b" : "#065f46"} 
          strokeWidth="5" 
          strokeLinecap="round"
          animate={{ d: [`M${x} 120 V25`, `M${x} 120 Q${x + 6} 65 ${x + 10} 25`, `M${x} 120 V25`] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Nodes (Sugar joints) */}
        {[35, 55, 75, 95, 115].map(y => (
          <path key={y} d={`M${x-3} ${y} L${x+3} ${y}`} stroke="#022c22" strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>
    ))}
    
    {/* Lush Green Leaves at the Top */}
    <g transform="translate(28, 25)">
      {[-70, -35, 0, 35, 70].map((angle, i) => (
        <motion.path
          key={angle}
          d="M0 0 Q15 -25 35 -30"
          stroke="#15803d"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          transform={`rotate(${angle})`}
          animate={{ rotate: [angle - 6, angle + 6, angle - 6], y: [0, -2, 0] }}
          transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Mid-sized leaves for thickness */}
      {[-50, 50].map((angle, i) => (
        <motion.path
          key={`mid-${angle}`}
          d="M0 0 Q10 -15 20 -20"
          stroke="#16a34a"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          transform={`rotate(${angle})`}
          animate={{ rotate: [angle + 5, angle - 5, angle + 5] }}
          transition={{ duration: 2.8 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  </svg>
);

const DholPlayerIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <ellipse cx="50" cy="50" rx="40" ry="25" fill="#2d1b0d" stroke="#000" strokeWidth="4" />
    <motion.path d="M45 25 L50 40 L55 25" stroke="#fbbf24" strokeWidth="3" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.3, repeat: Infinity }} />
  </svg>
);

const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

interface VillageItem {
  id: string;
  type: string;
  x: number;
  y: number;
  scale: number;
}

interface ItemType {
  type: string;
  label: string;
  points: number;
  component: React.ReactNode;
}

const ITEM_TYPES: ItemType[] = [
  { type: 'house', label: 'Big House', points: 15, component: <VillageHouse /> },
  { type: 'stall', label: 'Mela Stall', points: 12, component: <MelaStall /> },
  { type: 'sugarcane', label: 'Sugarcane', points: 8, component: <SugarcaneSVG /> },
  { type: 'rangoli', label: 'Rangoli', points: 10, component: <ImprovedRangoliSVG /> },
];

const OFFERINGS = [
  { id: 'popcorn', label: 'Popcorn', points: 2 },
  { id: 'peanuts', label: 'Peanuts', points: 2 },
  { id: 'rewari', label: 'Rewari', points: 4 },
];

export const GameScene: React.FC = () => {
  const [items, setItems] = useState<VillageItem[]>([]);
  const [happiness, setHappiness] = useState(25);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [tosses, setTosses] = useState<{id: number, type: string, x: number, y: number}[]>([]);
  const [isSkyFlashing, setIsSkyFlashing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{id: number, x: number, y: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
  };

  const playDholSound = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMultiplier(m => Math.max(1, m - 0.05));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    const id = Date.now() + Math.random();
    setTrail(prev => [{ id, x: e.clientX, y: e.clientY }, ...prev].slice(0, 10));
    setTimeout(() => setTrail(prev => prev.filter(t => t.id !== id)), 400);
  };

  const handleDholClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playDholSound();
    setMultiplier(m => Math.min(6, m + 0.6));
    setHappiness(h => Math.min(100, h + 1.2));
    setIsSkyFlashing(true);
    setTimeout(() => setIsSkyFlashing(false), 70);
  };

  const handlePlacementClick = useCallback((e: React.MouseEvent) => {
    // If an item was selected, deselect it when clicking the background
    if (selectedItemId) {
      setSelectedItemId(null);
      return;
    }

    if (!selectedType) return;
    const itemConfig = ITEM_TYPES.find(i => i.type === selectedType);
    if (!itemConfig) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (y < 45) return;

    const newItem: VillageItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      x, 
      y, 
      scale: 1 + (y / 100) * 1.5,
    };
    
    setItems(prev => [...prev, newItem].sort((a, b) => a.y - b.y));
    setHappiness(h => Math.min(100, h + itemConfig.points));
  }, [selectedType, selectedItemId]);

  const updateItemPosition = (id: string, newX: number, newY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPerc = (newX / rect.width) * 100;
    const yPerc = (newY / rect.height) * 100;
    
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, x: xPerc, y: yPerc, scale: 1 + (yPerc / 100) * 1.5 } : item
    ).sort((a, b) => a.y - b.y));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setHappiness(h => Math.max(0, h - 5));
    setSelectedItemId(null);
  };

  const refreshVillage = () => {
    setItems([]);
    setHappiness(25);
  };

  const addOffering = (offering: typeof OFFERINGS[0]) => {
    setHappiness(h => Math.min(100, h + offering.points * multiplier));
    const tossId = Date.now();
    setTosses(prev => [...prev, { id: tossId, type: offering.id, x: mousePos.x, y: mousePos.y }]);
    setTimeout(() => setTosses(prev => prev.filter(t => t.id !== tossId)), 800);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#010206] overflow-hidden flex flex-col select-none cursor-none"
      onMouseMove={handleMouseMove}
      onClick={handlePlacementClick}
    >
      {/* Visual Depth Atmosphere */}
      <motion.div 
        animate={{ 
          background: isSkyFlashing 
            ? 'radial-gradient(circle at center, #1a0802 0%, #010206 100%)' 
            : 'radial-gradient(circle at center, #080402 0%, #010206 100%)' 
        }}
        className="absolute inset-0 pointer-events-none transition-colors duration-100"
      />
      <Starfield />
      <GroundMist />

      {/* Ground Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1.1],
          opacity: [0.2, 0.5, 0.3, 0.5],
        }}
        transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-[55%] -translate-x-1/2 w-[600px] h-[350px] bg-orange-950/40 blur-[100px] rounded-full pointer-events-none z-0"
      />

      {/* Village Layer */}
      <div className="absolute bottom-0 w-full h-[55%] z-10">
        {items.map(item => {
          const isSelected = selectedItemId === item.id;
          return (
            <motion.div
              key={item.id}
              drag
              dragMomentum={false}
              onDragStart={() => setSelectedItemId(item.id)}
              onDragEnd={(e, info) => updateItemPosition(item.id, info.point.x, info.point.y)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isSelected ? item.scale * 1.05 : item.scale, 
                opacity: 1,
                left: `${item.x}%`, 
                top: `${item.y}%`,
              }}
              whileDrag={{ 
                scale: item.scale * 1.1, 
                zIndex: 1000,
                filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.9))' 
              }}
              className="absolute origin-bottom group"
              style={{ zIndex: isSelected ? 1000 : Math.floor(item.y) }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItemId(isSelected ? null : item.id);
              }}
            >
              <div className="relative -translate-x-1/2 -translate-y-full cursor-grab active:cursor-grabbing">
                {ITEM_TYPES.find(i => i.type === item.type)?.component}
                
                {/* Visual feedback for selection */}
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-yellow-500/50 rounded-xl blur-[2px] pointer-events-none" />
                )}

                {/* Individual Delete Button - Now more persistent and easier to click */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isSelected ? 1 : 0, 
                    scale: isSelected ? 1 : 0,
                    pointerEvents: isSelected ? 'auto' : 'none'
                  }}
                  whileHover={{ scale: 1.2, backgroundColor: '#ef4444' }}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    deleteItem(item.id); 
                  }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600/90 text-white p-3 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] z-[1100] group-hover:opacity-100 transition-all border border-white/20"
                  title="Delete Item"
                >
                  <TrashIcon />
                </motion.button>

                <motion.div 
                  animate={{ opacity: isSelected ? [0.1, 0.3, 0.1] : [0, 0.1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="absolute inset-0 bg-orange-400 blur-2xl rounded-full pointer-events-none"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Central Bonfire */}
      <div className="absolute left-1/2 top-[56%] -translate-x-1/2 z-20 pointer-events-none">
        <Bonfire intensity={0.7} spirit={1 + (happiness / 70)} />
      </div>

      {/* Custom Festive Cursor */}
      {trail.map(t => (
        <motion.div
          key={t.id}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          className="fixed w-1.5 h-1.5 bg-yellow-400 rounded-full blur-[0.5px] pointer-events-none z-[2000]"
          style={{ left: t.x, top: t.y }}
        />
      ))}
      <div 
        className="fixed w-5 h-5 border border-yellow-500 rounded-full pointer-events-none z-[2001] shadow-[0_0_15px_rgba(234,179,8,0.7)]"
        style={{ left: mousePos.x - 10, top: mousePos.y - 10 }}
      />

      {/* HUD / Interface */}
      <div className="absolute top-0 inset-x-0 p-8 z-[100] flex flex-col items-center gap-6 pointer-events-none">
        <div className="w-full max-w-4xl bg-black/80 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/5 shadow-2xl pointer-events-auto">
          <div className="flex justify-between items-end mb-4 px-4">
            <div className="flex flex-col gap-1">
              <p className="text-orange-500 text-[10px] uppercase font-bold tracking-[0.4em]">Celebration Score</p>
              <h2 className="text-white text-4xl font-festive flex items-baseline gap-3">
                VILLAGE GLOW: <span className="text-yellow-400">{Math.floor(happiness)}%</span>
              </h2>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-4">
                 <span className="text-4xl text-yellow-500 font-bold drop-shadow-lg">x{multiplier.toFixed(1)}</span>
                 <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={refreshVillage}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
                  title="Clear the entire village"
                >
                  <RefreshIcon />
                  Reset Village
                </motion.button>
              </div>
            </div>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div animate={{ width: `${happiness}%` }} className="h-full bg-gradient-to-r from-red-900 via-orange-600 to-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
          </div>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          {ITEM_TYPES.map(i => (
            <motion.button
              key={i.type}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); setSelectedType(selectedType === i.type ? null : i.type); setSelectedItemId(null); }}
              className={`px-8 py-4 rounded-3xl bg-black/60 border transition-all backdrop-blur-2xl font-bold tracking-widest text-xs uppercase ${selectedType === i.type ? 'border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'border-white/10 text-white hover:border-white/25'}`}
            >
              {i.label}
            </motion.button>
          ))}
        </div>
        
        <div className="flex gap-3 pointer-events-auto mt-2">
          {OFFERINGS.map(o => (
            <button
              key={o.id}
              onClick={(e) => { e.stopPropagation(); addOffering(o); }}
              className="px-6 py-2 rounded-full bg-orange-950/20 border border-orange-500/20 text-orange-200 text-[10px] font-bold uppercase tracking-widest hover:bg-orange-900/40 transition-all"
            >
              Offer {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rhythm Tool (Dhol) */}
      <div onClick={handleDholClick} className="absolute bottom-10 right-10 z-[100] pointer-events-auto cursor-pointer">
        <motion.div 
          animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 0.4 / multiplier, repeat: Infinity }}
          className="p-8 bg-black/70 rounded-full border border-yellow-500/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(234,179,8,0.2)]"
        >
          <DholPlayerIcon />
          <div className="text-yellow-500 text-[10px] font-bold text-center mt-2 tracking-[0.2em]">BEAT</div>
        </motion.div>
      </div>

      {/* Selection Help Hint */}
      {items.length > 0 && !selectedItemId && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] pointer-events-none z-50 bg-black/20 px-4 py-2 rounded-full"
        >
          Click an item to select and delete it
        </motion.div>
      )}

      {/* Finale Overlay */}
      <AnimatePresence>
        {happiness >= 100 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center">
            <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-white text-7xl md:text-9xl font-festive mb-8">
              A PURE FESTIVAL!
            </motion.h1>
            <p className="text-orange-100 text-2xl max-w-2xl mb-12 italic opacity-80">"You have reached 100% Celebration! The village is perfectly adorned for a joyous Lohri night."</p>
            <button onClick={(e) => { e.stopPropagation(); setHappiness(99); }} className="px-16 py-7 bg-orange-600 text-white rounded-full font-bold uppercase tracking-widest hover:bg-orange-500 transition-all">
              Stay in the Village
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tosses.map(t => (
          <motion.div 
            key={t.id} 
            initial={{ x: t.x, y: t.y, opacity: 1, scale: 2 }} 
            animate={{ x: window.innerWidth / 2, y: window.innerHeight * 0.56, scale: 0.1, opacity: 0 }} 
            transition={{ duration: 0.8, ease: "circIn" }} 
            className="fixed z-[150] pointer-events-none"
          >
             <div className="w-8 h-8 bg-yellow-200/50 rounded-full blur-sm" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
