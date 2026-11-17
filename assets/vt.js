/* Case study transition (index.html ↔ case studies). Clicking a card flies its video to the matching tile
   in the case study's hero bento, and Back flies it home again. It's one live video, re-cropped to its box
   every frame, so it leaves at exactly the size and framing of the video you clicked and lands at exactly
   the size and framing of the one that lives there. Everything else waits until it lands. Only a same-tab
   click or Back animates; a new tab, a reload or any other way in loads the page as usual, videos and all.
   Cards and tiles are marked with data-vt="<case study>". Styles: .vt-* in site.css. */
(() => {
  const KEY = 'vt-flight', HOME_Y = 'vt-home-y', FRESH = 2500, DUR = 750, EASE = 'cubic-bezier(.7,0,.2,1)';
  const page = location.pathname.replace(/\.html$/, '').split('/').pop() || 'index';
  const isHome = page === 'index';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: k => { try { sessionStorage.removeItem(k); } catch (e) {} },
  };

  /* ---------- leaving: remember where the video is and what it's showing ---------- */
  const still = v => {
    try {
      const c = document.createElement('canvas');
      c.width = 480; c.height = Math.round(480 * v.videoHeight / v.videoWidth);
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', .7);
    } catch (e) { return ''; }
  };
  const remember = (box, to) => {
    const v = box.querySelector('video'), r = box.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return; // off screen: nothing to fly from
    store.set(KEY, JSON.stringify({
      to, from: isHome ? box.dataset.vt : page, at: Date.now(),
      rect: [r.left, r.top, r.width, r.height], radius: getComputedStyle(box).borderTopLeftRadius,
      t: v ? v.currentTime : 0, still: v && v.readyState >= 2 ? still(v) : '',
    }));
  };
  if (isHome) {
    document.addEventListener('click', e => {
      const card = e.target.closest('a.card');
      if (!card || reduce || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const box = card.querySelector('[data-vt]');
      if (!box) return;
      store.set(HOME_Y, String(scrollY));
      remember(box, box.dataset.vt);
      root.classList.add('vt-arriving'); // if Back restores this page from the cache, it comes back hidden, ready to fly home
    });
  } else {
    addEventListener('pagehide', () => { const box = document.querySelector(`[data-vt="${page}"]`); if (box && !reduce) remember(box, 'index'); });
  }

  /* ---------- arriving: fly the video into its spot, then open the page ---------- */
  const arrive = () => {
    let f = null;
    try { f = JSON.parse(store.get(KEY) || 'null'); } catch (e) {}
    const mine = f && Date.now() - f.at < FRESH && f.to === (isHome ? 'index' : page);
    if (!mine) { root.classList.remove('vt-arriving'); return; }
    store.del(KEY);
    root.classList.add('vt-arriving', 'vt-open');
    const open = () => root.classList.remove('vt-arriving');
    const failsafe = setTimeout(open, 4000);

    // the flying box goes up straight away, exactly over the video you left, so nothing blinks
    const [x, y, w, h] = f.rect;
    const fly = document.createElement('div');
    fly.className = 'vt-fly';
    fly.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${f.radius}` + (f.still ? `;background-image:url(${f.still})` : '');
    const vid = document.createElement('video');
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'auto';
    fly.append(vid);
    root.append(fly);

    const go = () => {
      const name = isHome ? f.from : page;
      const box = document.querySelector(`[data-vt="${name}"]`), dest = box && box.querySelector('video');
      if (!box || !dest) { fly.remove(); clearTimeout(failsafe); open(); return; }
      if (isHome) { const hy = +store.get(HOME_Y); if (hy) scrollTo(0, hy); }
      // the same footage as the spot it's headed for, picked up at the moment you left
      vid.addEventListener('loadedmetadata', () => { vid.currentTime = (f.t + (Date.now() - f.at) / 1000) % vid.duration; }, { once: true });
      vid.addEventListener('seeked', () => { vid.classList.add('on'); vid.play().catch(() => {}); }, { once: true });
      vid.src = dest.currentSrc || dest.getAttribute('src');
      box.style.visibility = 'hidden';
      const r = box.getBoundingClientRect();
      const anim = fly.animate([
        { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, borderRadius: f.radius },
        { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, borderRadius: getComputedStyle(box).borderTopLeftRadius },
      ], { duration: DUR, easing: EASE, fill: 'forwards' });
      anim.finished.then(() => {
        clearTimeout(failsafe);
        box.style.visibility = '';
        open();
        // hand over to the video that lives here, at the same moment, then the flying one bows out
        let done = false;
        const swap = () => { if (done) return; done = true; fly.remove(); setTimeout(() => root.classList.remove('vt-open'), 600); };
        const sync = () => {
          if (vid.readyState >= 1 && dest.readyState >= 1) dest.currentTime = vid.currentTime % dest.duration;
          dest.play().catch(() => {});
          dest.addEventListener('seeked', () => requestAnimationFrame(swap), { once: true });
        };
        if (dest.readyState >= 1) sync(); else dest.addEventListener('loadedmetadata', sync, { once: true });
        setTimeout(swap, 1500);
      });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(go), { once: true });
    else requestAnimationFrame(go);
  };

  if (!reduce) arrive();
  addEventListener('pageshow', e => { if (e.persisted && !reduce) arrive(); });
})();
