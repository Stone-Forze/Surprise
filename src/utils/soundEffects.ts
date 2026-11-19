// Web Audio API synthesizer for gentle royal chimes, harp arpeggios, and envelope reveal sounds
// Zero external audio files required; respects mute state and browser autoplay policies.

class RoyalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientInterval: number | null = null;
  private isAmbientPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbientChimes();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playSparkleChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [587.33, 739.99, 880, 1174.66, 1479.98]; // D5 major pentatonic sparkle
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.055);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + idx * 0.055 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.055 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.055);
      osc.stop(ctx.currentTime + idx * 0.055 + 0.48);
    });
  }

  public playPageTurn(direction: 'next' | 'prev' = 'next') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const baseFreq = direction === 'next' ? 523.25 : 440;
    const secondFreq = direction === 'next' ? 659.25 : 392;

    [baseFreq, secondFreq].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.065);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.065);
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + idx * 0.065 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.065 + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.065);
      osc.stop(ctx.currentTime + idx * 0.065 + 0.35);
    });
  }

  public playEnvelopeReveal() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Warm royal harp chord arpeggio
    const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const startTime = ctx.currentTime + idx * 0.075;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.07, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.95);
    });
  }

  public playCardTap() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(783.99, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.24);
  }

  public toggleAmbientMusic(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientChimes();
      return false;
    } else {
      this.isMuted = false;
      this.startAmbientChimes();
      return true;
    }
  }

  public startAmbientChimes() {
    if (this.isAmbientPlaying || typeof window === 'undefined') return;
    this.isAmbientPlaying = true;
    const scale = [440, 493.88, 554.37, 659.25, 739.99, 880];

    const playGentleNote = () => {
      if (!this.isAmbientPlaying || this.isMuted) return;
      const ctx = this.getContext();
      if (!ctx) return;

      const freq = scale[Math.floor(Math.random() * scale.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.022, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.85);
    };

    playGentleNote();
    this.ambientInterval = window.setInterval(playGentleNote, 1900);
  }

  public stopAmbientChimes() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval !== null) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const royalAudio = new RoyalAudioEngine();
