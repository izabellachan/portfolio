/* Opening animation (first visit in a session): the clover outline draws itself in the centre,
   glides into the top-left corner, and the real stamp is revealed underneath it.
   Nothing on the page itself is animated (no fades, no transforms), so nothing can shift:
   a cover in the page colour fades away instead, and a small patch hides the real logo until the
   outline lands on it. The <head> of each page adds html.opening before anything paints (CSS shows the
   cover from the first frame); click or press a key to skip. */
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('opening')) return;
  const logoImg = document.querySelector('.logo img');
  const done = () => root.classList.remove('opening');
  if (!logoImg || !root.animate) return done();

  const SQUARE = 'M28.0 25.0C24.8 40.2 24.6 95.6 24.0 115.0C23.5 134.4 17.8 136.2 24.8 141.4C31.8 146.5 53.1 145.1 66.0 145.9C78.9 146.7 88.1 145.4 102.0 146.3C115.9 147.1 140.8 154.9 149.3 151.1C157.8 147.2 151.9 135.3 152.9 123.0C153.9 110.7 155.1 91.9 155.6 77.0C156.0 62.1 157.7 41.3 155.4 33.6C153.2 25.9 157.2 32.1 142.0 30.9C126.8 29.7 80.5 27.8 64.0 26.6C47.5 25.4 49.0 23.9 43.0 23.6C37.0 23.3 31.1 9.7 28.0 25.0Z';
  const CLOVER = 'M37.4 64.4C37.0 64.9 37.1 66.1 37.3 67.0C37.6 67.9 36.3 67.5 39.1 69.7C41.9 71.8 49.2 77.9 54.0 80.0C58.8 82.1 65.0 81.5 68.0 82.3C71.0 83.2 71.1 84.1 71.9 85.0C72.6 85.9 73.2 86.9 72.5 87.9C71.9 88.9 69.5 89.7 68.0 91.1C66.5 92.5 64.2 94.5 63.4 96.3C62.6 98.1 62.7 100.3 63.1 101.9C63.6 103.5 65.0 104.6 66.1 105.7C67.2 106.7 68.8 106.6 69.9 108.1C70.9 109.6 71.3 112.9 72.4 114.7C73.6 116.4 75.1 117.8 77.0 118.6C78.9 119.3 81.9 119.2 84.0 118.9C86.1 118.6 88.2 118.2 89.9 116.6C91.5 114.9 93.0 111.3 93.9 108.9C94.8 106.5 94.9 103.4 95.4 102.1C96.0 100.8 96.4 101.1 97.0 100.9C97.6 100.7 98.3 100.5 99.0 100.9C99.7 101.2 100.5 101.5 101.2 103.0C102.0 104.5 103.1 107.9 103.7 110.0C104.2 112.1 103.2 113.8 104.4 115.9C105.7 118.1 109.3 121.8 111.0 122.9C112.8 124.0 113.5 123.2 115.0 122.6C116.5 122.0 118.7 120.7 119.9 119.3C121.1 117.9 121.7 115.2 122.3 114.1C123.0 113.0 122.4 113.3 124.0 112.8C125.6 112.3 130.0 112.5 131.9 111.2C133.8 109.9 135.1 106.9 135.6 105.0C136.0 103.1 135.1 101.3 134.7 100.0C134.2 98.7 133.7 98.0 132.9 97.1C132.1 96.2 132.0 95.6 129.7 94.4C127.4 93.3 121.1 91.3 119.0 90.2C116.9 89.2 117.2 88.7 117.2 88.0C117.2 87.3 116.6 87.1 119.0 85.8C121.5 84.4 129.0 81.6 132.0 80.0C135.0 78.4 135.9 76.9 136.9 75.9C137.9 74.9 137.8 75.3 137.9 74.0C137.9 72.7 137.9 69.6 137.2 68.0C136.5 66.4 134.9 65.2 133.7 64.4C132.5 63.7 131.0 64.1 130.0 63.7C129.0 63.2 128.0 63.3 127.4 61.9C126.9 60.5 127.2 56.7 126.7 55.0C126.1 53.3 125.6 52.1 124.0 51.4C122.4 50.8 119.1 50.8 117.0 51.1C114.9 51.4 112.9 52.3 111.3 53.4C109.7 54.6 108.6 56.1 107.3 58.0C106.1 59.9 104.7 63.5 103.7 64.9C102.6 66.3 101.8 66.2 101.0 66.3C100.2 66.4 99.9 66.4 99.1 65.6C98.3 64.9 97.5 64.6 96.4 62.0C95.4 59.4 94.0 52.3 92.9 50.0C91.8 47.7 91.1 48.5 90.0 48.0C88.9 47.6 87.5 46.9 86.0 47.4C84.5 47.9 82.3 49.7 81.0 51.0C79.7 52.3 79.1 53.6 78.4 55.0C77.7 56.4 78.3 58.6 76.9 59.7C75.5 60.7 71.8 60.7 70.0 61.4C68.2 62.2 67.2 63.4 66.3 64.3C65.5 65.3 65.4 65.6 65.1 67.0C64.8 68.4 65.1 71.7 64.6 72.9C64.0 74.1 64.3 74.8 62.0 74.3C59.7 73.9 54.7 71.9 51.0 70.2C47.3 68.6 42.3 65.3 40.0 64.3C37.7 63.4 37.9 64.0 37.4 64.4Z';
  const K = 3; // size in the centre, relative to the corner logo
  const bg = getComputedStyle(document.body).backgroundColor;
  // Exact (unrounded) size and centre of the corner logo, so the outline lands exactly on it.
  const cs = getComputedStyle(logoImg);
  const W = parseFloat(cs.width), H = parseFloat(cs.height);
  const lr = logoImg.parentElement.getBoundingClientRect();
  const cx = lr.left + lr.width / 2, cy = lr.top + lr.height / 2;

  const make = (cls, style) => { const el = document.createElement('div'); el.className = cls; el.setAttribute('aria-hidden', 'true'); Object.assign(el.style, style); document.body.append(el); return el; };
  const cover = make('intro-cover', { background: bg });
  const patch = make('intro-patch', { background: bg, left: `${lr.left - 2}px`, top: `${lr.top - 2}px`, width: `${lr.width + 4}px`, height: `${lr.height + 4}px` });
  const box = make('intro-clover', { width: `${W * K}px`, height: `${H * K}px`, left: `${cx - (W * K) / 2}px`, top: `${cy - (H * K) / 2}px` });
  box.innerHTML = `<svg viewBox="0 0 162 158" preserveAspectRatio="xMidYMin slice" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${SQUARE}" pathLength="1"/><path d="${CLOVER}" pathLength="1"/></svg>`;
  done(); // the cover div now does what the CSS cover did

  const [sqPath, clPath] = box.querySelectorAll('path');
  const svgEl = box.querySelector('svg');
  const ROT = 'rotate(-3.25deg)'; // same tilt as the corner logo
  const dash = [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }];
  // 1) draw the outline  2) glide to the corner as an outline  3) reveal the real stamp under it
  const MOVE_AT = 1800, MOVE_MS = 900, LAND = MOVE_AT + MOVE_MS;
  const move = { duration: MOVE_MS, delay: MOVE_AT, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' };
  // The outline shrinks with the box, so thicken it on the way so it still reads as a ~1px line when it lands.
  const thicken = [{ strokeWidth: 2.2 }, { strokeWidth: 5.6 }];
  const fadeOut = (delay, duration) => ({ duration, delay, easing: 'ease', fill: 'both' });
  const anims = [
    sqPath.animate(dash, { duration: 800, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' }),
    clPath.animate(dash, { duration: 1100, delay: 550, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' }),
    sqPath.animate(thicken, move),
    clPath.animate(thicken, move),
    box.animate([
      { transform: `translate(${innerWidth / 2 - cx}px, ${innerHeight / 2 - cy}px) scale(1) ${ROT}` },
      { transform: `translate(0px, 0px) scale(${1 / K}) ${ROT}` },
    ], move),
    cover.animate([{ opacity: 1 }, { opacity: 0 }], fadeOut(MOVE_AT + 300, 800)),
    patch.animate([{ opacity: 1 }, { opacity: 0 }], fadeOut(LAND, 400)),
    svgEl.animate([{ opacity: 1 }, { opacity: 0 }], fadeOut(LAND + 50, 400)),
  ];

  const finish = () => {
    removeEventListener('pointerdown', skip, true);
    removeEventListener('keydown', skip, true);
    cover.remove(); patch.remove(); box.remove();
  };
  const skip = () => { anims.forEach(a => a.finish()); };
  addEventListener('pointerdown', skip, true);
  addEventListener('keydown', skip, true);
  Promise.all(anims.map(a => a.finished)).then(finish, finish);
})();

/* Sidebar nav: sliding highlight + hand-drawn icon animation.
   Work and Play are separate pages, so a click stores which item we came from;
   the next page starts the highlight there, slides it to its own item and draws that icon. */
(() => {
  const nav = document.querySelector('.nav');
  const current = nav && nav.querySelector('.item.is-current');
  if (!current) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KEY = 'izy-nav-from';

  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  nav.prepend(indicator);
  nav.classList.add('has-indicator');

  // The highlight keeps the size of the current item's box (35px in Figma) and centres on whichever item it's on.
  const H = current.offsetHeight;
  indicator.style.height = `${H}px`;
  const placeOn = item => {
    indicator.style.transform = `translateY(${item.offsetTop + (item.offsetHeight - H) / 2}px)`;
  };

  // Icons are made of several strokes; draw them one after another (like a pen), each taking a
  // share of the total time that matches its length.
  const DRAW_MS = 800;
  document.querySelectorAll('.ic svg').forEach(svg => {
    const paths = [...svg.querySelectorAll('path')];
    const lens = paths.map(p => { try { return p.getTotalLength() || 1; } catch (e) { return 1; } });
    const total = lens.reduce((a, b) => a + b, 0);
    let start = 0;
    paths.forEach((p, i) => {
      p.style.animationDelay = `${(start / total) * DRAW_MS}ms`;
      p.style.animationDuration = `${(lens[i] / total) * DRAW_MS}ms`;
      start += lens[i];
    });
  });

  const draw = item => {
    if (reduce) return;
    item.querySelectorAll('.ic').forEach(ic => { // the icon, plus the ↗ arrow on connect links
      ic.classList.remove('drawing');
      void ic.offsetWidth; // restart the animation
      ic.classList.add('drawing');
    });
  };

  const slideTo = item => {
    indicator.classList.add('moving');
    placeOn(item);
  };

  // Arrival: slide in from the item that was clicked on the previous page.
  let from = null;
  try { from = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {}
  const fromItem = from && nav.querySelector(`.item[data-nav="${from}"]`);
  if (fromItem && fromItem !== current && !reduce) {
    placeOn(fromItem);
    void indicator.offsetWidth; // lock in the start position so the slide animates from there
    slideTo(current);
  } else {
    placeOn(current);
  }

  nav.addEventListener('click', e => {
    const link = e.target.closest('a.item');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link === current) {
      // Already here: nothing to do (the icon only draws on hover, not after a click).
      e.preventDefault();
      return;
    }
    try { sessionStorage.setItem(KEY, current.dataset.nav); } catch (err) {}
  });

  // Hovering any nav item or connect link redraws its icon (mouse only, so a tap doesn't trigger it twice).
  // After a click the new page loads with the cursor already on the item, and the browser fires a
  // pointerenter on the first mouse move; skip that one so the icon doesn't draw again after the click.
  let moved = false;
  addEventListener('pointermove', () => { moved = true; }, {once: true});
  document.querySelectorAll('.nav .item, .connect-row').forEach(item => {
    item.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && moved) draw(item); });
  });

  // Keep the highlight lined up if the layout changes (resize, fonts loading).
  addEventListener('resize', () => { indicator.classList.remove('moving'); placeOn(current); });
  if (document.fonts) document.fonts.ready.then(() => { if (!indicator.classList.contains('moving')) placeOn(current); });
  // Coming back with the browser's back button restores the old page as it was.
  addEventListener('pageshow', e => { if (e.persisted) { indicator.classList.remove('moving'); placeOn(current); } });
})();
