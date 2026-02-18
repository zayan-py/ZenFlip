
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
      
      // Perform the 180 degree flip
      controls.start({
        rotateX: -180,
        transition: { 
          duration: 0.5, 
          ease: [0.4, 0, 0.2, 1] // Snappy mechanical curve
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

  // Dimensions
  const cardW = "w-16 sm:w-28";
  const cardH = "h-24 sm:h-44";
  const fontSize = "text-[5.5rem] sm:text-[9rem]";
  
  /**
   * Helper to render the digit halves.
   * To ensure the top and bottom meet perfectly, we render the text in a container 
   * that is twice the height of the card half, then clip it.
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
      {/* Dynamic shadow/highlight overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
      {type === 'top' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10" />}
    </div>
  );

  return (
    <div className={`relative ${cardW} ${cardH} perspective-1000 select-none group`}>
      {/* 
          Z-INDEX LAYERING:
          1. Next Top (Static Bottom Layer)
          2. Current Bottom (Static Bottom Layer)
          3. Flipping Leaf (Top layer)
      */}

      {/* BACKGROUND: Static Bottom Half (Current) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-10">
        <DigitHalf val={currentValue} type="bottom" />
      </div>

      {/* BACKGROUND: Static Top Half (Next) */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0">
        <DigitHalf val={nextValue} type="top" overlayOpacity={0.05} />
      </div>

      {/* THE FLAP (Animated leaf) */}
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
        {/* FRONT: Top half of OLD value */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <DigitHalf val={currentValue} type="top" overlayOpacity={isFlipping ? 0.3 : 0} />
        </div>

        {/* BACK: Bottom half of NEW value */}
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

      {/* 4. MECHANICAL HINGE (Always on top) */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/40 z-50 pointer-events-none transform -translate-y-1/2 flex justify-between px-1">
        <div className="w-1.5 h-3 -mt-1.5 bg-black/60 rounded-full shadow-inner border border-white/5" />
        <div className="w-1.5 h-3 -mt-1.5 bg-black/60 rounded-full shadow-inner border border-white/5" />
      </div>
      
      {/* Outer border depth */}
      <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none z-[60] shadow-inner" />
    </div>
  );
};

export default React.memo(FlipDigit);
