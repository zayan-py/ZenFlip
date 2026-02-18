
import { Theme, Font } from './types';

/**
 * Collection of curated color themes.
 * Themes are assorted into Dark and Light groups.
 */
export const THEMES: Theme[] = [
  // --- DARK THEMES ---
  {
    id: 'amoled',
    name: 'AMOLED Black',
    bg: 'bg-black',
    cardBg: 'bg-zinc-900',
    cardText: 'text-zinc-100',
    accent: 'text-white',
    controlBg: 'bg-zinc-900/50',
    uiText: 'text-zinc-400',
    shadow: 'shadow-2xl shadow-zinc-900/50',
    preview: '#18181b',
    isLight: false
  },
  {
    id: 'pink',
    name: 'Cyber Pink',
    bg: 'bg-zinc-950',
    cardBg: 'bg-zinc-900',
    cardText: 'text-pink-500',
    accent: 'text-pink-400',
    controlBg: 'bg-pink-900/20',
    uiText: 'text-pink-400',
    shadow: 'shadow-pink-500/10',
    preview: '#ec4899',
    isLight: false
  },
  {
    id: 'blue',
    name: 'Midnight Blue',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    cardText: 'text-blue-200',
    accent: 'text-blue-400',
    controlBg: 'bg-blue-900/30',
    uiText: 'text-blue-400',
    shadow: 'shadow-blue-500/20',
    preview: '#3b82f6',
    isLight: false
  },
  {
    id: 'green',
    name: 'Forest Green',
    bg: 'bg-stone-950',
    cardBg: 'bg-emerald-950',
    cardText: 'text-emerald-100',
    accent: 'text-emerald-500',
    controlBg: 'bg-emerald-900/20',
    uiText: 'text-emerald-400',
    shadow: 'shadow-emerald-500/20',
    preview: '#10b981',
    isLight: false
  },
  {
    id: 'amber',
    name: 'Retro Amber',
    bg: 'bg-zinc-950',
    cardBg: 'bg-zinc-900',
    cardText: 'text-amber-500',
    accent: 'text-amber-600',
    controlBg: 'bg-amber-900/20',
    uiText: 'text-amber-400',
    shadow: 'shadow-amber-500/20',
    preview: '#f59e0b',
    isLight: false
  },
  // --- LIGHT THEMES ---
  {
    id: 'sky',
    name: 'Sky Blue',
    bg: 'bg-sky-400',
    cardBg: 'bg-white',
    cardText: 'text-sky-900',
    accent: 'text-sky-800',
    controlBg: 'bg-white/40',
    uiText: 'text-sky-950',
    shadow: 'shadow-none',
    preview: '#38bdf8',
    isLight: true
  },
  {
    id: 'bw',
    name: 'Black & White',
    bg: 'bg-white',
    cardBg: 'bg-black',
    cardText: 'text-white',
    accent: 'text-black',
    controlBg: 'bg-black/5',
    uiText: 'text-black',
    shadow: 'shadow-none',
    preview: '#ffffff',
    isLight: true
  },
  {
    id: 'lavender',
    name: 'Soft Lavender',
    bg: 'bg-purple-50',
    cardBg: 'bg-purple-100',
    cardText: 'text-purple-900',
    accent: 'text-purple-700',
    controlBg: 'bg-purple-200/50',
    uiText: 'text-purple-800',
    shadow: 'shadow-none',
    preview: '#e9d5ff',
    isLight: true
  },
  {
    id: 'beige',
    name: 'Warm Beige',
    bg: 'bg-orange-50',
    cardBg: 'bg-orange-100',
    cardText: 'text-orange-950',
    accent: 'text-orange-800',
    controlBg: 'bg-orange-200/50',
    uiText: 'text-orange-900',
    shadow: 'shadow-none',
    preview: '#ffedd5',
    isLight: true
  },
  {
    id: 'grey',
    name: 'Minimal Grey',
    bg: 'bg-zinc-100',
    cardBg: 'bg-zinc-300',
    cardText: 'text-zinc-800',
    accent: 'text-zinc-600',
    controlBg: 'bg-zinc-400/20',
    uiText: 'text-zinc-900',
    shadow: 'shadow-none',
    preview: '#d4d4d8',
    isLight: true
  }
];

/**
 * Collection of available clock fonts.
 * These rely on imports from Google Fonts in index.html.
 */
export const FONTS: Font[] = [
  { id: 'rob-mono', name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
  { id: 'jb-mono', name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', cursive" },
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" }
];
