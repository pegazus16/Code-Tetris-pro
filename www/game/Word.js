import { SYNTAX_TYPES } from '../utils/constants.js';
import AudioManager from '../audio/AudioManager.js';

export class Word {
  constructor(text, gameContainer) {
    this.text = text;
    this.remaining = text;
    this.gameContainer = gameContainer;
    this.x = 0;
    this.y = -48;
    this.speed = 1;
    this.element = null;
    this.removed = false;

    this.createElement();
    this.positionWord();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.className = 'word';
    this.element.style.color = this.getColorForWord(this.text);
    this.element.innerText = this.text;
    this.gameContainer.appendChild(this.element);
  }

  getColorForWord(text) {
    if (SYNTAX_TYPES.keywords.includes(text)) {
      return "#ff6b9d";
    } else if (SYNTAX_TYPES.operators.includes(text)) {
      return "#6bcf7f";
    }
    return "#0ff";
  }

  positionWord() {
    const maxX = Math.max(10, this.gameContainer.offsetWidth - this.element.offsetWidth - 30);
    this.x = Math.random() * maxX + 15;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  update() {
    if (this.removed) return false;

    this.y += this.speed;
    this.element.style.top = this.y + 'px';

    return this.y <= this.gameContainer.offsetHeight - 24;
  }

  hasReachedBottom() {
    return this.y > this.gameContainer.offsetHeight - 24;
  }

  typeLetter(letter) {
    if (this.removed) return { matched: false, completed: false };

    const matched = this.remaining.startsWith(letter);

    if (matched) {
      this.remaining = this.remaining.slice(1);
      this.element.innerText = this.remaining;
      this.element.classList.add('glow');
      setTimeout(() => this.element.classList.remove('glow'), 200);
      AudioManager.play('type');

      if (this.remaining.length === 0) {
        return { matched: true, completed: true };
      }
      return { matched: true, completed: false };
    }

    AudioManager.play('error');
    return { matched: false, completed: false };
  }

  getPosition() {
    if (!this.element) return { x: 0, y: 0 };

    const rect = this.element.getBoundingClientRect();
    const gameRect = this.gameContainer.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2 - gameRect.left,
      y: rect.top + rect.height / 2 - gameRect.top
    };
  }

  remove() {
    if (this.removed) return;
    this.removed = true;

    if (!this.element || !this.element.parentNode) return;

    this.element.classList.add('fade-out');
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.remove();
      }
    }, 420);
  }
}
