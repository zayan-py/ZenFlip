
/**
 * Operational modes available in the application.
 */
export enum Mode {
  CLOCK = 'CLOCK',
  TIMER = 'TIMER',
  POMODORO = 'POMODORO',
  STOPWATCH = 'STOPWATCH'
}

/**
 * Defines the visual identity of the application.
 */
export type Theme = {
  id: string;
  name: string;
  bg: string;         // Tailwind CSS background class
  cardBg: string;     // Tailwind CSS card color class
  cardText: string;   // Tailwind CSS text color class
  accent: string;     // Tailwind CSS primary accent color
  controlBg: string;  // Background for floating UI panels
  shadow: string;     // Shadow depth configuration
  uiText: string;     // Text color for secondary UI labels
  preview: string;    // Hex code for the theme selector preview
  isLight?: boolean;  // Flag for light mode specific logic
};

/**
 * Typography configuration for the clock digits.
 */
export type Font = {
  id: string;
  name: string;
  family: string;     // CSS Font Family property
};

/**
 * Audio feedback configuration.
 */
export type SoundSettings = {
  /** The type of sound produced on every second/tick */
  tickType: 'none' | 'flip' | 'soft' | 'mech' | 'digital';
  /** How often the audio feedback occurs in Clock mode */
  tickInterval: 'off' | '1s' | '1m' | '10m';
  /** Normalized volume level (0.0 to 1.0) */
  tickVolume: number;
};

/**
 * Root configuration state for the application.
 */
export type AppSettings = {
  themeId: string;
  fontId: string;
  is24h: boolean;
  /** Custom duration for Timer mode (in seconds) */
  timerDuration: number;
  /** Focus duration for Pomodoro (in minutes) */
  pomoFocus: number;
  /** Break duration for Pomodoro (in minutes) */
  pomoBreak: number;
  /** Number of focus sessions per full cycle */
  pomoCycles: number;
  sound: SoundSettings;
};
