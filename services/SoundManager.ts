/**
 * SoundManager Service
 * A singleton class that handles real-time audio synthesis for ticking and alarms.
 * Uses the Web Audio API to generate tones without needing external assets.
 */
class SoundManager {
  private context: AudioContext | null = null;

  /**
   * Lazy-loads and resumes the AudioContext to comply with browser autoplay policies.
   */
  private async getContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    return this.context;
  }

  /**
   * Generates a short percussive tone based on the selected tick style.
   * @param type - The synthesis preset to use
   * @param volume - Normalized volume level (0 to 1)
   */
  async playTick(type: string, volume: number) {
    if (type === 'none') return;
    const ctx = await this.getContext();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    
    switch (type) {
      case 'soft':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        break;
      case 'mech':
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        break;
      case 'flip':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        break;
      case 'digital':
      default:
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
    }

    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  /**
   * Triggers a triplet beep sequence for timer completions.
   */
  async playAlarm() {
    const ctx = await this.getContext();
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(880, ctx.currentTime + i * 0.4);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.4 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.4);
      osc.stop(ctx.currentTime + i * 0.4 + 0.2);
    }
  }
}

export const soundManager = new SoundManager();