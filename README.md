# 🕰️ ZenFlip: Minimalist Flip Clock & Focus Suite

ZenFlip is a premium, distraction-free digital timepiece and focus tool. It combines a classic flip-clock aesthetic with a high-precision Timer and a Pomodoro productivity engine.

## ✨ Key Features
- **3-in-1 Versatility**: Seamlessly switch between a Real-time Clock, Countdown Timer, and Pomodoro system.
- **Modern React & Vite**: Built with React 19 and Vite for optimal performance and development experience.
- **Dynamic Themes**: 8 custom-designed themes including AMOLED Black, Retro Amber, and Forest Green.
- **Ambient Audio**: High-quality synthesized "ticks" (Digital, Mechanical, Soft, Flip) to enhance focus.
- **Stealth Mode**: UI controls and the mouse cursor auto-hide during inactivity for a zero-distraction environment.
- **Accessibility & UX**: Full-screen support, keyboard shortcuts, and responsive design for all devices.

## ⌨️ Keyboard Shortcuts
| Key | Action |
| :--- | :--- |
| `Space` | Start / Pause Timer & Pomodoro |
| `R` | Reset Timer / Restart Pomodoro Cycle |
| `F` | Toggle Fullscreen |

## 🚀 Hosting on GitHub Pages

This project uses Vite and requires a build step before deployment. Follow these steps:

### Quick Deploy
```bash
npm install        # Install dependencies
npm run deploy     # Build and deploy to GitHub Pages
```

### Manual Steps
1. **Clone and Setup**: Clone this repository and install dependencies
   ```bash
   git clone https://github.com/<username>/ZenFlip.git
   cd ZenFlip
   npm install
   ```

2. **Build**: Generate the production files
   ```bash
   npm run build
   ```
   This creates a `dist` folder with the optimized static files.

3. **Deploy**: Push the `dist` folder to GitHub Pages
   ```bash
   npm run deploy
   ```
   This automatically deploys the built files to the `gh-pages` branch.

4. **Enable GitHub Pages**:
   - Go to your repository **Settings > Pages**
   - Select `gh-pages` branch as the source
   - Click **Save**
   - Your clock will be live at `https://<username>.github.io/ZenFlip/`

### Local Development
Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000/ZenFlip/`

## 📂 File Structure
- `App.tsx`: The central hub for state, logic, and layout.
- `components/`: Modular UI pieces (FlipUnit, FlipDigit, Controls).
- `constants.ts`: Design tokens (Themes, Fonts).
- `types.ts`: Strongly typed interfaces for the entire app.
- `services/`: Core logic engines like the `SoundManager`.

---
*Created with a focus on performance, aesthetics, and simplicity.*