
export enum Mode {
  CLOCK = 'CLOCK',
  TIMER = 'TIMER',
  POMODORO = 'POMODORO'
}

export type Theme = {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  cardText: string;
  accent: string;
  controlBg: string;
  shadow: string;
  uiText: string;
  preview: string; // Specific CSS color for settings circles
};

export type Font = {
  id: string;
  name: string;
  family: string;
};

export type SoundSettings = {
  tickType: 'none' | 'flip' | 'soft' | 'mech' | 'digital';
  tickInterval: 'off' | '1s' | '1m' | '10m';
  tickVolume: number;
};

export type AppSettings = {
  themeId: string;
  fontId: string;
  is24h: boolean;
  timerDuration: number; // in seconds
  pomoFocus: number; // in minutes
  pomoBreak: number; // in minutes
  pomoCycles: number;
  sound: SoundSettings;
};
