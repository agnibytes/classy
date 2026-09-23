const express = require('express');
const path = require('path');

const app = express();
const ROOT = __dirname;

// ─── Static files ────────────────────────────────────────────────────────────
// Serve everything in the project root as static files.
// This covers: /assets/**, /site.config.js, /404.html, etc.
app.use(
  express.static(ROOT, {
    // Never cache HTML pages so users always get fresh content
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (
        filePath.includes('/assets/js/') ||
        filePath.includes('/assets/css/') ||
        filePath.includes('/assets/fonts/')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.includes('/assets/photos/') || filePath.includes('/assets/images/')) {
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      }
      // CORS for fonts
      if (filePath.includes('/assets/fonts/')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    },
  })
);

// ─── Clean URL routing ────────────────────────────────────────────────────────
// Map /work → /work/index.html, etc. with no redirect (direct serve)
const ROUTES = {
  '/work':    'work/index.html',
  '/contact': 'contact/index.html',
  '/archive': 'archive/index.html',
};

Object.entries(ROUTES).forEach(([route, file]) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(ROOT, file));
  });
});

// /works/:slug → /works/:slug/index.html
app.get('/works/:slug', (req, res, next) => {
  const filePath = path.join(ROOT, 'works', req.params.slug, 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) next(); // fall through to 404
  });
});

// ─── 404 fallback ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).sendFile(path.join(ROOT, '404.html'));
});

// ─── Start (local dev only — Vercel imports the app directly) ─────────────────
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  bleibtgleich.dev running at:`);
    console.log(`  http://localhost:${PORT}\n`);
  });
}

module.exports = app;
