import { AUDIO_URLS, AUDIO_THROTTLE } from '../utils/constants.js';

class AudioManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
    this.volume = parseFloat(localStorage.getItem("volume") || "0.5");
    this.lastPlayed = {};
    this.minInterval = AUDIO_THROTTLE;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    try {
      for (const [key, url] of Object.entries(AUDIO_URLS)) {
        const audio = new Audio(url);
        audio.volume = this.volume;
        audio.preload = 'auto';
        this.sounds[key] = audio;
        this.lastPlayed[key] = 0;
      }
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  play(name) {
    if (this.muted || !this.initialized) return;

    const now = Date.now();
    const last = this.lastPlayed[name] || 0;
    const minInterval = this.minInterval[name] || 60;

    if (now - last < minInterval) return;

    const sound = this.sounds[name];
    if (!sound) return;

    try {
      sound.currentTime = 0;
      sound.volume = this.volume;
      sound.play().catch(() => {});
      this.lastPlayed[name] = now;
    } catch (error) {
      console.error(`Failed to play sound ${name}:`, error);
    }
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    localStorage.setItem("volume", this.volume);

    for (const audio of Object.values(this.sounds)) {
      audio.volume = this.volume;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  getMuted() {
    return this.muted;
  }

  getVolume() {
    return this.volume;
  }
}

export default new AudioManager();
