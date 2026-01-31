import { PARTICLE_CONFIG, LANGUAGE_COLORS } from '../utils/constants.js';

export class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.currentLanguage = 'cpp';
  }

  setLanguage(language) {
    this.currentLanguage = language;
  }

  getColorForLanguage() {
    const colors = {
      cpp: 'rgba(125,211,252,0.95)',
      python: 'rgba(167,139,250,0.95)',
      javascript: 'rgba(255,209,102,0.95)'
    };
    return colors[this.currentLanguage] || colors.cpp;
  }

  spawn(x, y, count = PARTICLE_CONFIG.count) {
    const color = this.getColorForLanguage();

    for (let i = 0; i < count; i++) {
      this.createParticle(x, y, color);
    }
  }

  createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.background = color;
    particle.style.boxShadow = `0 0 6px ${color}`;
    this.container.appendChild(particle);

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = PARTICLE_CONFIG.minDistance + Math.random() * (PARTICLE_CONFIG.maxDistance - PARTICLE_CONFIG.minDistance);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - (PARTICLE_CONFIG.upwardBias.min + Math.random() * (PARTICLE_CONFIG.upwardBias.max - PARTICLE_CONFIG.upwardBias.min));
    const scale = PARTICLE_CONFIG.scaleRange.min + Math.random() * (PARTICLE_CONFIG.scaleRange.max - PARTICLE_CONFIG.scaleRange.min);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      try {
        particle.remove();
      } catch (e) {}
    }, PARTICLE_CONFIG.animationDuration);
  }

  clear() {
    this.container.innerHTML = '';
  }
}
