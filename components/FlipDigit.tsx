import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';

interface FlipDigitProps {
  value: string | number;
  theme: Theme;
  fontFamily: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value, theme, fontFamily }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setNextValue(value);
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 600); // Sync with CSS/Motion duration

      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const cardW = "w-16 sm:w-28";
  const cardH = "h-24 sm:h-44";
  const fontSize = "text-[5.5rem] sm:text-[9.5rem]";
  
  // A single half-digit piece
  const DigitHalf = ({ val, type, shadowIntensity = 0 }: { val: string | number, type: 'top' | 'bottom', shadowIntensity?: number }) => (
    <div className={`absolute left-0 w-full h-full flex justify-center overflow-hidden transition-colors duration-500 ${theme.cardBg} ${theme.cardText} ${type === 'top' ? 'items-end rounded-t-xl' : 'items-start rounded-b-xl'}`}>
      <div 
        className={`absolute w-full h-[200%] flex items-center justify-center ${fontSize} font-bold leading-none`}
        style={{ 
          fontFamily, 
          top: type === 'top' ? '0' : '-100%',
        }}
      >
        {val}
      </div>
      {/* Dynamic shadow for depth */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300" 
        style={{ backgroundColor: `rgba(0,0,0,${shadowIntensity})` }} 
      />
    </div>
  );

  return (
    <div className={`relative ${cardW} ${cardH} perspective-1000 select-none`}>
      {/* 1. BOTTOM STATIC: Shows CURRENT value (until leaf lands) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-10">
        <DigitHalf val={displayValue} type="bottom" />
      </div>

      {/* 2. TOP STATIC: Shows NEXT value (revealed as leaf falls) */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0">
        <DigitHalf val={nextValue} type="top" shadowIntensity={0.1} />
      </div>

      {/* 3. FLIPPING LEAF: The piece that actually moves */}
      <AnimatePresence mode="popLayout">
        {isFlipping && (
          <motion.div
            key={prevValueRef.current}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            exit={{ rotateX: -180 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 z-30 preserve-3d"
            style={{ transformOrigin: 'bottom' }}
          >
            {/* LEAF FRONT: Top half of OLD value */}
            <div className="absolute inset-0 backface-hidden z-20">
              <DigitHalf val={displayValue} type="top" shadowIntensity={isFlipping ? 0.3 : 0} />
            </div>

            {/* LEAF BACK: Bottom half of NEW value (appears when flipped > 90deg) */}
            <div 
              className="absolute inset-0 backface-hidden z-10"
              style={{ transform: 'rotateX(-180deg)' }}
            >
              <DigitHalf val={nextValue} type="bottom" shadowIntensity={0} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Hinge Visuals */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/60 z-40 pointer-events-none transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-full h-[4px] z-50 pointer-events-none transform -translate-y-1/2 flex justify-between px-1">
        <div className="w-1.5 h-4 -mt-1 bg-zinc-800/80 rounded-full border border-white/5" />
        <div className="w-1.5 h-4 -mt-1 bg-zinc-800/80 rounded-full border border-white/5" />
      </div>
      
      {/* Overall Finishing Touches */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none z-[60] shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]" />
    </div>
  );
};

export default React.memo(FlipDigit);