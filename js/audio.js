/* ==========================================================================
   NANAS RUMAH SPONGEBOB DIGITAL - AUDIO & SOUND ENGINE
   Web Audio API Synthesizer & Speech Synthesis
   No external audio files required! 100% reliable, standalone & lightweight.
   ========================================================================== */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.synth = window.speechSynthesis || null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setVoiceEnabled(enabled) {
    this.voiceEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  // Token Pickup / Click (Pop)
  playPop() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Token Drop / Snap
  playSnap() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.1);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Penguin Squeak / Happy Chirp
  playPenguinChirp() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Osc 1 - chirp
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);

    // Osc 2 - second harmonic chirp
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1600, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.2);

    gain2.gain.setValueAtTime(0.2, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.23);
  }

  // Whoosh through Jalur Simpan
  playWhoosh() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.15);
    osc.frequency.linearRampToValueAtTime(500, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.31);
  }

  // Carry Slot Magic Chime
  playCarryPlaced() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.26);
    });
  }

  // Keypad click
  playKeyClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Gentle boing on error
  playErrorBounce() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.21);
  }

  // Success celebration fanfare
  playSuccessFanfare() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const chord = [
      { f: 523.25, t: 0 },    // C5
      { f: 659.25, t: 0.1 },  // E5
      { f: 783.99, t: 0.2 },  // G5
      { f: 1046.50, t: 0.35 } // C6
    ];

    const now = this.ctx.currentTime;

    chord.forEach((item) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + item.t;
      const duration = item.t === 0.35 ? 0.6 : 0.25;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  }

  // Indonesian voice narration
  speak(text) {
    if (!this.voiceEnabled || !this.synth) return;
    
    try {
      this.synth.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // friendly tone

      // Try finding Indonesian voice if available
      const voices = this.synth.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('Indonesian'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }
}

window.soundEngine = new SoundEngine();
