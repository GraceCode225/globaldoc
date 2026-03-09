// ══════════════════════════════════════
// GLOBALDOC — Service Worker (PWA)
// ══════════════════════════════════════
const CACHE_NAME = 'globaldoc-v1';
const ASSETS = [
  '/globaldoc/',
  '/globaldoc/index.html',
  '/globaldoc/services.html',
  '/globaldoc/commander.html',
  '/globaldoc/bibliotheque.html',
  '/globaldoc/communaute.html',
  '/globaldoc/tarifs.html',
  '/globaldoc/compte.html',
  '/globaldoc/css/style.css',
  '/globaldoc/js/app.js',
  '/globaldoc/js/supabase.js',
  '/globaldoc/js/sounds.js',
  '/globaldoc/assets/logo.svg',
  '/globaldoc/manifest.json'
];

// Installation — mise en cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activation — nettoyage ancien cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — réseau d'abord, cache en fallback
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
