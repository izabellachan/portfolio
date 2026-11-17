/* Case study transition (index.html ↔ case studies). Clicking a card flies its video to the matching tile
   in the case study's hero bento, and Back flies it home again. It's one live video, re-cropped to its box
   every frame, so it leaves at exactly the size and framing of the video you clicked and lands at exactly
   the size and framing of the one that lives there. Both ends play the same file, and every handover
   happens on the same frame: the clicked video holds its frame, the flying one starts from that frame, and
   the one waiting in the tile is parked a beat ahead and takes over the moment the flying one reaches it.
   The page around it is there the whole time; only the video it's replacing stays hidden until it lands
   (its tile, fill and stroke stay). Only a same-tab click or Back animates; a new tab, a reload or any other
   way in loads the page as usual, videos and all.
   Cards and tiles are marked with data-vt="<case study>". Styles: [data-vt-hide] and .vt-fly in site.css. */
(() => {
  const KEY = 'vt-flight', HOME_Y = 'vt-home-y', FRESH = 2500, DUR = 750, EASE = 'cubic-bezier(.7,0,.2,1)';
  const LEAD = 0.25; // how far ahead (s) the waiting video is parked for the handover
  // how the rest of the page arrives while the video flies:
  // 'settle' grows it from 97% into place around the spot the video lands on, 'fade' fades it in, 'none' shows it as is
  const REVEAL = 'settle';
  const page = location.pathname.replace(/\.html$/, '').split('/').pop() || 'index';
  const isHome = page === 'index';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: k => { try { sessionStorage.removeItem(k); } catch (e) {} },
  };
  // calls fn(mediaTime) on every frame the video presents
  const eachFrame = (v, fn) => {
    if ('requestVideoFrameCallback' in v) { const tick = (now, m) => { if (fn(m.mediaTime) !== false) v.requestVideoFrameCallback(tick); }; v.requestVideoFrameCallback(tick); }
    else { const tick = () => { if (fn(v.currentTime) !== false) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }
  };

  /* ---------- leaving: hold the frame, and remember where it is and what it shows ---------- */
  const still = (v, w) => {
    try {
      const c = document.createElement('canvas');
      c.width = Math.min(v.videoWidth, Math.round(w * (devicePixelRatio || 1)));
      c.height = Math.round(c.width * v.videoHeight / v.videoWidth);
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', .85);
    } catch (e) { return ''; }
  };
  const remember = (box, to) => {
    const v = box.querySelector('video'), r = box.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return false; // off screen: nothing to fly from
    if (v) v.pause(); // the frame you see now is the frame the flight starts on
    store.set(KEY, JSON.stringify({
      to, from: isHome ? box.dataset.vt : page, at: Date.now(),
      rect: [r.left, r.top, r.width, r.height], radius: getComputedStyle(box).borderTopLeftRadius,
      t: v ? v.currentTime : 0, still: v && v.readyState >= 2 ? still(v, r.width) : '',
    }));
    return true;
  };
  let leaving = null;
  if (isHome) {
    document.addEventListener('click', e => {
      const card = e.target.closest('a.card');
      if (!card || reduce || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const box = card.querySelector('[data-vt]');
      if (!box) return;
      store.set(HOME_Y, String(scrollY));
      if (remember(box, box.dataset.vt)) leaving = box.dataset.vt;
    });
    // if Back restores this page from the cache, its card video comes back already tucked away
    addEventListener('pagehide', () => { if (leaving) root.dataset.vtHide = leaving; });
  } else {
    addEventListener('pagehide', () => { const box = document.querySelector(`[data-vt="${page}"]`); if (box && !reduce) remember(box, 'index'); });
  }

  /* ---------- arriving: fly the video into its spot ---------- */
  const arrive = () => {
    leaving = null;
    let f = null;
    try { f = JSON.parse(store.get(KEY) || 'null'); } catch (e) {}
    const mine = f && Date.now() - f.at < FRESH && f.to === (isHome ? 'index' : page);
    if (!mine) { delete root.dataset.vtHide; root.classList.remove('vt-fade'); return; }
    store.del(KEY);
    const name = isHome ? f.from : page;
    root.dataset.vtHide = name; // hides just that one video (site.css) from the very first paint
    if (REVEAL !== 'none') root.classList.add('vt-fade');
    const show = () => { delete root.dataset.vtHide; root.classList.remove('vt-fade'); };
    const failsafe = setTimeout(show, 4000);

    // the flying box goes up straight away, exactly over the frame you left, so nothing blinks
    const [x, y, w, h] = f.rect;
    const fly = document.createElement('div');
    fly.className = 'vt-fly';
    fly.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${f.radius}` + (f.still ? `;background-image:url(${f.still})` : '');
    const vid = document.createElement('video');
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'auto';
    fly.append(vid);
    root.append(fly);

    const go = () => {
      const box = document.querySelector(`[data-vt="${name}"]`), dest = box && box.querySelector('video');
      if (!box || !dest) { fly.remove(); clearTimeout(failsafe); show(); return; }
      if (isHome) { const hy = +store.get(HOME_Y); if (hy) scrollTo(0, hy); }
      dest.pause();
      // the flying video starts on the very frame you left: it shows once it's there, then plays on
      let playing = false;
      vid.addEventListener('loadedmetadata', () => { vid.currentTime = f.t; }, { once: true });
      vid.addEventListener('seeked', () => { vid.classList.add('on'); vid.play().then(() => { playing = true; }).catch(() => {}); }, { once: true });
      vid.src = dest.currentSrc || dest.getAttribute('src');

      const r = box.getBoundingClientRect();
      const anim = fly.animate([
        { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, borderRadius: f.radius },
        { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, borderRadius: getComputedStyle(box).borderTopLeftRadius },
      ], { duration: DUR, easing: EASE, fill: 'forwards' });
      if (REVEAL === 'fade') {
        root.classList.add('vt-fading');
        requestAnimationFrame(() => root.classList.remove('vt-fade'));
        setTimeout(() => root.classList.remove('vt-fading'), DUR + 100);
      } else if (REVEAL === 'settle') {
        // each part of the page grows into place from the point the video is heading for
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        [...document.body.children].forEach(el => {
          const cs = getComputedStyle(el);
          // fixed pieces (the section nav, the logo) stay exactly where they are and only fade in
          if (cs.position === 'fixed') {
            el.animate([{ opacity: 0 }, { opacity: 1, offset: .55 }, { opacity: 1 }], { duration: DUR + 150, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
            return;
          }
          const b = el.getBoundingClientRect(), base = cs.transform === 'none' ? '' : cs.transform;
          el.animate([
            { opacity: 0, transform: `${base} scale(.97)`, transformOrigin: `${cx - b.left}px ${cy - b.top}px` },
            { opacity: 1, offset: .55 },
            { opacity: 1, transform: base || 'none', transformOrigin: `${cx - b.left}px ${cy - b.top}px` },
          ], { duration: DUR + 150, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
        });
        root.classList.remove('vt-fade');
      }

      anim.finished.then(() => {
        clearTimeout(failsafe);
        let done = false;
        const swap = () => { if (done) return; done = true; show(); dest.play().catch(() => {}); fly.remove(); };
        setTimeout(swap, 2000);
        const park = (t, then) => {
          const seek = () => { dest.addEventListener('seeked', then, { once: true }); dest.currentTime = t; };
          if (dest.readyState >= 1) seek(); else dest.addEventListener('loadedmetadata', seek, { once: true });
        };
        if (playing && vid.duration) {
          // park the waiting video a beat ahead, then hand over the moment the flying one reaches that frame
          const dur = vid.duration, start = vid.currentTime, target = (start + LEAD) % dur, wraps = start + LEAD >= dur;
          park(target, () => {
            let wrapped = false, last = vid.currentTime;
            eachFrame(vid, m => {
              if (done) return false;
              if (m < last) wrapped = true;
              last = m;
              if ((!wraps || wrapped) && m >= target) { swap(); return false; }
            });
          });
        } else {
          // the flying video never got going: the waiting one takes the still's frame, then plays on
          park(f.t, swap);
        }
      });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(go), { once: true });
    else requestAnimationFrame(go);
  };

  if (!reduce) arrive();
  addEventListener('pageshow', e => { if (e.persisted && !reduce) arrive(); });
})();
