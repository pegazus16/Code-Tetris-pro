export const GAME_CONFIG = {
  INITIAL_LIVES: 3,
  INITIAL_LEVEL: 1,
  POINTS_PER_WORD: 10,
  COMBO_MULTIPLIER: 2,
  COMBO_SOUND_INTERVAL: 5,
  MAX_SPAWN_INTERVAL: 2000,
  MIN_SPAWN_INTERVAL: 450,
  SPAWN_INTERVAL_DECAY: 0.98,
  LEVEL_SPEED_INCREASE: 1.08,
  LEVEL_INTERVAL_DECREASE: 0.93,
  MIN_LEVEL_INTERVAL: 400
};

export const DIFFICULTY_SETTINGS = {
  beginner: { fallSpeed: 0.7, spawnInterval: 2000 },
  easy: { fallSpeed: 1, spawnInterval: 2000 },
  medium: { fallSpeed: 1.3, spawnInterval: 2000 },
  hard: { fallSpeed: 1.6, spawnInterval: 2000 },
  expert: { fallSpeed: 2, spawnInterval: 2000 }
};

export const AUDIO_URLS = {
  type: "https://assets.mixkit.co/sfx/preview/mixkit-quick-positive-alert-955.mp3",
  error: "https://assets.mixkit.co/sfx/preview/mixkit-negative-tone-interface-tap-2569.mp3",
  success: "https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3",
  combo: "https://assets.mixkit.co/sfx/preview/mixkit-game-magic-coin-collect-1939.mp3",
  fail: "https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3",
  level: "https://assets.mixkit.co/sfx/preview/mixkit-melodic-win-sound-2019.mp3"
};

export const AUDIO_THROTTLE = {
  type: 45,
  error: 80,
  success: 120,
  combo: 300,
  fail: 400,
  level: 500
};

export const SYNTAX_TYPES = {
  keywords: ["int", "return", "def", "print", "function", "console.log", "cout", "let", "for", "if", "else", "while"],
  operators: ["<<", "=", "==", "+", "-", "*", "/", "++", "--", "+=", "-="]
};

export const LANGUAGE_COLORS = {
  cpp: { primary: '#7dd3fc', name: 'lang-cpp' },
  python: { primary: '#a78bfa', name: 'lang-python' },
  javascript: { primary: '#ffd166', name: 'lang-js' }
};

export const PARTICLE_CONFIG = {
  count: 10,
  minDistance: 18,
  maxDistance: 54,
  upwardBias: { min: 8, max: 20 },
  scaleRange: { min: 0.6, max: 1.4 },
  animationDuration: 920
};
