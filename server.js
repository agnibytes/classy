const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
};

function sendFile(res, filePath, stat) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}

function send404(res) {
  const notFoundPath = path.join(ROOT, '404.html');
  if (fs.existsSync(notFoundPath)) {
    const stat = fs.statSync(notFoundPath);
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(notFoundPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize path and remove leading slash
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let fullPath = path.join(ROOT, safePath);

  // Check direct file match
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      return sendFile(res, fullPath, stat);
    }
    if (stat.isDirectory()) {
      // Check index.html inside directory
      const indexPath = path.join(fullPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        return sendFile(res, indexPath, fs.statSync(indexPath));
      }
    }
  }

  // Check if adding .html finds a file (clean URLs like /work -> /work.html)
  const htmlPath = fullPath + '.html';
  if (fs.existsSync(htmlPath)) {
    const stat = fs.statSync(htmlPath);
    if (stat.isFile()) {
      return sendFile(res, htmlPath, stat);
    }
  }

  // Check if directory with index.html exists (e.g. /work -> /work/index.html)
  const dirIndexPath = path.join(fullPath, 'index.html');
  if (fs.existsSync(dirIndexPath)) {
    const stat = fs.statSync(dirIndexPath);
    if (stat.isFile()) {
      return sendFile(res, dirIndexPath, stat);
    }
  }

  // Not found
  send404(res);
});

server.listen(PORT, () => {
  console.log(`> bleibtgleich.dev local server running at:`);
  console.log(`  http://localhost:${PORT}`);
});
