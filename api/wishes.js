/* Shared wishes for the clover field (assets/wish.js).
   GET  /api/wishes  → the most recent wishes everyone can see
   POST /api/wishes  → plant one: { s, wish, secret, x, y, r }
   Stored in the Upstash Redis database connected to this Vercel project (Storage tab), as one list
   of JSON entries, newest first. Secret wishes are stored without their text: only the clover and
   its spot are shared, the words stay in the planter's own browser.
   To remove a wish: in the Upstash console, run LRANGE wishes 0 -1 to find it, then LREM wishes 1 '<that entry>'. */

const STYLES = ['ruffled', 'round', 'longstem', 'bow', 'loop'];
const KEY = 'wishes';
const KEEP = 300; // wishes kept in the list
const SHOW = 60; // wishes sent to the page
const PER_HOUR = 5; // wishes one visitor can plant per hour
const MAX = 120;

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Upstash's REST API: a list of commands in, a list of { result } out
async function redis(...commands) {
  const r = await fetch(`${URL_}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).map(x => x.result);
}

const num = (v, lo, hi) => (typeof v === 'number' && isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null);

function clean(body) {
  if (!body || typeof body !== 'object') return null;
  const s = STYLES.includes(body.s) ? body.s : null;
  const x = num(body.x, 0, 100), y = num(body.y, 0, 100), r = num(body.r, -15, 15);
  const secret = body.secret === true;
  // one line of plain text, no links
  const wish = typeof body.wish === 'string' ? body.wish.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (!s || x === null || y === null || r === null) return null;
  if (!secret && (!wish || wish.length > MAX || /https?:\/\/|www\.|\.(com|net|org|io|ly)\b/i.test(wish))) return null;
  return { s, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100, r: Math.round(r), secret, wish: secret ? null : wish };
}

module.exports = async (req, res) => {
  if (!URL_ || !TOKEN) return res.status(503).json({ error: 'no database connected' });
  try {
    if (req.method === 'GET') {
      const [list] = await redis(['LRANGE', KEY, 0, SHOW - 1]);
      const wishes = (list || []).map(e => { try { return JSON.parse(e); } catch (err) { return null; } }).filter(Boolean);
      // browsers always ask again; Vercel's CDN may answer for a few seconds
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Vercel-CDN-Cache-Control', 'max-age=5, stale-while-revalidate=30');
      return res.status(200).json({ wishes });
    }
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (err) { body = null; } }
      const w = clean(body);
      if (!w) return res.status(400).json({ error: 'that wish can’t be planted' });
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
      const [count] = await redis(['INCR', `wish-rate:${ip}`], ['EXPIRE', `wish-rate:${ip}`, 3600, 'NX']);
      if (count > PER_HOUR) return res.status(429).json({ error: 'too many wishes for now' });
      const entry = { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`, ...w, at: Date.now() };
      await redis(['LPUSH', KEY, JSON.stringify(entry)], ['LTRIM', KEY, 0, KEEP - 1]);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(201).json({ id: entry.id });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    return res.status(502).json({ error: 'database unavailable' });
  }
};
