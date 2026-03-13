// ══════════════════════════════════════════════════
// GLOBALDOC — Service Worker V15
// PWA + Notifications Push
// ══════════════════════════════════════════════════

const CACHE_NAME = 'globaldoc-v15';
const ASSETS = [
  '/globaldoc/',
  '/globaldoc/index.html',
  '/globaldoc/bibliotheque.html',
  '/globaldoc/commander.html',
  '/globaldoc/services.html',
  '/globaldoc/tarifs.html',
  '/globaldoc/compte.html',
  '/globaldoc/css/style.css',
  '/globaldoc/js/supabase.js',
  '/globaldoc/js/app.js',
  '/globaldoc/manifest.json'
];

// Installation
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ── NOTIFICATIONS PUSH ──
self.addEventListener('push', e => {
  let data = { title: 'GlobalDoc', body: 'Nouvelle mise à jour !', icon: '/globaldoc/assets/icon-192.png' };
  try { data = { ...data, ...e.data.json() }; } catch(err) {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/globaldoc/assets/icon-192.png',
      badge: '/globaldoc/assets/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/globaldoc/' },
      actions: [
        { action: 'open', title: '📖 Voir' },
        { action: 'close', title: '✕ Fermer' }
      ]
    })
  );
});

// Clic sur notification → ouvrir le site
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'close') return;
  const url = (e.notification.data && e.notification.data.url) || '/globaldoc/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('globaldoc') && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

// Message depuis la page (notification locale)
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'LOCAL_NOTIFICATION') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body,
      icon: '/globaldoc/assets/icon-192.png',
      badge: '/globaldoc/assets/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: e.data.url || '/globaldoc/' }
    });
  }
});
