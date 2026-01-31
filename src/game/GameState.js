import { GAME_CONFIG } from '../utils/constants.js';

export class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.score = 0;
    this.lives = GAME_CONFIG.INITIAL_LIVES;
    this.level = GAME_CONFIG.INITIAL_LEVEL;
    this.combo = 0;
    this.maxCombo = 0;
    this.totalTyped = 0;
    this.correctTyped = 0;
    this.isRunning = false;
  }

  incrementScore(basePoints = GAME_CONFIG.POINTS_PER_WORD) {
    this.score += basePoints + (this.combo * GAME_CONFIG.COMBO_MULTIPLIER);
    return this.score;
  }

  incrementCombo() {
    this.combo++;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    return this.combo;
  }

  resetCombo() {
    this.combo = 0;
  }

  loseLife() {
    this.lives--;
    this.resetCombo();
    return this.lives;
  }

  levelUp() {
    this.level++;
    this.resetCombo();
    this.totalTyped = 0;
    this.correctTyped = 0;
    return this.level;
  }

  recordTyping(correct) {
    this.totalTyped++;
    if (correct) {
      this.correctTyped++;
    }
  }

  getAccuracy() {
    if (this.totalTyped === 0) return 0;
    return ((this.correctTyped / this.totalTyped) * 100).toFixed(1);
  }

  isGameOver() {
    return this.lives <= 0;
  }

  shouldPlayComboSound() {
    return this.combo % GAME_CONFIG.COMBO_SOUND_INTERVAL === 0 && this.combo > 0;
  }

  getStats() {
    return {
      score: this.score,
      lives: this.lives,
      level: this.level,
      combo: this.combo,
      maxCombo: this.maxCombo,
      accuracy: this.getAccuracy()
    };
  }
}
