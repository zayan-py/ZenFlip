import React, { useState, useEffect, useRef } from 'react';
import { Mode, AppSettings, SoundSettings, Theme, Font } from './types';
import { THEMES, FONTS } from './constants';
import FlipUnit from './components/FlipUnit';
import Controls from './components/Controls';
import { soundManager } from './services/SoundManager';

/**
 * Default fallback settings for new users
 */
const DEFAULT_SETTINGS: AppSettings = {
  themeId: 'amoled',
  fontId: 'rob-mono',
  is24h: true,
  timerDuration: 60,
  pomoFocus: 25,
  pomoBreak: 5,
  pomoCycles: 4,
  sound: {
    tickType: 'digital',
    tickInterval: '1s',
    tickVolume: 0.2
  }
};

/**
 * Main ZenFlip Application Component
 * Handles global state, interval ticking, and auto-hide UI logic.
 */
const App: React.FC = () => {
  // --- State Initialization ---
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('zenflip_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SETTINGS, ...parsed };
      } catch(e) { return DEFAULT_SETTINGS; }
    }
    return DEFAULT_SETTINGS;
  });

  const [mode, setMode] = useState<Mode>(Mode.CLOCK);
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [timerLeft, setTimerLeft] = useState(60); 
  const [timerActive, setTimerActive] = useState(false);
  const [pomoPhase, setPomoPhase] = useState<'focus' | 'break'>('focus');
  const [pomoCycle, setPomoCycle] = useState(1);
  const [uiVisible, setUiVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const lastInteractionRef = useRef(Date.now());

  /**
   * Updates global settings and persists them automatically
   */
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  useEffect(() => {
    localStorage.setItem('zenflip_settings', JSON.stringify(settings));
  }, [settings]);

  /**
   * Fullscreen handling logic
   */
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen();
    }
  };

  /**
   * Main Heartbeat Interval
   * Handles Clock time updates and Timer/Pomodoro decrements.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === Mode.CLOCK) {
        const now = new Date();
        setTime(now);
        
        // Handle audio ticking intervals for clock
        if (settings.sound.tickInterval !== 'off') {
          const s = now.getSeconds();
          const m = now.getMinutes();
          if (settings.sound.tickInterval === '1s') {
            soundManager.playTick(settings.sound.tickType, settings.sound.tickVolume);
          } else if (settings.sound.tickInterval === '1m' && s === 0) {
            soundManager.playTick(settings.sound.tickType, settings.sound.tickVolume);
          } else if (settings.sound.tickInterval === '10m' && s === 0 && m % 10 === 0) {
            soundManager.playTick(settings.sound.tickType, settings.sound.tickVolume);
          }
        }
      } else if (timerActive && timerLeft > 0) {
        setTimerLeft(prev => prev - 1);
        if (settings.sound.tickInterval === '1s') {
            soundManager.playTick(settings.sound.tickType, settings.sound.tickVolume);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, timerActive, timerLeft, settings.sound.tickType, settings.sound.tickInterval, settings.sound.tickVolume]);

  /**
   * Pomodoro State Machine
   * Manages transitions between focus and break phases.
   */
  useEffect(() => {
    if (timerActive && timerLeft === 0) {
      setTimerActive(false);
      soundManager.playAlarm();
      
      if (mode === Mode.POMODORO) {
        if (pomoPhase === 'focus') {
          setPomoPhase('break');
          setTimerLeft(settings.pomoBreak * 60);
        } else {
          setPomoPhase('focus');
          setTimerLeft(settings.pomoFocus * 60);
          setPomoCycle(c => (c >= settings.pomoCycles ? 1 : c + 1));
        }
        setTimerActive(true);
      }
    }
  }, [timerLeft, timerActive, mode, pomoPhase, settings.pomoBreak, settings.pomoFocus, settings.pomoCycles]);

  /**
   * Mode Sync
   * Ensures timer values are reset correctly when switching modes.
   */
  useEffect(() => {
    if (!timerActive) {
      if (mode === Mode.TIMER) setTimerLeft(settings.timerDuration);
      if (mode === Mode.POMODORO) setTimerLeft(settings.pomoFocus * 60);
    }
  }, [mode, settings.timerDuration, settings.pomoFocus]);

  /**
   * Stealth System
   * Automatically hides UI elements and the cursor after inactivity.
   */
  useEffect(() => {
    const checkIdle = setInterval(() => {
      if (Date.now() - lastInteractionRef.current > 3000) {
        setUiVisible(false);
      }
    }, 500);

    const onMove = () => {
      lastInteractionRef.current = Date.now();
      if (!isLocked) {
        setUiVisible(true);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMove);
    window.addEventListener('keydown', onMove);
    window.addEventListener('touchstart', onMove);

    return () => {
      clearInterval(checkIdle);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMove);
      window.removeEventListener('keydown', onMove);
      window.removeEventListener('touchstart', onMove);
    };
  }, [isLocked]);

  /**
   * Keyboard Shortcut Listener
   */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setTimerActive(prev => !prev);
      } else if (e.code === 'KeyR') {
        setTimerActive(false);
        if (mode === Mode.TIMER) setTimerLeft(settings.timerDuration);
        else {
          setTimerLeft(settings.pomoFocus * 60);
          setPomoPhase('focus');
          setPomoCycle(1);
        }
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, settings.timerDuration, settings.pomoFocus]);

  /**
   * Logic to determine what values to send to the Flip units
   */
  const getDisplayTime = () => {
    if (mode === Mode.CLOCK) {
      let h = time.getHours();
      let ampm = '';
      if (!settings.is24h) {
        ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
      }
      return { h, m: time.getMinutes(), s: time.getSeconds(), ampm };
    } else {
      let h = Math.floor(timerLeft / 3600);
      let m = Math.floor((timerLeft % 3600) / 60);
      let s = timerLeft % 60;
      return { h: Math.min(h, 99), m, s, ampm: '' };
    }
  };

  const { h, m, s, ampm } = getDisplayTime();
  const theme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];
  const font = FONTS.find(f => f.id === settings.fontId) || FONTS[0];

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden ${theme.bg} ${(!uiVisible && !isLocked) ? 'cursor-none' : ''}`}
    >
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]" />

      {/* Fullscreen Button - Top Right */}
      <button 
        onClick={toggleFullscreen}
        onMouseEnter={() => !isLocked && setUiVisible(true)}
        className={`fixed top-8 right-8 p-3 rounded-full z-[60] transition-all duration-700 active:scale-90 ${theme.controlBg} ${theme.accent} border border-black/5 shadow-xl hover:bg-black/10
          ${(uiVisible && !isLocked) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12 pointer-events-none'}`}
        title="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        )}
      </button>

      {/* Top Overlay: Phase Indicators */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${uiVisible && !isLocked ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        {mode === Mode.POMODORO && (
          <div className={`text-[10px] sm:text-xs uppercase tracking-[0.5em] font-black ${theme.accent} bg-black/5 px-4 py-1.5 rounded-full border border-black/5`}>
            {pomoPhase} — Cycle {pomoCycle}/{settings.pomoCycles}
          </div>
        )}
        {mode === Mode.TIMER && (
           <div className={`text-[10px] sm:text-xs uppercase tracking-[0.5em] font-black ${theme.accent} bg-black/5 px-4 py-1.5 rounded-full border border-black/5`}>
            {timerActive ? 'Running' : 'Paused'}
         </div>
        )}
      </div>

      {/* MATHEMATICAL CENTER: The Clock Group */}
      <div className="relative flex items-center gap-4 sm:gap-12 flex-wrap justify-center z-10 w-full px-4 max-w-7xl">
        <FlipUnit value={h} label="Hours" theme={theme} fontFamily={font.family} />
        <div className="flex flex-col gap-4 sm:gap-8 opacity-10 py-12 sm:py-20">
           <div className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${theme.accent} bg-current`} />
           <div className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${theme.accent} bg-current`} />
        </div>
        <FlipUnit value={m} label="Minutes" theme={theme} fontFamily={font.family} />
        <div className="flex flex-col gap-4 sm:gap-8 opacity-10 py-12 sm:py-20">
           <div className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${theme.accent} bg-current`} />
           <div className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${theme.accent} bg-current`} />
        </div>
        <FlipUnit value={s} label="Seconds" theme={theme} fontFamily={font.family} />
        {ampm && (
          <div className={`absolute top-0 right-0 sm:relative sm:top-0 sm:right-0 text-xl font-black opacity-30 mt-[-20px] ${theme.accent}`}>
            {ampm}
          </div>
        )}
      </div>

      {/* Bottom Overlay: Play/Reset Controls */}
      {(mode === Mode.TIMER || mode === Mode.POMODORO) && (
        <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-12 transition-all duration-700 ${uiVisible && !isLocked ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <button 
            onClick={() => setTimerActive(!timerActive)}
            className={`p-6 sm:p-8 rounded-full transition-all active:scale-90 ${theme.controlBg} ${theme.accent} hover:bg-black/10 border border-black/5 shadow-2xl group`}
          >
            {timerActive ? (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button 
            onClick={() => {
              setTimerActive(false);
              if (mode === Mode.TIMER) setTimerLeft(settings.timerDuration);
              else {
                 setTimerLeft(settings.pomoFocus * 60);
                 setPomoPhase('focus');
                 setPomoCycle(1);
              }
            }}
            className={`p-6 sm:p-8 rounded-full transition-all active:scale-90 ${theme.controlBg} ${theme.accent} hover:bg-black/10 border border-black/5 shadow-2xl group`}
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>
        </div>
      )}

      <Controls 
        mode={mode}
        setMode={setMode}
        settings={settings}
        updateSettings={updateSettings}
        visible={uiVisible}
        onEnter={() => setUiVisible(true)}
        locked={isLocked}
      />

      <div 
        className={`fixed bottom-0 right-0 w-48 h-48 z-[100] cursor-pointer group flex items-end justify-end p-8`}
        onClick={() => {
          setIsLocked(!isLocked);
          setUiVisible(false); // Hide immediately after clicking lock
        }}
        onMouseEnter={() => setUiVisible(true)}
      >
        <div className={`p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-2xl ${theme.cardBg} ${theme.cardText} border border-white/10
          opacity-0 group-hover:opacity-100
          ${(uiVisible && !isLocked) ? 'sm:opacity-100' : ''} 
          ${isLocked ? 'scale-90' : 'scale-100'}`}>
          
          {isLocked ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          ) : (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/></svg>
          )}

          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isLocked ? 'Unlock UI' : 'Lock UI'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;