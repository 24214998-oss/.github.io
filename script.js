(() => {
  'use strict';
  const links = [...document.querySelectorAll('.chapter-link')];
  const chapters = [...document.querySelectorAll('.report-chapter')];
  const progress = document.getElementById('reading-progress');
  const percent = document.getElementById('reading-percent');
  let queued = false;
  let previousActive = null;
  function updateReading() {
    const mobile = window.matchMedia('(max-width: 820px)').matches;
    const threshold = 180;
    let active = null;
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= threshold) active = chapter.id;
    }
    links.forEach(link => {
      const current = link.hash === '#' + active;
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    chapters.forEach(chapter => chapter.classList.toggle('is-current', chapter.id === active));
    if (mobile && active && active !== previousActive) {
      const currentLink = links.find(link => link.hash === '#' + active);
      const nav = currentLink.parentElement;
      const position = currentLink.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft;
      nav.scrollTo({left: position - (nav.clientWidth - currentLink.offsetWidth) / 2, behavior: 'auto'});
    }
    previousActive = active;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const value = maxScroll > 0 ? Math.round(Math.min(100, Math.max(0, window.scrollY / maxScroll * 100))) : 100;
    progress.value = value;
    progress.textContent = value + '%';
    percent.textContent = value + '%';
    document.documentElement.style.setProperty('--reading', String(value / 100));
    queued = false;
  }
  function scheduleUpdate() {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(updateReading);
    }
  }
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  updateReading();
})();
