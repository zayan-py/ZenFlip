
import React, { useState, useEffect } from 'react';
import { Mode, Theme, Font, AppSettings, SoundSettings } from '../types';
import { THEMES, FONTS } from '../constants';

interface ControlsProps {
  /** Current app mode */
  mode: Mode;
  /** Callback to change mode */
  setMode: (m: Mode) => void;
  /** Global app settings object */
  settings: AppSettings;
  /** Partial updater for settings */
  updateSettings: (s: Partial<AppSettings>) => void;
  /** Controls overall visibility of the bars */
  visible: boolean;
  /** Callback to trigger visibility from child hover */
  onEnter: () => void;
  /** If true, the UI stays hidden regardless of mouse movement */
  locked: boolean;
}

/**
 * Controls Component
 * Renders the top (modes) and bottom (settings) floating bars.
 */
const Controls: React.FC<ControlsProps> = ({
  mode, setMode, settings, updateSettings, visible, onEnter, locked
}) => {
  const currentTheme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];

  const [timerInput, setTimerInput] = useState(String(Math.floor(settings.timerDuration / 60)));
  const [pomoFocusInput, setPomoFocusInput] = useState(String(settings.pomoFocus));
  const [pomoBreakInput, setPomoBreakInput] = useState(String(settings.pomoBreak));

  useEffect(() => {
    setTimerInput(String(Math.floor(settings.timerDuration / 60)));
  }, [settings.timerDuration]);

  useEffect(() => {
    setPomoFocusInput(String(settings.pomoFocus));
  }, [settings.pomoFocus]);

  useEffect(() => {
    setPomoBreakInput(String(settings.pomoBreak));
  }, [settings.pomoBreak]);

  const handleSoundUpdate = (update: Partial<SoundSettings>) => {
    updateSettings({ sound: { ...settings.sound, ...update } });
  };

  const isUIReallyVisible = visible && !locked;

  const barClasses = `fixed left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-700 z-50 px-4 py-2 sm:px-6 sm:py-3
    ${isUIReallyVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    ${currentTheme.controlBg} backdrop-blur-3xl border border-black/10 shadow-2xl rounded-full`;

  const inputBase = `bg-transparent text-center ${currentTheme.uiText} text-[10px] sm:text-xs font-bold outline-none border-b border-black/10`;

  // Filter themes into groups for assortment (5 Dark, 5 Light)
  const darkThemes = THEMES.slice(0, 5);
  const lightThemes = THEMES.slice(5);

  return (
    <>
      <div 
        onMouseEnter={onEnter}
        className={`${barClasses} top-8 ${isUIReallyVisible ? 'translate-y-0' : '-translate-y-12'}`}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          {[Mode.CLOCK, Mode.TIMER, Mode.STOPWATCH, Mode.POMODORO].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs font-black transition-all uppercase tracking-[0.2em]
                ${mode === m 
                  ? `${currentTheme.cardBg} ${currentTheme.cardText} shadow-lg scale-105` 
                  : `${currentTheme.uiText} opacity-40 hover:opacity-100`}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div 
        onMouseEnter={onEnter}
        className={`${barClasses} bottom-8 flex-wrap justify-center sm:flex-nowrap max-w-[95vw] ${isUIReallyVisible ? 'translate-y-0' : 'translate-y-12'}`}
      >
        <div className="flex items-center gap-3 border-r border-black/10 pr-4">
          <div className="flex items-center gap-2">
            {/* Dark Group */}
            <div className="flex gap-1.5">
              {darkThemes.map(t => (
                <button
                  key={t.id}
                  onClick={() => updateSettings({ themeId: t.id })}
                  style={{ backgroundColor: t.preview }}
                  className={`w-5 h-5 rounded-full border-2 transition-all active:scale-90
                    ${settings.themeId === t.id ? 'border-white scale-125' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  title={t.name}
                />
              ))}
            </div>
            {/* Minimal Divider */}
            <div className="w-[1px] h-4 bg-black/20 mx-1" />
            {/* Light Group */}
            <div className="flex gap-1.5">
              {lightThemes.map(t => (
                <button
                  key={t.id}
                  onClick={() => updateSettings({ themeId: t.id })}
                  style={{ backgroundColor: t.preview }}
                  className={`w-5 h-5 rounded-full border-2 transition-all active:scale-90
                    ${settings.themeId === t.id ? (t.id === 'bw' || t.id === 'sky' ? 'border-black' : 'border-black/50') + ' scale-125' : 'border-black/5 opacity-60 hover:opacity-100'}`}
                  title={t.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-r border-black/10 pr-4">
          <select 
            value={settings.fontId}
            onChange={(e) => updateSettings({ fontId: e.target.value })}
            className={`bg-transparent ${currentTheme.uiText} text-[10px] sm:text-xs font-bold outline-none uppercase tracking-widest cursor-pointer hover:opacity-100`}
          >
            {FONTS.map(f => <option key={f.id} value={f.id} className="bg-zinc-900 text-white">{f.name}</option>)}
          </select>
        </div>

        {mode === Mode.TIMER && (
          <div className="flex items-center gap-2 border-r border-black/10 pr-4">
            <span className={`${currentTheme.uiText} text-[10px] font-black opacity-30 uppercase`}>Set Duration:</span>
            <div className="flex items-center gap-1">
              <input 
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={timerInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) {
                    setTimerInput(val);
                    const num = Math.min(parseInt(val) || 0, 5999);
                    updateSettings({ timerDuration: num * 60 });
                  }
                }}
                className={`${inputBase} w-16`}
              />
              <span className={`${currentTheme.uiText} opacity-30 text-[10px] font-bold`}>M</span>
            </div>
          </div>
        )}

        {mode === Mode.POMODORO && (
          <div className="flex items-center gap-3 border-r border-black/10 pr-4">
             <div className="flex items-center gap-1">
               <span className={`${currentTheme.uiText} text-[10px] font-black opacity-30`}>FOCUS</span>
               <input 
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={pomoFocusInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) {
                    setPomoFocusInput(val);
                    const num = parseInt(val) || 0;
                    updateSettings({ pomoFocus: num });
                  }
                }}
                className={`${inputBase} w-10`}
               />
             </div>
             <div className="flex items-center gap-1">
               <span className={`${currentTheme.uiText} text-[10px] font-black opacity-30`}>BREAK</span>
               <input 
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={pomoBreakInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) {
                    setPomoBreakInput(val);
                    const num = parseInt(val) || 0;
                    updateSettings({ pomoBreak: num });
                  }
                }}
                className={`${inputBase} w-10`}
               />
             </div>
          </div>
        )}

        <div className="flex items-center gap-2 border-r border-black/10 pr-4">
          <select 
            value={settings.sound.tickType}
            onChange={(e) => handleSoundUpdate({ tickType: e.target.value as any })}
            className={`bg-transparent ${currentTheme.uiText} text-[10px] sm:text-xs font-bold outline-none uppercase tracking-widest cursor-pointer hover:opacity-100`}
          >
            <option value="none" className="bg-zinc-900 text-white">No Ticks</option>
            <option value="flip" className="bg-zinc-900 text-white">Flip</option>
            <option value="soft" className="bg-zinc-900 text-white">Soft</option>
            <option value="mech" className="bg-zinc-900 text-white">Mech</option>
            <option value="digital" className="bg-zinc-900 text-white">Digital</option>
          </select>
          <select 
            value={settings.sound.tickInterval}
            onChange={(e) => handleSoundUpdate({ tickInterval: e.target.value as any })}
            className={`bg-transparent ${currentTheme.uiText} text-[10px] sm:text-xs font-bold outline-none uppercase tracking-widest cursor-pointer hover:opacity-100 ml-2`}
          >
            <option value="off" className="bg-zinc-900 text-white">Off</option>
            <option value="1s" className="bg-zinc-900 text-white">Every 1s</option>
            <option value="1m" className="bg-zinc-900 text-white">Every 1m</option>
            <option value="10m" className="bg-zinc-900 text-white">Every 10m</option>
          </select>
        </div>

        <div className="flex items-center">
          <button 
            onClick={() => updateSettings({ is24h: !settings.is24h })}
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${settings.is24h ? currentTheme.accent : currentTheme.uiText} opacity-80 hover:opacity-100`}
          >
            {settings.is24h ? '24H' : '12H'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Controls;
