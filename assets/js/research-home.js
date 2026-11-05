(() => {
  'use strict';
  function setupReel() {
    const reel = document.querySelector('#research-reel');
    const toggle = document.querySelector('#reel-toggle');
    if (!reel || !toggle) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    let userPaused = false;
    let reelVisible = false;

    const syncPlayback = () => {
      const action = reel.paused ? 'Play' : 'Pause';
      toggle.innerHTML = `${action} <span aria-hidden="true">${reel.paused ? '▶' : 'Ⅱ'}</span>`;
      toggle.setAttribute('aria-label', `${action} research highlights`);
    };
    const playReel = () => { reel.play().catch(syncPlayback); };
    const canAutoplay = () => !reducedMotion.matches && !saveData && !userPaused && !document.hidden;
    toggle.addEventListener('click', () => {
      if (reel.paused) { userPaused = false; playReel(); }
      else { userPaused = true; reel.pause(); }
    });
    reel.addEventListener('play', syncPlayback);
    reel.addEventListener('pause', syncPlayback);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        reelVisible = entry.isIntersecting;
        if (reelVisible && canAutoplay()) playReel();
        else reel.pause();
      }), { threshold: 0.15 });
      observer.observe(reel);
    } else if (canAutoplay()) playReel();

    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) reel.pause(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) reel.pause();
      else if (reelVisible && canAutoplay()) playReel();
    });
    syncPlayback();
  }
  setupReel();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) entry.target.pause();
    }));
    document.querySelectorAll('.experiment-video').forEach(video => observer.observe(video));
  }
})();
