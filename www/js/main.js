import { Game } from '../game/Game.js';
import AudioManager from '../audio/AudioManager.js';

document.addEventListener('DOMContentLoaded', () => {
  AudioManager.init();

  const game = new Game();

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  console.log('Code Tetris Pro v4.4 - Modular Edition');
});
