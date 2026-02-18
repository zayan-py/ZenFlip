import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Theme } from '../types';

interface FlipDigitProps {
  value: string | number;
  theme: Theme;
  fontFamily: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value, theme, fontFamily }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const controls = useAnimation();
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setNextValue(value);
      setIsFlipping(true);
      
      controls.start({
        rotateX: -180,
        transition: { 
          duration: 0.6, 
          ease: [0.4, 0, 0.2, 1] 
        }
      }).then(() => {
        setCurrentValue(value);
        setIsFlipping(false);
        controls.set({ rotateX: 0 });
      });

      prevValueRef.current = value;
    }
  }, [value, controls]);

  const cardW = "w-16 sm:w-28";
  const cardH = "h-24 sm:h-44";
  const fontSize = "text-[5.5rem] sm:text-[9rem]";
  
  const DigitHalf = ({ val, type, overlayOpacity = 0 }: { val: string | number, type: 'top' | 'bottom', overlayOpacity?: number }) => (
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
      {/* Shadow Overlay for depth during flip */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
      {/* Center Hinge Shadow */}
      {type === 'top' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20" />}
      {type === 'bottom' && <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />}
    </div>
  );

  return (
    <div className={`relative ${cardW} ${cardH} perspective-1000 select-none group`}>
      {/* Background Bottom: Final resting place of the new value */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-10">
        <DigitHalf val={nextValue} type="bottom" />
      </div>

      {/* Background Top: The "next" value waiting to be revealed */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0">
        <DigitHalf val={nextValue} type="top" overlayOpacity={0.05} />
      </div>

      {/* The Rotating Flap */}
      <motion.div
        animate={controls}
        initial={{ rotateX: 0 }}
        className="absolute top-0 left-0 w-full h-1/2 z-30 preserve-3d"
        style={{ transformOrigin: 'bottom' }}
      >
        {/* Front: Top of the old value */}
        <div className="absolute inset-0 backface-hidden">
          <DigitHalf val={currentValue} type="top" overlayOpacity={isFlipping ? 0.4 : 0} />
        </div>

        {/* Back: Bottom of the new value */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateX(-180deg)' }}
        >
          <DigitHalf val={nextValue} type="bottom" overlayOpacity={isFlipping ? 0 : 0.4} />
        </div>
      </motion.div>

      {/* Mechanical Hinge Accents */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/40 z-50 pointer-events-none transform -translate-y-1/2 flex justify-between px-1">
        <div className="w-1.5 h-3 -mt-1.5 bg-zinc-800 rounded-full shadow-lg border border-white/5" />
        <div className="w-1.5 h-3 -mt-1.5 bg-zinc-800 rounded-full shadow-lg border border-white/5" />
      </div>
      
      {/* Gloss/Inner Shadow Overlay */}
      <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none z-[60] shadow-inner opacity-30" />
    </div>
  );
};

export default React.memo(FlipDigit);