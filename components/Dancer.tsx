
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface DancerProps {
  gender: 'male' | 'female';
  side: 'left' | 'right';
  delay: number;
  offset?: number;
  speed?: number;
}

export const Dancer: React.FC<DancerProps> = ({ gender, side, delay, offset = 220, speed = 1 }) => {
  const isLeft = side === 'left';
  const startX = isLeft ? -900 : 900;
  const targetX = isLeft ? -offset : offset;
  const isMale = gender === 'male';

  const maleKurtaColor = isLeft ? 'bg-blue-600' : 'bg-emerald-600';
  const femaleKurtaColor = isLeft ? 'bg-pink-600' : 'bg-fuchsia-700';
  const dupattaColor = 'bg-yellow-400';
  const turbanColor = isLeft ? 'bg-orange-500' : 'bg-red-600';
  const skinColor = '#fbdcbd';

  const bodyVariants: Variants = {
    animate: {
      y: [-40, 0, -40], 
      rotate: isMale ? [-6, 6, -6] : [-4, 4, -4],
      transition: {
        duration: 0.45 / speed,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    }
  };

  const handVariants = (armSide: 'left' | 'right'): Variants => {
    const baseRot = armSide === 'left' ? -135 : -45;
    const swing = 35;

    return {
      animate: {
        rotate: armSide === 'left' 
          ? [baseRot, baseRot - swing, baseRot] 
          : [baseRot, baseRot + swing, baseRot],
        scale: [1, 1.15, 1],
        transition: {
          duration: 0.45 / speed,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }
      }
    };
  };

  const legVariants = (legSide: 'left' | 'right'): Variants => {
    const liftY = legSide === 'left' ? [-30, 0, 0] : [0, 0, -30];
    return {
      animate: {
        y: liftY,
        transition: {
          duration: 0.9 / speed,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }
      }
    };
  };

  const Finger = ({ delayOffset = 0 }: { delayOffset?: number }) => (
    <motion.div 
      animate={{ height: ['8px', '12px', '8px'] }}
      transition={{ duration: 0.45 / speed, repeat: Infinity, delay: delayOffset }}
      className="w-[3px] bg-[#e6b3a2] rounded-full mx-[1px]" 
    />
  );

  const Jutti = () => (
    <div className="relative w-20 h-8 bg-[#4e342e] rounded-b-xl border-t-2 border-black/30 shadow-lg">
      <div className="absolute -top-1 left-2 w-16 h-2 bg-[#ffc107] opacity-40 blur-[1px]" />
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full scale-50" />
      <div className="absolute bottom-0 right-0 w-8 h-4 bg-[#3d2723] rounded-br-xl" />
    </div>
  );

  return (
    <motion.div
      initial={{ x: startX, opacity: 0, scale: 0.5 }}
      animate={{ x: targetX, opacity: 1, scale: 1 }}
      transition={{
        duration: 3,
        delay,
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      className="absolute flex flex-col items-center filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
    >
      <motion.div
        variants={bodyVariants}
        animate="animate"
        className="relative flex flex-col items-center"
      >
        {/* Head Area */}
        <div className="relative z-50 flex flex-col items-center">
          {isMale ? (
            <div className="relative mb-[-10px]">
              <motion.div 
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 0.45 / speed, repeat: Infinity }}
                className={`absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-16 ${turbanColor} rounded-t-full origin-bottom border-b-4 border-black/30 shadow-2xl flex justify-between px-2 overflow-hidden`}
              >
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="w-[3px] h-full bg-white/20 rotate-[20deg]" />
                 ))}
              </motion.div>
              <div className={`w-24 h-14 ${turbanColor} rounded-t-3xl relative z-10 border-b-4 border-black/30 shadow-xl`} />
            </div>
          ) : (
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-14 bg-[#0a0a0a] rounded-t-full border-b-2 border-black/50" />
              <div className="absolute top-1 w-5 h-5 bg-yellow-400 rounded-full shadow-[0_0_25px_rgba(255,215,0,1)] z-40 border-2 border-amber-600" />
              <motion.div 
                animate={{ rotate: [-25, 25, -25] }}
                transition={{ duration: 1 / speed, repeat: Infinity }}
                className="absolute top-8 -right-12 origin-top"
              >
                <div className="w-5 h-44 bg-[#050505] rounded-full border-r-2 border-white/10" />
              </motion.div>
            </div>
          )}

          <div className={`w-16 h-16 bg-[#fbdcbd] rounded-full shadow-inner relative flex flex-col items-center border-2 border-[#d4a373]/40`}>
             <div className="flex gap-6 mt-5">
               <div className="w-4 h-4 bg-[#0a0a0a] rounded-full" />
               <div className="w-4 h-4 bg-[#0a0a0a] rounded-full" />
             </div>
             <div className="w-8 h-4 border-b-2 border-[#8d6e63] rounded-full mt-2" />
          </div>
        </div>

        {/* Arms & Torso */}
        <div className="relative z-40">
          <div className={`w-36 h-56 ${isMale ? maleKurtaColor : femaleKurtaColor} rounded-t-[50px] relative overflow-hidden border-2 border-black/10 shadow-2xl`}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#fff_1px,_transparent_1px)] bg-[size:18px_18px]" />
            {isMale ? (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-32 bg-black/15 flex flex-col items-center gap-6 py-8" />
            ) : (
                <div className={`absolute top-0 left-[-35%] w-[180%] h-[95%] ${dupattaColor} -rotate-[35deg] origin-top-left border-b-4 border-orange-500 shadow-xl`} />
            )}
          </div>

          {/* Left Hand with Fingers */}
          <motion.div
            variants={handVariants('left')}
            animate="animate"
            style={{ originX: 0.9, originY: 0.5 }}
            className="absolute top-10 -left-20 w-28 h-10 bg-[#fbdcbd] rounded-full shadow-2xl flex items-center justify-end border border-black/5"
          >
             <div className={`w-14 h-full ${isMale ? maleKurtaColor : femaleKurtaColor} rounded-l-full mr-auto`} />
             <div className="flex items-end mb-1 mr-2">
                <Finger delayOffset={0} /><Finger delayOffset={0.1} /><Finger delayOffset={0.2} /><Finger delayOffset={0.3} />
             </div>
          </motion.div>
          
          {/* Right Hand with Fingers */}
          <motion.div
            variants={handVariants('right')}
            animate="animate"
            style={{ originX: 0.1, originY: 0.5 }}
            className="absolute top-10 -right-20 w-28 h-10 bg-[#fbdcbd] rounded-full shadow-2xl flex items-center justify-start border border-black/5"
          >
             <div className={`w-14 h-full ${isMale ? maleKurtaColor : femaleKurtaColor} rounded-r-full ml-auto`} />
             <div className="flex items-end mb-1 ml-2">
                <Finger delayOffset={0} /><Finger delayOffset={0.1} /><Finger delayOffset={0.2} /><Finger delayOffset={0.3} />
             </div>
          </motion.div>
        </div>

        {/* Legs & Shoes */}
        <div className="flex gap-4 -mt-10 z-30">
          <motion.div variants={legVariants('left')} animate="animate" className="flex flex-col items-center">
            <div className={`w-18 h-36 ${isMale ? maleKurtaColor : femaleKurtaColor} rounded-b-3xl shadow-2xl border-t-8 border-black/10`} />
            <div className="-mt-2"><Jutti /></div>
          </motion.div>
          <motion.div variants={legVariants('right')} animate="animate" className="flex flex-col items-center">
            <div className={`w-18 h-36 ${isMale ? maleKurtaColor : femaleKurtaColor} rounded-b-3xl shadow-2xl border-t-8 border-black/10`} />
            <div className="-mt-2"><Jutti /></div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
