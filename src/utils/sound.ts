// Lightweight Web Audio API retro arcade sound synthesiser (zero external audio files)
let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function isSoundEnabled(explicit?: boolean): boolean {
  if (explicit !== undefined) return explicit;
  if (typeof window !== "undefined") {
    return localStorage.getItem("orb_sound") !== "false";
  }
  return true;
}

export const sound = {
  // Classic 2-tone arcade coin ping (B5 -> E6)
  coin: (enabled?: boolean) => {
    if (!isSoundEnabled(enabled)) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.setValueAtTime(0.22, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio autoplay policy or unsupported
    }
  },

  isEnabled: (): boolean => isSoundEnabled(),

  // Toggle sound prompt (C5 -> E5 on, E5 -> A4 off)
  toggle: (isOn?: boolean): boolean => {
    const next = isOn !== undefined ? isOn : !isSoundEnabled();
    if (typeof window !== "undefined") {
      localStorage.setItem("orb_sound", String(next));
    }
    try {
      const ctx = getContext();
      if (!ctx) return next;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (next) {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.07);
      } else {
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(440, now + 0.07);
      }

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
    return next;
  },

  // Ascending 4-note arcade fanfare for pack pulls
  packOpen: (enabled?: boolean) => {
    if (!isSoundEnabled(enabled)) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.14, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.22);
      });
    } catch {}
  },
};
