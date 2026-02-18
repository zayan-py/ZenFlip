
import { Theme, Font } from './types';

export const THEMES: Theme[] = [
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
    preview: '#18181b'
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
    shadow: 'shadow-lg shadow-black/10',
    preview: '#000000'
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
    preview: '#ec4899'
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
    preview: '#3b82f6'
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
    preview: '#10b981'
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
    shadow: 'shadow-orange-200/50',
    preview: '#ffedd5'
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
    preview: '#f59e0b'
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
    shadow: 'shadow-zinc-300',
    preview: '#d4d4d8'
  }
];

export const FONTS: Font[] = [
  { id: 'jb-mono', name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', cursive" },
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'rob-mono', name: 'Roboto Mono', family: "'Roboto Mono', monospace" }
];
