/* Case study transition helper (index.html ↔ case studies; the morph itself is styled in site.css).
   The card's video and its tile in the hero bento morph into each other. This hands the playing position
   across pages, so both show the same moment, and holds the final crossfade until the arriving video has a
   frame, so the moving frame never fades into an empty tile. */
(() => {
  const KEY = 'vt-video';
  const pairs = () => [...document.querySelectorAll('[style*="view-transition-name"]')]
    .map(el => ({ name: getComputedStyle(el).viewTransitionName, video: el.querySelector('video') }))
    .filter(p => p.video && p.name !== 'cs-hero');

  addEventListener('pageswap', e => {
    if (!e.viewTransition) return;
    const out = {};
    pairs().forEach(({ name, video }) => {
      if (video.duration) out[name] = { t: video.currentTime, d: video.duration, at: Date.now() };
    });
    try { sessionStorage.setItem(KEY, JSON.stringify(out)); } catch (err) {}
  });

  addEventListener('pagereveal', e => {
    if (!e.viewTransition) return;
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch (err) {}
    e.viewTransition.ready.then(() => {
      pairs().forEach(({ name, video }) => {
        const s = saved[name];
        // only the same footage (same length) is synced; a different recording just plays from its start
        const sync = () => {
          if (!s || Math.abs(video.duration - s.d) > 0.3) return false;
          video.currentTime = (s.t + (Date.now() - s.at) / 1000) % video.duration;
          return true;
        };
        const ready = new Promise(done => {
          const afterMeta = () => {
            if (sync()) video.addEventListener('seeked', done, { once: true });
            else if (video.readyState >= 2) done();
            else video.addEventListener('loadeddata', done, { once: true });
          };
          if (video.readyState >= 1) afterMeta(); else video.addEventListener('loadedmetadata', afterMeta, { once: true });
          setTimeout(done, 1500);
        });
        video.play().catch(() => {});
        const fade = document.getAnimations().find(a => a.effect && a.effect.pseudoElement === `::view-transition-new(${name})`);
        if (fade) { fade.pause(); ready.then(() => fade.play()); }
      });
    });
  });
})();
