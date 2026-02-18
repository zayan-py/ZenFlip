# 🕰️ ZenFlip: Minimalist Flip Clock & Focus Suite

ZenFlip is a premium, distraction-free digital timepiece and focus tool. It combines a classic flip-clock aesthetic with a high-precision Timer and a Pomodoro productivity engine.

## 🚀 How to Host on GitHub Pages
Because browsers cannot read `.tsx` files directly, you must "build" the project first.

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Setup
1. Clone your repository to your local computer.
2. Open your terminal/command prompt in the project folder.
3. Run `npm install` to download all necessary libraries.

### 3. Deployment
1. Open `vite.config.ts` and ensure `base: './'` is set (or `base: '/your-repo-name/'` if hosting on a subpath).
2. Run `npm run deploy`.
3. This will automatically build the app and push it to a `gh-pages` branch on your GitHub.
4. Go to your GitHub Repository Settings > Pages and ensure the source is set to the `gh-pages` branch.

## ✨ Features
- **3-in-1 Versatility**: Seamlessly switch between Clock, Timer, and Pomodoro.
- **Dynamic Themes**: 8 custom themes (AMOLED, Retro Amber, Forest, etc.).
- **Ambient Audio**: High-quality "ticks" using Web Audio synthesis.
- **Stealth Mode**: UI auto-hides during focus sessions.

## ⌨️ Keyboard Shortcuts
- `Space`: Start / Pause
- `R`: Reset
- `F`: Fullscreen

---
*Built with React 19, Vite, and Framer Motion.*