// Minimal stand-in for the Claude Design runtime: {{bindings}}, on* handlers, <sc-if>, <sc-for>, <helmet>.
class DCLogic {
  constructor(props) { this.props = props; this.state = {}; }
  setState(patch) {
    Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
    if (!this._queued) { this._queued = true; queueMicrotask(() => { this._queued = false; this._render(); }); }
  }
}

(() => {
  const RE = /{{\s*([^}]+?)\s*}}/g, HAS = /{{/;
  const get = (expr, scope) => {
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    return expr.split('.').reduce((o, k) => (o == null ? o : o[k]), scope);
  };
  const fill = (tpl, scope) => tpl.replace(RE, (_, e) => { const v = get(e, scope); return v == null ? '' : v; });

  // Walks a node tree, returns a list of updaters run with the current scope on every render.
  function compile(root, ups, local = {}) {
    for (const node of [...root.childNodes]) {
      if (node.nodeType === 3 && HAS.test(node.data)) {
        const tpl = node.data;
        ups.push(s => { const v = fill(tpl, { ...s, ...local }); if (node.data !== v) node.data = v; });
      } else if (node.nodeType !== 1) {
        continue;
      } else if (node.localName === 'sc-if') {
        const expr = node.getAttribute('value').replace(RE, '$1');
        const kids = [...node.childNodes], anchor = document.createComment('if');
        node.replaceWith(anchor);
        const frag = document.createDocumentFragment(); kids.forEach(k => frag.append(k));
        const inner = []; compile(frag, inner, local);
        let shown = false;
        ups.push(s => {
          const sc = { ...s, ...local }, on = !!get(expr, sc);
          if (on) inner.forEach(u => u(sc));
          if (on && !shown) anchor.after(...kids);
          if (!on && shown) kids.forEach(k => k.remove());
          shown = on;
        });
      } else if (node.localName === 'sc-for') {
        const listExpr = node.getAttribute('list').replace(RE, '$1'), as = node.getAttribute('as');
        const tpl = [...node.childNodes], anchor = document.createComment('for');
        node.replaceWith(anchor);
        let last, made = [];
        ups.push(s => {
          const list = get(listExpr, { ...s, ...local }) || [];
          if (list === last) { made.forEach(m => m.ups.forEach(u => u(s))); return; } // ponytail: rebuilds whole list when array identity changes
          last = list; made.forEach(m => m.nodes.forEach(n => n.remove()));
          made = list.map(item => {
            const frag = document.createDocumentFragment(); tpl.forEach(t => frag.append(t.cloneNode(true)));
            const mu = []; compile(frag, mu, { ...local, [as]: item });
            const nodes = [...frag.childNodes]; mu.forEach(u => u(s));
            return { nodes, ups: mu, frag };
          });
          let at = anchor; made.forEach(m => m.nodes.forEach(n => { at.after(n); at = n; }));
        });
      } else {
        for (const a of [...node.attributes]) {
          if (!HAS.test(a.value)) continue;
          const tpl = a.value, name = a.name;
          node.removeAttribute(name);
          if (/^on/i.test(name)) {
            const expr = tpl.replace(RE, '$1').trim(); let scope;
            node.addEventListener(name.slice(2).toLowerCase(), e => { const fn = get(expr, scope); if (typeof fn === 'function') fn(e); });
            ups.push(s => { scope = { ...s, ...local }; });
          } else {
            ups.push(s => { const v = fill(tpl, { ...s, ...local }); if (node.getAttribute(name) !== v) node.setAttribute(name, v); });
          }
        }
        compile(node, ups, local);
      }
    }
    return ups;
  }

  function boot() {
    document.head.insertAdjacentHTML('beforeend', '<style>x-dc{display:block}</style>');
    document.querySelectorAll('helmet').forEach(h => { document.head.append(...h.childNodes); h.remove(); });
    const script = document.querySelector('script[data-dc-script]');
    const host = document.querySelector('x-dc');
    const props = {};
    Object.entries(JSON.parse(script.dataset.props || '{}')).forEach(([k, v]) => { if (k[0] !== '$') props[k] = v.default; });
    const Component = new Function('DCLogic', script.textContent + '\nreturn Component;')(DCLogic);
    const comp = new Component(props);
    const ups = compile(host, []);
    comp._render = () => { const vals = comp.renderVals(); ups.forEach(u => u(vals)); };
    comp._render();
    comp.componentDidMount && comp.componentDidMount();
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
