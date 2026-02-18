# ZenFlip: Minimalist Flip Clock & Focus

A premium, distraction-free flip clock, timer, and pomodoro web application. Built with React 19, Tailwind CSS, and Framer Motion.

## 🚀 "No-Build" Architecture
This project is unique because it uses **Native ES Modules** and an **Import Map**. 
- **No Node.js/NPM required** for basic hosting.
- **No Build Step**: The browser handles the JSX/TSX transformation (in this environment) or you can serve it as-is if using a standard JS setup.
- **GitHub Pages Ready**: Upload the files directly to your repository and enable Pages in the settings.

## 🛠 Features
- **3 Modes**: Classic Clock (12h/24h), Precision Timer, and Pomodoro.
- **Customizable**: 8+ Themes (including AMOLED and Retro Amber) and various fonts (Roboto Mono, JetBrains Mono, etc.).
- **Ambient Audio**: Digital, Mechanical, Soft, and Flip-style ticking sounds.
- **Stealth UI**: The interface and mouse cursor automatically hide during focus sessions.
- **Locked Mode**: Prevent UI distractions with a corner-lock feature.
- **High-Precision**: Timer supports centisecond accuracy for a smooth flip animation.

## ⌨️ Keyboard Shortcuts
- `Space`: Start / Pause Timer or Pomodoro.
- `R`: Reset Timer / Restart Pomodoro cycle.
- `F`: Toggle Fullscreen mode.

## 📂 Project Structure
- `index.html`: Entry point with Import Map for dependencies.
- `App.tsx`: Main application logic, state management, and layout.
- `components/`: UI components (FlipUnit, FlipDigit, Controls).
- `services/`: Core logic (SoundManager).
- `constants.ts`: Theme and Font definitions.
- `types.ts`: TypeScript interfaces and Enums.