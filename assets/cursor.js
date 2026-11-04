/* Dot cursor drawn by the page instead of a CSS cursor image.
   Browsers (Safari especially) only redraw a CSS cursor when the mouse moves, so after a click the
   macOS arrow could come back until the next movement. Here the system cursor is hidden and a small
   dot follows the mouse; nothing about it changes on click except its own size, so there is nothing
   for the browser to reset. Mouse/trackpad only: touch devices keep their default behaviour.
   Each embedded mini-app loads this too and draws its own dot while the mouse is inside it. */
(() => {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.documentElement;
  const KEY = 'izy-cursor';
  const SIZE = 12, PRESSED = 8;

  const style = document.createElement('style');
  style.textContent =
    'html.has-dot,html.has-dot *,html.has-dot *:active{cursor:none !important}' +
    // a click that moves even a pixel would start the browser's own link/image drag, which always shows the system cursor
    'html.has-dot a,html.has-dot img,html.has-dot video{-webkit-user-drag:none;user-drag:none}' +
    '#cursor-dot{position:fixed;left:0;top:0;width:' + SIZE + 'px;height:' + SIZE + 'px;margin:-' + SIZE / 2 + 'px 0 0 -' + SIZE / 2 + 'px;' +
    'border-radius:50%;background:rgba(101,101,101,.3);pointer-events:none;z-index:2147483647;opacity:0;' +
    'transition:opacity .15s ease,width .12s ease,height .12s ease,margin .12s ease;will-change:transform}' +
    '#cursor-dot.on{opacity:1}' +
    '#cursor-dot.down{width:' + PRESSED + 'px;height:' + PRESSED + 'px;margin:-' + PRESSED / 2 + 'px 0 0 -' + PRESSED / 2 + 'px}';
  document.head.appendChild(style);
  root.classList.add('has-dot');

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  let x = -100, y = -100;
  const place = () => { dot.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
  const show = () => dot.classList.add('on');
  const hide = () => dot.classList.remove('on');

  // Top-level pages pick up where the mouse was on the previous page, so the dot is there right away.
  if (window.top === window) {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (saved && saved.w === innerWidth) { x = saved.x; y = saved.y; place(); show(); }
    } catch (e) {}
  }
  const save = () => { if (window.top === window) try { sessionStorage.setItem(KEY, JSON.stringify({ x, y, w: innerWidth })); } catch (e) {} };

  const attach = () => { document.body.appendChild(dot); place(); };
  document.body ? attach() : document.addEventListener('DOMContentLoaded', attach);

  addEventListener('pointermove', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY; place();
    // over an embedded mini-app, that frame draws its own dot
    if (e.target && e.target.tagName === 'IFRAME') hide(); else show();
  }, { passive: true });
  addEventListener('pointerdown', e => { if (!e.pointerType || e.pointerType === 'mouse') dot.classList.add('down'); }, { passive: true });
  addEventListener('pointerup', () => dot.classList.remove('down'), { passive: true });
  addEventListener('blur', () => dot.classList.remove('down'));
  document.addEventListener('mouseout', e => { if (!e.relatedTarget || e.relatedTarget.tagName === 'IFRAME') hide(); });
  document.addEventListener('dragstart', e => e.preventDefault(), true);
  addEventListener('pagehide', save);
  document.addEventListener('click', save, true);
})();
