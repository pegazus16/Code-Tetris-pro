export class UIManager {
  constructor() {
    this.elements = {
      menu: document.getElementById('menu'),
      game: document.getElementById('game'),
      input: document.getElementById('input'),
      score: document.getElementById('score'),
      lives: document.getElementById('lives'),
      level: document.getElementById('level'),
      combo: document.getElementById('combo'),
      gameOverScreen: document.getElementById('gameOverScreen'),
      victoryScreen: document.getElementById('victoryScreen'),
      levelUpOverlay: document.getElementById('levelUpOverlay'),
      audioToggle: document.getElementById('audioToggle'),
      volumeRange: document.getElementById('volumeRange')
    };

    this.selects = {
      difficulty: document.getElementById('difficulty'),
      language: document.getElementById('language'),
      project: document.getElementById('project')
    };
  }

  showMenu() {
    this.elements.menu.style.display = 'flex';
  }

  hideMenu() {
    this.elements.menu.style.display = 'none';
  }

  showGameOver(stats) {
    document.getElementById('finalScore').innerText = `Score : ${stats.score}`;
    document.getElementById('finalLevel').innerText = `Niveau : ${stats.level}`;
    document.getElementById('finalCombo').innerText = `Combo max : ${stats.maxCombo}`;
    document.getElementById('finalAccuracy').innerText = `Precision : ${stats.accuracy}%`;

    setTimeout(() => {
      this.elements.gameOverScreen.style.display = 'flex';
    }, 420);
  }

  hideGameOver() {
    this.elements.gameOverScreen.style.display = 'none';
  }

  showVictory(stats) {
    document.getElementById('victoryScore').innerText = `Score : ${stats.score}`;
    document.getElementById('victoryCombo').innerText = `Combo max : ${stats.maxCombo}`;
    document.getElementById('victoryAccuracy').innerText = `Precision : ${stats.accuracy}%`;

    setTimeout(() => {
      this.elements.victoryScreen.style.display = 'flex';
    }, 520);
  }

  hideVictory() {
    this.elements.victoryScreen.style.display = 'none';
  }

  showLevelUp() {
    this.elements.levelUpOverlay.style.display = 'flex';
    setTimeout(() => {
      this.elements.levelUpOverlay.style.display = 'none';
    }, 900);
  }

  updateStats(stats) {
    this.elements.score.innerText = stats.score;
    this.elements.lives.innerText = stats.lives;
    this.elements.level.innerText = stats.level;
    this.elements.combo.innerText = stats.combo;
  }

  getSettings() {
    return {
      difficulty: this.selects.difficulty.value,
      language: this.selects.language.value,
      project: this.selects.project.value
    };
  }

  setLanguageClass(language) {
    this.elements.game.classList.remove('lang-cpp', 'lang-python', 'lang-js');

    const classMap = {
      cpp: 'lang-cpp',
      python: 'lang-python',
      javascript: 'lang-js'
    };

    const className = classMap[language] || 'lang-cpp';
    this.elements.game.classList.add(className);
  }

  focusInput() {
    this.elements.input.focus();
  }

  clearInput() {
    this.elements.input.value = '';
  }

  flashInputError() {
    this.elements.input.style.borderColor = '#f00';
    setTimeout(() => {
      this.elements.input.style.borderColor = '#0ff';
    }, 160);
  }

  updateAudioButton(muted) {
    this.elements.audioToggle.textContent = muted ? '🔇' : '🔊';
  }

  setVolume(volume) {
    this.elements.volumeRange.value = volume;
  }
}
