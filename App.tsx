
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroScene } from './components/IntroScene';
import { StoryScene } from './components/StoryScene';
import { GameScene } from './components/GameScene';

const App: React.FC = () => {
  const [stage, setStage] = useState<'intro' | 'story' | 'game'>('intro');

  useEffect(() => {
    // Transition to story after intro completes its cinematic cycle
    const storyTimer = setTimeout(() => {
      setStage('story');
    }, 8500);

    return () => clearTimeout(storyTimer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#02040a]">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 z-50"
          >
            <IntroScene />
          </motion.div>
        )}
        
        {stage === 'story' && (
          <motion.div
            key="story-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <StoryScene onFinish={() => setStage('game')} />
          </motion.div>
        )}

        {stage === 'game' && (
          <motion.div
            key="game-stage"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="absolute inset-0"
          >
            <GameScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
