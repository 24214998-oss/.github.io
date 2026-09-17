(() => {
  'use strict';
  const root = document.documentElement;
  const motionButton = document.getElementById('motion-toggle');
  const motionLabel = document.getElementById('motion-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const panels = [...document.querySelectorAll('.visual-panel')];
  const runningAnimations = new Set();
  const elementAnimations = new WeakMap();
  const panelTimers = new Map();
  const panelFrames = new Map();
  let motionEnabled = !reducedMotion.matches;

  function animate(element, keyframes, options) {
    if (!motionEnabled || typeof element.animate !== 'function') return;
    const previous = elementAnimations.get(element);
    if (previous) previous.cancel();
    const animation = element.animate(keyframes, options);
    runningAnimations.add(animation);
    elementAnimations.set(element, animation);
    animation.onfinish = animation.oncancel = () => {
      runningAnimations.delete(animation);
      if (elementAnimations.get(element) === animation) elementAnimations.delete(element);
    };
  }
  function clearPanel(panel) {
    clearTimeout(panelTimers.get(panel));
    window.cancelAnimationFrame(panelFrames.get(panel));
    panelTimers.delete(panel);
    panelFrames.delete(panel);
    panel.classList.remove('diagram-playing');
  }
  function playPanel(panel) {
    if (!motionEnabled) return;
    clearPanel(panel);
    panelFrames.set(panel, window.requestAnimationFrame(() => {
      panelFrames.delete(panel);
      if (!motionEnabled) return;
      panel.classList.add('diagram-playing');
      const nodes = [...panel.querySelectorAll('.org-root, .org-project, .org-dept > div, .cost-steps li')];
      nodes.forEach((node, index) => animate(node, [
        {opacity: .6, transform: 'translateY(9px)'},
        {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 520, delay: index * 135, easing: 'cubic-bezier(.22,1,.36,1)'}));
      panelTimers.set(panel, setTimeout(() => clearPanel(panel), 2000));
    }));
  }
  function setMotion(enabled) {
    motionEnabled = enabled && !reducedMotion.matches;
    root.dataset.motion = motionEnabled ? 'on' : 'off';
    motionButton.hidden = false;
    motionButton.setAttribute('aria-pressed', String(motionEnabled));
    motionLabel.textContent = motionEnabled ? '动效开启' : '动效关闭';
    motionButton.disabled = reducedMotion.matches;
    motionButton.title = reducedMotion.matches ? '已跟随系统的减少动态效果设置' : '切换界面动效';
    panels.forEach(panel => {
      const button = panel.querySelector('.diagram-replay');
      button.hidden = false;
      button.disabled = !motionEnabled;
      if (!motionEnabled) clearPanel(panel);
    });
    if (!motionEnabled) {
      [...runningAnimations].forEach(animation => animation.cancel());
      document.querySelectorAll('.map-grid > a').forEach(card => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    }
  }

  setMotion(motionEnabled);
  motionButton.addEventListener('click', () => setMotion(!motionEnabled));
  reducedMotion.addEventListener('change', () => setMotion(!reducedMotion.matches));
  panels.forEach(panel => {
    const button = panel.querySelector('.diagram-replay');
    button.setAttribute('aria-label', '重新播放' + panel.querySelector('figcaption > span:nth-child(2)').textContent + '图示动效');
    button.addEventListener('click', () => playPanel(panel));
  });

  // No content is hidden while waiting for JavaScript or an observer.
  // Each entrance animation runs at most once during normal scrolling.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (entry.target.classList.contains('visual-panel')) {
          playPanel(entry.target);
        } else {
          animate(entry.target, [
            {opacity: .72, transform: 'translateY(16px)'},
            {opacity: 1, transform: 'translateY(0)'}
          ], {duration: 600, easing: 'cubic-bezier(.22,1,.36,1)'});
        }
      });
    }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
    document.querySelectorAll('.eyebrow, h1, .report-meta, .map-grid > a, .chapter-heading, .key-paragraph, .visual-panel, .reflection-part h3, .service-idea, .observation-photo').forEach(element => observer.observe(element));
  }

  document.querySelectorAll('.map-grid > a').forEach(card => {
    let pointerFrame = 0;
    card.addEventListener('pointermove', event => {
      if (!motionEnabled || !finePointer.matches) return;
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        if (!motionEnabled) return;
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        card.style.setProperty('--pointer-x', (x * 100).toFixed(2) + '%');
        card.style.setProperty('--pointer-y', (y * 100).toFixed(2) + '%');
        card.style.setProperty('--tilt-x', ((.5 - y) * 3).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', ((x - .5) * 3).toFixed(2) + 'deg');
      });
    });
    card.addEventListener('pointerleave', () => {
      window.cancelAnimationFrame(pointerFrame);
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
  window.addEventListener('beforeprint', () => {
    [...runningAnimations].forEach(animation => animation.cancel());
    panels.forEach(clearPanel);
  });
})();
