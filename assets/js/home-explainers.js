(() => {
  'use strict';
  const root = document.getElementById('paper-explainers');
  const viewport = document.getElementById('home-explainer-track');
  const controls = document.getElementById('home-explainer-controls');
  const status = document.getElementById('home-explainer-status');
  if (!root || !viewport || !controls || !status) return;
  const slides = Array.from(viewport.querySelectorAll('.home-explainer-slide'));
  const choices = Array.from(controls.querySelectorAll('[data-explainer-index]'));
  const previous = controls.querySelector('[data-explainer-step="-1"]');
  const next = controls.querySelector('[data-explainer-step="1"]');
  const videos = slides.map(slide => slide.querySelector('video'));
  if (slides.length < 2 || choices.length !== slides.length || videos.some(video => !video) || !previous || !next) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let announced = 0;
  let settleTimer;
  const offset = index => slides[index].offsetLeft - slides[0].offsetLeft;
  const pauseAll = () => videos.forEach(video => video.pause());
  function setActive(index) {
    const focused = document.activeElement;
    if (index !== active && slides[active].contains(focused)) viewport.focus({ preventScroll: true });
    active = index;
    slides.forEach((slide, i) => {
      slide.inert = i !== active;
      slide.setAttribute('aria-hidden', String(i !== active));
    });
    choices.forEach((choice, i) => choice.setAttribute('aria-pressed', String(i === active)));
    previous.disabled = active === 0;
    next.disabled = active === slides.length - 1;
  }
  function settle() {
    clearTimeout(settleTimer);
    let nearest = 0;
    slides.forEach((slide, i) => {
      if (Math.abs(viewport.scrollLeft - offset(i)) < Math.abs(viewport.scrollLeft - offset(nearest))) nearest = i;
    });
    setActive(nearest);
    if (active !== announced) {
      status.textContent = `${slides[active].dataset.explainerLabel}, ${active + 1} of ${slides.length}`;
      announced = active;
    }
  }
  function choose(index) {
    if (index < 0 || index >= slides.length) return;
    if (index === active && Math.abs(viewport.scrollLeft - offset(index)) < 2) return;
    pauseAll();
    setActive(index);
    viewport.scrollTo({ left: offset(index), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 180);
  }
  choices.forEach((choice, i) => choice.addEventListener('click', () => choose(i)));
  previous.addEventListener('click', () => choose(active - 1));
  next.addEventListener('click', () => choose(active + 1));
  function navigate(event) {
    const targets = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const index = Math.max(0, Math.min(slides.length - 1, targets[event.key]));
    choose(index);
    if (controls.contains(event.target)) choices[index].focus();
  }
  controls.addEventListener('keydown', navigate);
  viewport.addEventListener('keydown', event => {
    // Leave native video, volume, seeking and link keyboard behavior alone.
    if (event.target === viewport) navigate(event);
  });
  viewport.addEventListener('scroll', () => {
    pauseAll();
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 180);
  }, { passive: true });
  viewport.addEventListener('scrollend', settle);
  videos.forEach((video, i) => video.addEventListener('play', () => {
    if (i !== active) { video.pause(); return; }
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
  function alignActive() {
    clearTimeout(settleTimer);
    viewport.scrollTo({ left: offset(active), behavior: 'auto' });
  }
  window.addEventListener('resize', alignActive);
  reducedMotion.addEventListener('change', alignActive);
  root.classList.add('is-carousel');
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-roledescription', 'carousel');
  viewport.setAttribute('aria-label', 'Paper explainer slides');
  slides.forEach(slide => slide.setAttribute('aria-roledescription', 'slide'));
  controls.hidden = false;
  setActive(0);
  // Reset a browser-restored scroll offset so Humanoid is the initial slide.
  alignActive();
})();
