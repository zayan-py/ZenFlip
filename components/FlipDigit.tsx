import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Theme } from '../types';

interface FlipDigitProps {
  /** The value (0-9) to display */
  value: string | number;
  /** Active theme for colors */
  theme: Theme;
  /** Active font family string */
  fontFamily: string;
}

/**
 * FlipDigit Component
 * Renders a single mechanical flip digit with 3D animation.
 * Logic uses a "flap" system where a leaf rotates 180 degrees to reveal the next value.
 */
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
      
      // Perform the 180 degree flip
      controls.start({
        rotateX: -180,
        transition: { 
          duration: 0.5, 
          ease: [0.4, 0, 0.2, 1] 
        }
      }).then(() => {
        // Swap values and reset flap position
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
  
  /**
   * Helper to render one half of a flip card.
   */
  const DigitHalf = ({ val, type, overlayOpacity = 0 }: { val: string | number, type: 'top' | 'bottom', overlayOpacity?: number }) => (
    <div className={`absolute left-0 w-full h-full flex justify-center overflow-hidden ${theme.cardBg} ${theme.cardText} ${type === 'top' ? 'items-end rounded-t-xl' : 'items-start rounded-b-xl'}`}>
      <div 
        className={`absolute w-full h-[200%] flex items-center justify-center ${fontSize} font-bold leading-none`}
        style={{ 
          fontFamily, 
          top: type === 'top' ? '0' : '-100%',
        }}
      >
        {val}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
      {type === 'top' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10" />}
    </div>
  );

  return (
    <div className={`relative ${cardW} ${cardH} perspective-1000 select-none group`}>
      {/* Background Bottom: Displays the current value */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-10">
        <DigitHalf val={currentValue} type="bottom" />
      </div>

      {/* Background Top: Displays the incoming value */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0">
        <DigitHalf val={nextValue} type="top" overlayOpacity={0.05} />
      </div>

      {/* The Animated Leaf */}
      <motion.div
        animate={controls}
        initial={{ rotateX: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          zIndex: 30,
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom',
        }}
      >
        {/* Front Half: Top portion of the old value */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <DigitHalf val={currentValue} type="top" overlayOpacity={isFlipping ? 0.3 : 0} />
        </div>

        {/* Back Half: Bottom portion of the new value */}
        <div
          className="absolute inset-0"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(-180deg)',
          }}
        >
          <DigitHalf val={nextValue} type="bottom" overlayOpacity={isFlipping ? 0 : 0.4} />
        </div>
      </motion.div>

      {/* Aesthetic Hinge Element */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/40 z-50 pointer-events-none transform -translate-y-1/2 flex justify-between px-1">
        <div className="w-1.5 h-3 -mt-1.5 bg-black/60 rounded-full shadow-inner border border-white/5" />
        <div className="w-1.5 h-3 -mt-1.5 bg-black/60 rounded-full shadow-inner border border-white/5" />
      </div>
      
      <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none z-[60] shadow-inner" />
    </div>
  );
};

export default React.memo(FlipDigit);