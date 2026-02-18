/**
 * Application operational modes
 */
export enum Mode {
  CLOCK = 'CLOCK',
  TIMER = 'TIMER',
  POMODORO = 'POMODORO'
}

/**
 * Visual styling definitions for the app
 */
export type Theme = {
  id: string;
  name: string;
  bg: string;         // Tailwind background class
  cardBg: string;     // Tailwind card background class
  cardText: string;   // Tailwind text color class
  accent: string;     // Tailwind accent/primary color
  controlBg: string;  // Tailwind background for floating bars
  shadow: string;     // Tailwind shadow class
  uiText: string;     // Text color for UI controls
  preview: string;    // Hex code for theme picker preview
};

/**
 * Typography definitions
 */
export type Font = {
  id: string;
  name: string;
  family: string;     // CSS font-family string
};

/**
 * Audio configuration for ticking sounds
 */
export type SoundSettings = {
  tickType: 'none' | 'flip' | 'soft' | 'mech' | 'digital';
  tickInterval: 'off' | '1s' | '1m' | '10m';
  tickVolume: number;
};

/**
 * Global application state settings
 */
export type AppSettings = {
  themeId: string;
  fontId: string;
  is24h: boolean;
  timerDuration: number; // Duration in seconds for TIMER mode
  pomoFocus: number;     // Focus duration in minutes
  pomoBreak: number;     // Break duration in minutes
  pomoCycles: number;    // Number of cycles before reset
  sound: SoundSettings;
};