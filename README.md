# 🕰️ ZenFlip: Minimalist Flip Clock & Focus Suite

ZenFlip is a premium, distraction-free digital timepiece and focus tool. It combines a classic flip-clock aesthetic with a high-precision Timer and a Pomodoro productivity engine.

## ✨ Key Features
- **3-in-1 Versatility**: Seamlessly switch between a Real-time Clock, Countdown Timer, and Pomodoro system.
- **Modern "No-Build" Architecture**: Uses Native ES Modules and Import Maps. No Node.js or build steps required—just host the files and it works.
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
This project is pre-configured for GitHub Pages.
1. **Push** these files to the root of a GitHub repository.
2. Go to **Settings > Pages**.
3. Select the `main` branch as the source and click **Save**.
4. Your clock is now live at `https://<username>.github.io/<repo-name>/`.

## 📂 File Structure
- `App.tsx`: The central hub for state, logic, and layout.
- `components/`: Modular UI pieces (FlipUnit, FlipDigit, Controls).
- `constants.ts`: Design tokens (Themes, Fonts).
- `types.ts`: Strongly typed interfaces for the entire app.
- `services/`: Core logic engines like the `SoundManager`.

---
*Created with a focus on performance, aesthetics, and simplicity.*