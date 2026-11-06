(() => {
  'use strict';
  const selector = document.getElementById('home-explainer-selector');
  const payload = document.getElementById('home-explainers-data');
  const video = document.getElementById('home-explainer-video');
  const source = document.getElementById('home-explainer-source');
  if (!selector || !payload || !video || !source) return;
  let entries;
  try { entries = JSON.parse(payload.textContent); } catch (error) { return; }
  const items = new Map(entries.map(entry => [entry.id, entry]));
  const buttons = Array.from(selector.querySelectorAll('[data-home-explainer]'));
  let selected = video.dataset.explainerId;
  function select(id) {
    const entry = items.get(id);
    if (!entry || id === selected) return;
    video.pause();
    video.querySelectorAll('track').forEach(track => track.remove());
    source.src = entry.video;
    video.poster = entry.poster;
    video.setAttribute('aria-label', `${entry.seconds}-second narrated explainer: ${entry.paperTitle}`);
    if (entry.captions) {
      const track = document.createElement('track');
      track.kind = 'captions';
      track.src = entry.captions;
      track.srclang = 'en';
      track.label = 'English';
      track.default = true;
      video.append(track);
    }
    video.load();
    document.getElementById('home-explainer-meta').textContent = `${entry.venue} ${entry.year} · ${entry.duration}`;
    document.getElementById('home-explainer-title').textContent = entry.title;
    document.getElementById('home-explainer-summary').textContent = entry.summary;
    document.getElementById('home-explainer-detail').href = entry.detail;
    const credit = document.getElementById('home-explainer-credit');
    if (entry.original) {
      const link = document.createElement('a');
      link.href = entry.original;
      link.textContent = 'Original walkthrough ↗';
      credit.replaceChildren(document.createTextNode('Explainer by Takahiro Miki · '), link);
    } else {
      credit.textContent = 'Synthetic narration';
    }
    selected = id;
    video.dataset.explainerId = id;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.homeExplainer === id)));
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.homeExplainer)));
  selector.hidden = false;
})();
