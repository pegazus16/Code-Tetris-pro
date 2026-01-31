import { GAME_CONFIG, DIFFICULTY_SETTINGS } from '../utils/constants.js';
import { PROJECTS } from '../data/projects.js';
import { GameState } from './GameState.js';
import { Word } from './Word.js';
import { ParticleSystem } from '../effects/ParticleSystem.js';
import { UIManager } from '../ui/UIManager.js';
import AudioManager from '../audio/AudioManager.js';

export class Game {
  constructor() {
    this.state = new GameState();
    this.ui = new UIManager();
    this.particleSystem = new ParticleSystem(document.getElementById('particles'));

    this.activeWords = [];
    this.wordQueue = [];
    this.fallSpeed = 1;
    this.spawnInterval = GAME_CONFIG.MAX_SPAWN_INTERVAL;
    this.spawnTimeout = null;
    this.gameLoopId = null;

    this.currentLanguage = 'cpp';
    this.currentProject = 'basic';

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', () => this.start());
    document.getElementById('retryBtn').addEventListener('click', () => this.retry());
    document.getElementById('quitBtn').addEventListener('click', () => this.quit());
    document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
    document.getElementById('mainMenuBtn').addEventListener('click', () => this.quit());

    this.ui.elements.input.addEventListener('input', (e) => this.handleInput(e));

    window.addEventListener('touchend', () => {
      if (this.state.isRunning) {
        this.ui.focusInput();
      }
    });

    window.addEventListener('resize', () => this.handleResize());

    this.ui.elements.audioToggle.addEventListener('click', () => {
      const muted = AudioManager.toggleMute();
      this.ui.updateAudioButton(muted);
    });

    this.ui.elements.volumeRange.addEventListener('input', (e) => {
      AudioManager.setVolume(parseFloat(e.target.value));
    });
  }

  start() {
    this.clearGame();
    this.ui.hideMenu();
    this.ui.hideVictory();
    this.ui.hideGameOver();
    this.ui.focusInput();

    this.state.reset();
    this.ui.updateStats(this.state.getStats());

    const settings = this.ui.getSettings();
    this.currentLanguage = settings.language;
    this.currentProject = settings.project;

    this.ui.setLanguageClass(this.currentLanguage);
    this.particleSystem.setLanguage(this.currentLanguage);

    this.loadWordQueue();

    const difficultySettings = DIFFICULTY_SETTINGS[settings.difficulty] || DIFFICULTY_SETTINGS.medium;
    this.fallSpeed = difficultySettings.fallSpeed;
    this.spawnInterval = difficultySettings.spawnInterval;

    this.state.isRunning = true;
    this.startGameLoop();
    this.scheduleNextWord();
  }

  loadWordQueue() {
    const projectData = PROJECTS[this.currentLanguage]?.[this.currentProject];
    if (projectData) {
      this.wordQueue = [...projectData.flat()];
    } else {
      this.wordQueue = [...PROJECTS.cpp.basic.flat()];
    }
  }

  retry() {
    this.ui.hideGameOver();
    this.start();
  }

  quit() {
    location.reload();
  }

  nextLevel() {
    this.ui.hideVictory();
    this.state.levelUp();
    this.ui.updateStats(this.state.getStats());

    this.fallSpeed *= GAME_CONFIG.LEVEL_SPEED_INCREASE;
    this.spawnInterval = Math.max(
      GAME_CONFIG.MIN_LEVEL_INTERVAL,
      this.spawnInterval * GAME_CONFIG.LEVEL_INTERVAL_DECREASE
    );

    this.loadWordQueue();
    this.state.isRunning = true;

    this.ui.showLevelUp();

    setTimeout(() => {
      this.startGameLoop();
      this.scheduleNextWord();
    }, 900);

    AudioManager.play('level');
  }

  clearGame() {
    if (this.spawnTimeout) {
      clearTimeout(this.spawnTimeout);
      this.spawnTimeout = null;
    }

    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }

    this.activeWords.forEach(word => {
      try {
        word.remove();
      } catch (e) {}
    });

    this.activeWords = [];
    this.wordQueue = [];
    this.particleSystem.clear();
  }

  scheduleNextWord() {
    if (!this.state.isRunning) return;

    if (this.wordQueue.length > 0) {
      const text = this.wordQueue.shift();
      const word = new Word(text, this.ui.elements.game);
      word.setSpeed(this.fallSpeed);
      this.activeWords.push(word);
    }

    this.spawnInterval = Math.max(
      GAME_CONFIG.MIN_SPAWN_INTERVAL,
      this.spawnInterval * GAME_CONFIG.SPAWN_INTERVAL_DECAY
    );

    this.spawnTimeout = setTimeout(() => this.scheduleNextWord(), this.spawnInterval);
  }

  startGameLoop() {
    const loop = () => {
      if (!this.state.isRunning) return;

      for (let i = this.activeWords.length - 1; i >= 0; i--) {
        const word = this.activeWords[i];
        const isAlive = word.update();

        if (!isAlive || word.hasReachedBottom()) {
          this.state.loseLife();
          this.ui.updateStats(this.state.getStats());
          AudioManager.play('fail');

          word.remove();
          this.activeWords.splice(i, 1);

          if (this.state.isGameOver()) {
            this.gameOver();
            return;
          }
        }
      }

      if (this.wordQueue.length === 0 && this.activeWords.length === 0) {
        this.victory();
        return;
      }

      this.gameLoopId = requestAnimationFrame(loop);
    };

    this.gameLoopId = requestAnimationFrame(loop);
  }

  handleInput(e) {
    const value = e.target.value;

    if (!this.state.isRunning || this.activeWords.length === 0) {
      this.ui.clearInput();
      return;
    }

    const letter = value.slice(-1);
    const currentWord = this.activeWords[0];

    if (currentWord) {
      const result = currentWord.typeLetter(letter);

      this.state.recordTyping(result.matched);

      if (result.matched && result.completed) {
        this.state.incrementScore();
        this.state.incrementCombo();
        this.ui.updateStats(this.state.getStats());

        AudioManager.play('success');

        if (this.state.shouldPlayComboSound()) {
          AudioManager.play('combo');
        }

        const pos = currentWord.getPosition();
        this.particleSystem.spawn(pos.x, pos.y);

        currentWord.remove();
        this.activeWords.shift();
      } else if (!result.matched) {
        this.state.resetCombo();
        this.ui.updateStats(this.state.getStats());
        this.ui.flashInputError();
      }
    }

    this.ui.clearInput();
    this.ui.focusInput();
  }

  handleResize() {
    this.activeWords.forEach(word => {
      const maxX = Math.max(10, this.ui.elements.game.offsetWidth - (word.element?.offsetWidth || 80) - 30);
      word.x = Math.min(word.x, maxX);
      if (word.element) {
        word.element.style.left = word.x + 'px';
      }
    });
  }

  victory() {
    this.state.isRunning = false;
    AudioManager.play('level');
    this.ui.showVictory(this.state.getStats());
  }

  gameOver() {
    this.state.isRunning = false;
    AudioManager.play('fail');
    this.ui.showGameOver(this.state.getStats());
  }
}
