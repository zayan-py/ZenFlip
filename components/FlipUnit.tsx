
import React from 'react';
import FlipDigit from './FlipDigit';
import { Theme } from '../types';

interface FlipUnitProps {
  value: number;
  label: string;
  theme: Theme;
  fontFamily: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label, theme, fontFamily }) => {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-12">
      <div className="flex gap-2 sm:gap-4 items-center">
        <FlipDigit value={tens} theme={theme} fontFamily={fontFamily} />
        <FlipDigit value={ones} theme={theme} fontFamily={fontFamily} />
      </div>
      <span className={`text-[10px] sm:text-sm uppercase tracking-[0.5em] font-black opacity-25 transition-all duration-300 hover:opacity-100 cursor-default ${theme.accent}`}>
        {label}
      </span>
    </div>
  );
};

export default React.memo(FlipUnit);
