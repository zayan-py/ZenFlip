
class SoundManager {
  private context: AudioContext | null = null;

  private async getContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    return this.context;
  }

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
      default:
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
    }

    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

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
